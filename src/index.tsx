import { moment, Module, Panel, Button, Label, Container, ControlElement, application, customModule, customElements, Styles } from '@ijstech/components';
import { Constants, IEventBusRegistry, Wallet } from '@ijstech/eth-wallet';
import Assets from './assets';
import {
	formatNumber,
	registerSendTxEvents,
	IClaimBasicInfo,
	ICampaignInfo,
	INetworkConfig,
	ICampaign,
} from './global/index';
import {
	State,
	fallBackUrl,
	isClientWalletConnected
} from './store/index';
import {
	getInvestorClaimInfo,
	getLatestInvestorClaimTokenInfo,
	investorClaimToken
} from './claim-utils/index';
import { claimComponent, claimDappContainer } from './index.css';
import { tokenStore } from '@scom/scom-token-list';
import ScomDappContainer from '@scom/scom-dapp-container';
import ScomWalletModal, { IWalletPlugin } from '@scom/scom-wallet-modal';
import configData from './data.json';
import formSchema from './formSchema';
import ScomTxStatusModal from '@scom/scom-tx-status-modal';

const Theme = Styles.Theme.ThemeVars;

interface ScomInvestorClaimElement extends ControlElement {
	campaigns: ICampaign[];
	defaultChainId: number;
	wallets: IWalletPlugin[];
	networks: INetworkConfig[];
	showHeader?: boolean;
	lazyLoad?: boolean;
}

declare global {
	namespace JSX {
		interface IntrinsicElements {
			['i-scom-investor-claim']: ScomInvestorClaimElement;
		}
	}
}

@customModule
@customElements('i-scom-investor-claim')
export default class ScomInvertorClaim extends Module {
	private state: State;
	private _data: IClaimBasicInfo = {
		campaigns: [],
		defaultChainId: 0,
		wallets: [],
		networks: []
	}
	tag: any = {};
	defaultEdit: boolean = true;

	private loadingElm: Panel;
	private campaign?: ICampaignInfo;
	private pnlClaimInfo: Panel;
	private pnlEmpty: Panel;
	private txStatusModal: ScomTxStatusModal;
	private listTimer: any = [];
	private dappContainer: ScomDappContainer;
	private mdWallet: ScomWalletModal;

	private rpcWalletEvents: IEventBusRegistry[] = [];
	private symbol = 'OSWAP'; // TODO - Change this by the token address that is taken from the API

	private _getActions(category?: string) {
		const actions = [
			{
				name: 'Edit',
				icon: 'edit',
				command: (builder: any, userInputData: any) => {
					let oldData: IClaimBasicInfo = {
						campaigns: [],
						defaultChainId: 0,
						wallets: [],
						networks: []
					};
					let oldTag = {};
					return {
						execute: async () => {
							oldData = JSON.parse(JSON.stringify(this._data));
							const {
								campaigns,
								...themeSettings
							} = userInputData;

							const generalSettings = {
								campaigns
							};
							if (generalSettings.campaigns !== undefined) this._data.campaigns = generalSettings.campaigns;
							await this.resetRpcWallet();
							if (builder?.setData) builder.setData(this._data);

							oldTag = JSON.parse(JSON.stringify(this.tag));
							if (builder?.setTag) builder.setTag(themeSettings);
							else this.setTag(themeSettings);
							if (this.dappContainer) this.dappContainer.setTag(themeSettings);
						},
						undo: async () => {
							this._data = JSON.parse(JSON.stringify(oldData));
							this.initializeWidgetConfig();
							if (builder?.setData) builder.setData(this._data);

							this.tag = JSON.parse(JSON.stringify(oldTag));
							if (builder?.setTag) builder.setTag(this.tag);
							else this.setTag(this.tag);
							if (this.dappContainer) this.dappContainer.setTag(this.tag);
						},
						redo: () => { }
					}
				},
				userInputDataSchema: formSchema.dataSchema,
				userInputUISchema: formSchema.uiSchema,
				customControls: formSchema.customControls
			}
		];
		return actions;
	}

	getConfigurators() {
		let self = this;
		return [
			{
				name: 'Builder Configurator',
				target: 'Builders',
				getActions: (category?: string) => {
					return this._getActions(category);
				},
				getData: this.getData.bind(this),
				setData: async (data: any) => {
					const defaultData = configData.defaultBuilderData;
					await this.setData({ ...defaultData, ...data });
				},
				getTag: this.getTag.bind(this),
				setTag: this.setTag.bind(this)
			},
			{
				name: 'Emdedder Configurator',
				target: 'Embedders',
				getActions: () => {
					return this._getActions();
				},
				getLinkParams: () => {
					const data = this._data || {};
					return {
						data: window.btoa(JSON.stringify(data))
					}
				},
				setLinkParams: async (params: any) => {
					if (params.data) {
						const utf8String = decodeURIComponent(params.data);
						const decodedString = window.atob(utf8String);
						const newData = JSON.parse(decodedString);
						let resultingData = {
							...self._data,
							...newData
						};
						await this.setData(resultingData);
					}
				},
				getData: this.getData.bind(this),
				setData: this.setData.bind(this),
				getTag: this.getTag.bind(this),
				setTag: this.setTag.bind(this)
			}
		]
	}

	private async getData() {
		return this._data;
	}

	private async resetRpcWallet() {
		this.removeRpcWalletEvents();
		const rpcWalletId = await this.state.initRpcWallet(this.defaultChainId);
		const rpcWallet = this.rpcWallet;
		const chainChangedEvent = rpcWallet.registerWalletEvent(this, Constants.RpcWalletEvent.ChainChanged, async (chainId: number) => {
			this.initializeWidgetConfig();
		});
		const connectedEvent = rpcWallet.registerWalletEvent(this, Constants.RpcWalletEvent.Connected, async (connected: boolean) => {
			this.initializeWidgetConfig(true);
		});
		this.rpcWalletEvents.push(chainChangedEvent, connectedEvent);

		const data = {
			defaultChainId: this.defaultChainId,
			wallets: this.wallets,
			networks: this.networks,
			showHeader: this.showHeader,
			rpcWalletId: rpcWallet.instanceId || ''
		}
		if (this.dappContainer?.setData) this.dappContainer.setData(data);
	}

	private async setData(value: IClaimBasicInfo) {
		this._data = value;
		await this.resetRpcWallet();
		this.initializeWidgetConfig();
	}

	private async getTag() {
		return this.tag;
	}

	private updateTag(type: 'light' | 'dark', value: any) {
		this.tag[type] = this.tag[type] ?? {};
		for (let prop in value) {
			if (value.hasOwnProperty(prop))
				this.tag[type][prop] = value[prop];
		}
	}

	private async setTag(value: any) {
		const newValue = value || {};
		for (let prop in newValue) {
			if (newValue.hasOwnProperty(prop)) {
				if (prop === 'light' || prop === 'dark')
					this.updateTag(prop, newValue[prop]);
				else
					this.tag[prop] = newValue[prop];
			}
		}
		if (this.dappContainer)
			this.dappContainer.setTag(this.tag);
		this.updateTheme();
		if (this.pnlClaimInfo) {
			this.renderCampaign();
		}
	}

	private updateStyle(name: string, value: any) {
		value ?
			this.style.setProperty(name, value) :
			this.style.removeProperty(name);
	}

	private updateTheme() {
		const themeVar = this.dappContainer?.theme || 'light';
		this.updateStyle('--text-primary', this.tag[themeVar]?.fontColor);
		this.updateStyle('--background-main', this.tag[themeVar]?.backgroundColor);
		this.updateStyle('--text-secondary', this.tag[themeVar]?.textSecondary);
		// this.updateStyle('--colors-primary-main', this.tag[themeVar]?.buttonBackgroundColor);
		// this.updateStyle('--colors-primary-contrast_text', this.tag[themeVar]?.buttonFontColor);
	}

	get defaultChainId() {
		return this._data.defaultChainId;
	}

	set defaultChainId(value: number) {
		this._data.defaultChainId = value;
	}

	get wallets() {
		return this._data.wallets ?? [];
	}

	set wallets(value: IWalletPlugin[]) {
		this._data.wallets = value;
	}

	get networks() {
		return this._data.networks ?? [];
	}

	set networks(value: any[]) {
		this._data.networks = value;
	}

	get showHeader() {
		return this._data.showHeader ?? true;
	}

	set showHeader(value: boolean) {
		this._data.showHeader = value;
	}

	private get campaignInfo() {
		const chainId = this.chainId;
		return this._data.campaigns?.find(v => v.chainId === chainId && v.dripAddress);
	}

	private get chainId() {
		return this.state.getChainId();
	}

	private get rpcWallet() {
		return this.state.getRpcWallet();
	}

	constructor(parent?: Container, options?: ScomInvestorClaimElement) {
		super(parent, options);
		this.state = new State(configData);
	}

	removeRpcWalletEvents() {
		const rpcWallet = this.rpcWallet;
		for (let event of this.rpcWalletEvents) {
			rpcWallet.unregisterWalletEvent(event);
		}
		this.rpcWalletEvents = [];
	}

	onHide() {
		this.dappContainer.onHide();
		this.removeRpcWalletEvents();
	}

	private initializeWidgetConfig = async (hideLoading?: boolean) => {
		setTimeout(async () => {
			if (!hideLoading && this.loadingElm) {
				this.loadingElm.visible = true;
			}
			if (!isClientWalletConnected() || !this.checkValidation()) {
				await this.renderEmpty();
				return;
			}
			tokenStore.updateTokenMapData(this.chainId);
			const rpcWallet = this.rpcWallet;
			if (rpcWallet.address) {
				tokenStore.updateAllTokenBalances(rpcWallet);
			}
			await Wallet.getClientInstance().init();
			this.campaign = await getInvestorClaimInfo(rpcWallet, this.campaignInfo);
			await this.renderCampaign();
			if (!hideLoading && this.loadingElm) {
				this.loadingElm.visible = false;
			}
		})
	}

	private showMessage = (status: 'warning' | 'success' | 'error', content?: string | Error) => {
		if (!this.txStatusModal) return;
		let params: any = { status };
		if (status === 'success') {
			params.txtHash = content;
		} else {
			params.content = content;
		}
		this.txStatusModal.message = { ...params };
		this.txStatusModal.showModal();
	}

	private onClaim = async (btnClaim: Button, data: ICampaignInfo) => {
		if (!isClientWalletConnected() || !this.state.isRpcWalletConnected()) {
			this.connectWallet();
			return;
		}
		if (!data) return;
		this.showMessage('warning', `Claiming ${formatNumber(data.claimable)} ${this.symbol}`);
		const callBack = async (err: string | Error, reply?: any) => {
			if (err) {
				this.showMessage('error', err);
			} else {
				this.showMessage('success', reply);
				btnClaim.enabled = false;
				btnClaim.rightIcon.visible = true;
			}
		};

		const confirmationCallBack = async (receipt: any) => {
			await this.initializeWidgetConfig(true);
			btnClaim.rightIcon.visible = false;
			btnClaim.enabled = true;
		};

		registerSendTxEvents({
			transactionHash: callBack,
			confirmation: confirmationCallBack
		});

		investorClaimToken(data.dripAddress, data.lockId, callBack);
	}

	private checkValidation = () => {
		if (!this._data?.campaigns?.length) return false;
		return this._data.campaigns.every(v => v.chainId && v.dripAddress);
	}

	private removeTimer = () => {
		for (const timer of this.listTimer) {
			clearInterval(timer);
		}
		this.listTimer = [];
	}

	private connectWallet = async () => {
		if (!isClientWalletConnected()) {
			if (this.mdWallet) {
				await application.loadPackage('@scom/scom-wallet-modal', '*');
				this.mdWallet.networks = this.networks;
				this.mdWallet.wallets = this.wallets;
				this.mdWallet.showModal();
			}
			return;
		}
		if (!this.state.isRpcWalletConnected()) {
			const clientWallet = Wallet.getClientInstance();
			await clientWallet.switchNetwork(this.chainId);
		}
	}

	private initEmptyUI = async () => {
		const isClientConnected = isClientWalletConnected();
		this.pnlEmpty.clearInnerHTML();
		this.pnlEmpty.appendChild(
			<i-panel class="no-campaign" height="100%" background={{ color: Theme.background.main }}>
				<i-vstack gap={10} verticalAlignment="center">
					<i-image url={Assets.fullPath('img/claim/TrollTrooper.svg')} />
					<i-label caption={isClientConnected ? 'No Campaigns' : 'Please connect with your wallet!'} />
				</i-vstack>
			</i-panel>
		);
		this.pnlEmpty.visible = true;
	}

	private renderEmpty = async () => {
		await this.initEmptyUI();
		if (this.loadingElm) {
			this.loadingElm.visible = false;
		}
	}

	private renderCampaign = async () => {
		await this.initEmptyUI();
		this.pnlEmpty.visible = false;
		this.removeTimer();
		if (!this.campaign) {
			this.pnlClaimInfo.visible = false;
			this.pnlEmpty.visible = true;
			return;
		}

		let info = { ...this.campaign };
		const updateClaimTokenInfo = async () => {
			if (!this.campaign?.lockId) return;
			const latestInfo = await getLatestInvestorClaimTokenInfo(this.rpcWallet, this.campaign.dripAddress, this.campaign.lockId);
			info = {
				...latestInfo,
				...info
			};
			lbLockedAmount.caption = `${formatNumber(info.lockedAmount)} ${this.symbol}`;
			lbClaimable.caption = `${formatNumber(info.claimable)} ${this.symbol}`;
			const isRpcConnected = this.state.isRpcWalletConnected();
			const isClientConnected = isClientWalletConnected();
			btnClaim.caption = !isClientConnected ? 'Connect Wallet' : !isRpcConnected ? 'Switch Network' : 'Claim';
			btnClaim.enabled = !isClientConnected || !isRpcConnected || (btnClaim.enabled && parseFloat(info.claimable) > 0);
		}

		const lbLockedAmount = await Label.create({
			caption: `${formatNumber(this.campaign.lockedAmount)} ${this.symbol}`,
			margin: { left: 'auto' }
		});
		const lbClaimable = await Label.create({
			caption: `${formatNumber(this.campaign.claimable)} ${this.symbol}`,
			margin: { left: 'auto' }
		});
		const btnClaim = await Button.create({
			caption: !isClientWalletConnected() ? 'Connect Wallet' : !this.state.isRpcWalletConnected() ? 'Switch Network' : 'Claim',
			rightIcon: { spin: true, visible: false },
			margin: { top: 8, left: 'auto', right: 'auto' }
		});
		btnClaim.classList.add('btn-os', 'btn-claim');
		if (this.campaign.lockId) {
			this.listTimer.push(setInterval(updateClaimTokenInfo, 10000));
		}

		let vestingStart = this.campaign.vestingStart ? moment.unix(this.campaign.vestingStart).format('YYYY-MM-DD HH:mm:ss') : '';
		let vestingEnd = this.campaign.vestingEnd ? moment.unix(this.campaign.vestingEnd).format('YYYY-MM-DD HH:mm:ss') : '';

		btnClaim.enabled = !isClientWalletConnected() || !this.state.isRpcWalletConnected() || parseFloat(this.campaign.claimable) > 0;
		btnClaim.onClick = () => this.onClaim(btnClaim, info);

		this.pnlClaimInfo.clearInnerHTML();
		this.pnlClaimInfo.appendChild(
			<i-vstack gap={10} verticalAlignment="center">
				<i-vstack gap={8} horizontalAlignment="center">
					<i-image width={75} height={75} url={Assets.fullPath('img/tokens/openswap.png')} fallbackUrl={fallBackUrl} />
					<i-label caption={this.campaign.campaignName} font={{ size: '1.25rem', color: Theme.text.secondary, bold: true }} />
					<i-label caption={this.campaign.campaignDesc} />
				</i-vstack>
				<i-panel width="100%" height={2} background={{ color: Theme.input.background }} />
				<i-vstack gap={10} verticalAlignment="center">
					<i-hstack gap={4}>
						<i-label caption={`${this.symbol} Locked:`} />
						{lbLockedAmount}
					</i-hstack>
					{vestingStart ? <i-hstack gap={4}>
						<i-label caption="Vesting Start" />
						<i-label caption={vestingStart} margin={{ left: 'auto' }} />
					</i-hstack> : []}
					{vestingEnd ? <i-hstack gap={4}>
						<i-label caption="Vesting End" />
						<i-label caption={vestingEnd} margin={{ left: 'auto' }} />
					</i-hstack> : []}
					<i-hstack gap={4}>
						<i-label caption={`${this.symbol} Claimable:`} />
						{lbClaimable}
					</i-hstack>
					{btnClaim}
				</i-vstack>
			</i-vstack>
		);
		this.pnlClaimInfo.visible = true;
	}

	async init() {
		this.isReadyCallbackQueued = true;
		super.init();
		const lazyLoad = this.getAttribute('lazyLoad', true, false);
		if (!lazyLoad) {
			const campaigns = this.getAttribute('campaigns', true, []);
			const defaultChainId = this.getAttribute('defaultChainId', true);
			const networks = this.getAttribute('networks', true);
			const wallets = this.getAttribute('wallets', true);
			const showHeader = this.getAttribute('showHeader', true);
			if (campaigns) {
				await this.setData({
					campaigns,
					defaultChainId,
					networks,
					wallets,
					showHeader
				});
			} else {
				this.renderEmpty();
			}
		}
		this.isReadyCallbackQueued = false;
		this.executeReadyCallback();
	}

	render() {
		return (
			<i-scom-dapp-container id="dappContainer" class={claimDappContainer}>
				<i-panel class={claimComponent} minHeight={295}>
					<i-panel class="claim-layout" height="100%" margin={{ left: 'auto', right: 'auto' }}>
						<i-vstack id="loadingElm" class="i-loading-overlay">
							<i-vstack class="i-loading-spinner" horizontalAlignment="center" verticalAlignment="center">
								<i-icon class="i-loading-spinner_icon" image={{ url: Assets.fullPath('img/loading.svg'), width: 36, height: 36 }} />
								<i-label caption="Loading..." font={{ color: '#FD4A4C', size: '1.5em' }} class="i-loading-spinner_text" />
							</i-vstack>
						</i-vstack>
						<i-panel class="claim-wapper">
							<i-hstack id="pnlClaimInfo" horizontalAlignment="center" padding={{ top: 10, bottom: 10, left: 16, right: 16 }} />
							<i-panel id="pnlEmpty" />
						</i-panel>
					</i-panel>
					<i-scom-tx-status-modal id="txStatusModal" />
					<i-scom-wallet-modal id="mdWallet" wallets={[]} />
				</i-panel>
			</i-scom-dapp-container>
		)
	}
}
