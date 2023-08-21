var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/scom-investor-claim/assets.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let moduleDir = components_1.application.currentModuleDir;
    function fullPath(path) {
        if (path.indexOf('://') > 0)
            return path;
        return `${moduleDir}/${path}`;
    }
    exports.default = {
        fullPath
    };
});
define("@scom/scom-investor-claim/global/utils/helper.ts", ["require", "exports", "@ijstech/eth-wallet"], function (require, exports, eth_wallet_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.formatNumberWithSeparators = exports.formatNumber = void 0;
    const formatNumber = (value, decimals) => {
        let val = value;
        const minValue = '0.0000001';
        if (typeof value === 'string') {
            val = new eth_wallet_1.BigNumber(value).toNumber();
        }
        else if (typeof value === 'object') {
            val = value.toNumber();
        }
        if (val != 0 && new eth_wallet_1.BigNumber(val).lt(minValue)) {
            return `<${minValue}`;
        }
        return (0, exports.formatNumberWithSeparators)(val, decimals || 4);
    };
    exports.formatNumber = formatNumber;
    const formatNumberWithSeparators = (value, precision) => {
        if (!value)
            value = 0;
        if (precision) {
            let outputStr = '';
            if (value >= 1) {
                const unit = Math.pow(10, precision);
                const rounded = Math.floor(value * unit) / unit;
                outputStr = rounded.toLocaleString('en-US', { maximumFractionDigits: precision });
            }
            else {
                outputStr = value.toLocaleString('en-US', { maximumSignificantDigits: precision });
            }
            if (outputStr.length > 18) {
                outputStr = outputStr.substring(0, 18) + '...';
            }
            return outputStr;
        }
        return value.toLocaleString('en-US');
    };
    exports.formatNumberWithSeparators = formatNumberWithSeparators;
});
define("@scom/scom-investor-claim/global/utils/common.ts", ["require", "exports", "@ijstech/eth-wallet"], function (require, exports, eth_wallet_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.registerSendTxEvents = void 0;
    const registerSendTxEvents = (sendTxEventHandlers) => {
        const wallet = eth_wallet_2.Wallet.getClientInstance();
        wallet.registerSendTxEvents({
            transactionHash: (error, receipt) => {
                if (sendTxEventHandlers.transactionHash) {
                    sendTxEventHandlers.transactionHash(error, receipt);
                }
            },
            confirmation: (receipt) => {
                if (sendTxEventHandlers.confirmation) {
                    sendTxEventHandlers.confirmation(receipt);
                }
            },
        });
    };
    exports.registerSendTxEvents = registerSendTxEvents;
});
define("@scom/scom-investor-claim/global/utils/interfaces.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("@scom/scom-investor-claim/global/utils/index.ts", ["require", "exports", "@scom/scom-investor-claim/global/utils/helper.ts", "@scom/scom-investor-claim/global/utils/common.ts", "@scom/scom-investor-claim/global/utils/interfaces.ts"], function (require, exports, helper_1, common_1, interfaces_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.registerSendTxEvents = void 0;
    ///<amd-module name='@scom/scom-investor-claim/global/utils/index.ts'/> 
    __exportStar(helper_1, exports);
    Object.defineProperty(exports, "registerSendTxEvents", { enumerable: true, get: function () { return common_1.registerSendTxEvents; } });
    __exportStar(interfaces_1, exports);
});
define("@scom/scom-investor-claim/global/index.ts", ["require", "exports", "@scom/scom-investor-claim/global/utils/index.ts"], function (require, exports, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-investor-claim/global/index.ts'/> 
    __exportStar(index_1, exports);
});
define("@scom/scom-investor-claim/store/utils.ts", ["require", "exports", "@ijstech/eth-wallet", "@scom/scom-network-list", "@ijstech/components"], function (require, exports, eth_wallet_3, scom_network_list_1, components_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isClientWalletConnected = exports.State = void 0;
    class State {
        constructor(options) {
            this.networkMap = {};
            this.infuraId = '';
            this.rpcWalletId = '';
            this.initData(options);
        }
        initData(options) {
            if (options.infuraId) {
                this.infuraId = options.infuraId;
            }
            if (options.networks) {
                this.setNetworkList(options.networks, options.infuraId);
            }
        }
        initRpcWallet(defaultChainId) {
            var _a, _b, _c;
            if (this.rpcWalletId) {
                return this.rpcWalletId;
            }
            const clientWallet = eth_wallet_3.Wallet.getClientInstance();
            const networkList = Object.values(((_a = components_2.application.store) === null || _a === void 0 ? void 0 : _a.networkMap) || []);
            const instanceId = clientWallet.initRpcWallet({
                networks: networkList,
                defaultChainId,
                infuraId: (_b = components_2.application.store) === null || _b === void 0 ? void 0 : _b.infuraId,
                multicalls: (_c = components_2.application.store) === null || _c === void 0 ? void 0 : _c.multicalls
            });
            this.rpcWalletId = instanceId;
            if (clientWallet.address) {
                const rpcWallet = eth_wallet_3.Wallet.getRpcWalletInstance(instanceId);
                rpcWallet.address = clientWallet.address;
            }
            return instanceId;
        }
        setNetworkList(networkList, infuraId) {
            const wallet = eth_wallet_3.Wallet.getClientInstance();
            this.networkMap = {};
            const defaultNetworkList = (0, scom_network_list_1.default)();
            const defaultNetworkMap = defaultNetworkList.reduce((acc, cur) => {
                acc[cur.chainId] = cur;
                return acc;
            }, {});
            for (let network of networkList) {
                const networkInfo = defaultNetworkMap[network.chainId];
                if (!networkInfo)
                    continue;
                if (infuraId && network.rpcUrls && network.rpcUrls.length > 0) {
                    for (let i = 0; i < network.rpcUrls.length; i++) {
                        network.rpcUrls[i] = network.rpcUrls[i].replace(/{InfuraId}/g, infuraId);
                    }
                }
                this.networkMap[network.chainId] = Object.assign(Object.assign({}, networkInfo), network);
                wallet.setNetworkInfo(this.networkMap[network.chainId]);
            }
        }
        getRpcWallet() {
            return this.rpcWalletId ? eth_wallet_3.Wallet.getRpcWalletInstance(this.rpcWalletId) : null;
        }
        isRpcWalletConnected() {
            const wallet = this.getRpcWallet();
            return wallet === null || wallet === void 0 ? void 0 : wallet.isConnected;
        }
        getChainId() {
            const rpcWallet = this.getRpcWallet();
            return rpcWallet === null || rpcWallet === void 0 ? void 0 : rpcWallet.chainId;
        }
    }
    exports.State = State;
    function isClientWalletConnected() {
        const wallet = eth_wallet_3.Wallet.getClientInstance();
        return wallet.isConnected;
    }
    exports.isClientWalletConnected = isClientWalletConnected;
});
define("@scom/scom-investor-claim/store/index.ts", ["require", "exports", "@scom/scom-investor-claim/assets.ts", "@scom/scom-investor-claim/store/utils.ts"], function (require, exports, assets_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fallBackUrl = void 0;
    exports.fallBackUrl = assets_1.default.fullPath('img/token-placeholder.svg');
    __exportStar(utils_1, exports);
});
define("@scom/scom-investor-claim/claim-utils/index.ts", ["require", "exports", "@ijstech/eth-wallet", "@scom/oswap-drip-contract"], function (require, exports, eth_wallet_4, oswap_drip_contract_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.investorClaimToken = exports.getLatestInvestorClaimTokenInfo = exports.getInvestorClaimInfo = void 0;
    const getInvestorClaimInfo = async (wallet, campaign) => {
        if (!campaign)
            return undefined;
        const extendedInfo = await getInvestorClaimExtendedInfo(wallet, campaign.dripAddress);
        return Object.assign(Object.assign({}, campaign), extendedInfo);
    };
    exports.getInvestorClaimInfo = getInvestorClaimInfo;
    const getInvestorClaimExtendedInfo = async (wallet, dripAddress) => {
        const zeroAmounts = {
            claimable: '0',
            lockedAmount: '0'
        };
        try {
            const currentAddress = wallet.address;
            const drip = new oswap_drip_contract_1.Contracts.Drip(wallet, dripAddress);
            const balance = await drip.balanceOf(currentAddress);
            if (balance.gt(0)) {
                const lockId = await drip.tokenOfOwnerByIndex({
                    owner: currentAddress,
                    index: 0
                });
                let info = await drip.getInfo(lockId);
                if (currentAddress != info._recipient)
                    return zeroAmounts;
                let maxClaimedFundsInWei = await drip.maximumAllowedClaimedFunds(lockId);
                let claimedAmountInWei = await drip.claimedAmount(lockId);
                let claimableInWei = new eth_wallet_4.BigNumber(maxClaimedFundsInWei).minus(claimedAmountInWei).toFixed();
                let claimable = eth_wallet_4.Utils.fromDecimals(claimableInWei).toFixed();
                let lockedAmountInWei = new eth_wallet_4.BigNumber(info._totalAmount).minus(claimedAmountInWei).toFixed();
                let lockedAmount = eth_wallet_4.Utils.fromDecimals(lockedAmountInWei).toFixed();
                let vestingStart = info._startDate.toNumber();
                let vestingEnd = info._endDate.toNumber();
                let obj = {
                    info,
                    lockId: lockId.toNumber(),
                    claimable,
                    lockedAmount,
                    vestingStart,
                    vestingEnd
                };
                return obj;
            }
            return zeroAmounts;
        }
        catch (err) {
            console.log('err', err);
            return zeroAmounts;
        }
    };
    const getLatestInvestorClaimTokenInfo = async (wallet, dripAddress, lockId) => {
        let drip = new oswap_drip_contract_1.Contracts.Drip(wallet, dripAddress);
        let info = await drip.getInfo(lockId);
        let maxClaimedFundsInWei = await drip.maximumAllowedClaimedFunds(lockId);
        let claimedAmountInWei = await drip.claimedAmount(lockId);
        let claimableInWei = new eth_wallet_4.BigNumber(maxClaimedFundsInWei).minus(claimedAmountInWei).toFixed();
        let claimable = eth_wallet_4.Utils.fromDecimals(claimableInWei).toFixed();
        let lockedAmountInWei = new eth_wallet_4.BigNumber(info._totalAmount).minus(claimedAmountInWei).toFixed();
        let lockedAmount = eth_wallet_4.Utils.fromDecimals(lockedAmountInWei).toFixed();
        return {
            claimable,
            lockedAmount
        };
    };
    exports.getLatestInvestorClaimTokenInfo = getLatestInvestorClaimTokenInfo;
    const investorClaimToken = async (contractAddress, id, callback) => {
        if (!contractAddress)
            return;
        try {
            let wallet = eth_wallet_4.Wallet.getClientInstance();
            let drip = new oswap_drip_contract_1.Contracts.Drip(wallet, contractAddress);
            let receipt = await drip.claim(id);
            return receipt;
        }
        catch (error) {
            if (callback)
                callback(error);
        }
    };
    exports.investorClaimToken = investorClaimToken;
});
define("@scom/scom-investor-claim/index.css.ts", ["require", "exports", "@ijstech/components", "@scom/scom-investor-claim/assets.ts"], function (require, exports, components_3, assets_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.claimComponent = exports.claimDappContainer = void 0;
    const Theme = components_3.Styles.Theme.ThemeVars;
    const colorVar = {
        primaryButton: 'transparent linear-gradient(90deg, #AC1D78 0%, #E04862 100%) 0% 0% no-repeat padding-box',
        primaryGradient: 'linear-gradient(255deg,#f15e61,#b52082)',
        darkBg: '#181E3E 0% 0% no-repeat padding-box',
        primaryDisabled: 'transparent linear-gradient(270deg,#351f52,#552a42) 0% 0% no-repeat padding-box !important'
    };
    components_3.Styles.fontFace({
        fontFamily: "Montserrat Regular",
        src: `url("${assets_2.default.fullPath('fonts/montserrat/Montserrat-Regular.ttf')}") format("truetype")`,
        fontWeight: 'nomal',
        fontStyle: 'normal'
    });
    components_3.Styles.fontFace({
        fontFamily: "Raleway Bold",
        src: `url("${assets_2.default.fullPath('fonts/raleway/Raleway-Bold.ttf')}") format("truetype")`,
        fontWeight: 'bold',
        fontStyle: 'normal'
    });
    exports.claimDappContainer = components_3.Styles.style({
        $nest: {
            'dapp-container-body': {
                $nest: {
                    '&::-webkit-scrollbar': {
                        width: '6px',
                        height: '6px'
                    },
                    '&::-webkit-scrollbar-track': {
                        borderRadius: '10px',
                        border: '1px solid transparent',
                        background: `${Theme.divider} !important`
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: `${Theme.colors.primary.main} !important`,
                        borderRadius: '10px',
                        outline: '1px solid transparent'
                    }
                }
            }
        }
    });
    exports.claimComponent = components_3.Styles.style({
        $nest: {
            'i-label': {
                fontFamily: 'Montserrat Regular',
            },
            'span': {
                letterSpacing: '0.15px',
            },
            '.claim-wapper': {
                background: Theme.background.main,
            },
            '.i-loading-overlay': {
                background: Theme.background.main,
            },
            '.btn-os': {
                background: colorVar.primaryButton,
                height: 'auto !important',
                color: '#fff',
                // color: Theme.colors.primary.contrastText,
                transition: 'background .3s ease',
                fontSize: '1rem',
                fontWeight: 'bold',
                fontFamily: 'Raleway Bold',
                $nest: {
                    'i-icon.loading-icon': {
                        marginInline: '0.25rem',
                        width: '16px !important',
                        height: '16px !important',
                    },
                    'svg': {
                        // fill: `${Theme.colors.primary.contrastText} !important`
                        fill: `#fff !important`
                    }
                },
            },
            '.btn-os:not(.disabled):not(.is-spinning):hover, .btn-os:not(.disabled):not(.is-spinning):focus': {
                background: colorVar.primaryGradient,
                backgroundColor: 'transparent',
                boxShadow: 'none',
                opacity: .9
            },
            '.btn-os:not(.disabled):not(.is-spinning):focus': {
                boxShadow: '0 0 0 0.2rem rgb(0 123 255 / 25%)'
            },
            '.btn-os.disabled, .btn-os.is-spinning': {
                background: colorVar.primaryDisabled,
                opacity: 1
            },
            '.hidden': {
                display: 'none !important'
            },
            '.claim-layout': {
                width: '100%',
                marginInline: 'auto',
                overflow: 'hidden',
            },
            '.cursor-default': {
                cursor: 'default',
            },
            '.btn-claim': {
                width: 250,
                maxWidth: '100%',
                padding: '0.625rem 0',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                borderRadius: 12,
            },
            '.no-campaign': {
                padding: '3rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                justifyContent: 'center',
                $nest: {
                    'i-label > *': {
                        fontSize: '1.5rem',
                        marginTop: '1rem',
                    }
                }
            },
            'i-modal .modal': {
                background: Theme.background.modal,
            },
            '#loadingElm.i-loading--active': {
                marginTop: '2rem',
                position: 'initial',
                $nest: {
                    '.claim-wapper': {
                        display: 'none !important',
                    },
                    '.i-loading-spinner': {
                        marginTop: '2rem',
                    },
                },
            }
        }
    });
});
define("@scom/scom-investor-claim/data.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-investor-claim/data.json.ts'/> 
    exports.default = {
        infuraId: 'adc596bf88b648e2a8902bc9093930c5',
        networks: [
            {
                chainId: 97,
                explorerTxUrl: 'https://testnet.bscscan.com/tx/',
                explorerAddressUrl: 'https://testnet.bscscan.com/address/'
            },
            {
                chainId: 43113,
                explorerTxUrl: 'https://testnet.snowtrace.io/tx/',
                explorerAddressUrl: 'https://testnet.snowtrace.io/address/'
            }
        ],
        defaultBuilderData: {
            defaultChainId: 43113,
            campaigns: [
                {
                    chainId: 97,
                    campaignId: 1,
                    campaignName: 'Claim OSWAP',
                    campaignDesc: 'Thank you for supporting OpenSwap as an early stage backer',
                    dripAddress: '0xFc28280774317326229aCC97C830ad77348fa1eF'
                },
                {
                    chainId: 56,
                    campaignId: 1,
                    campaignName: 'Backer Claim',
                    campaignDesc: 'Thank you for supporting OpenSwap as an early stage backer.',
                    dripAddress: '0x0E1F5ae02eEEB1259f1DDb21D5091Ec22c2588eC'
                }
            ],
            networks: [
                {
                    chainId: 43113
                },
                {
                    chainId: 97
                }
            ],
            wallets: [
                {
                    name: 'metamask'
                }
            ]
        }
    };
});
define("@scom/scom-investor-claim/formSchema.ts", ["require", "exports", "@scom/scom-network-picker"], function (require, exports, scom_network_picker_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const chainIds = [1, 56, 137, 250, 97, 80001, 43113, 43114];
    const theme = {
        backgroundColor: {
            type: 'string',
            format: 'color'
        },
        fontColor: {
            type: 'string',
            format: 'color'
        },
        textSecondary: {
            type: 'string',
            title: 'Campaign Font Color',
            format: 'color'
        },
        // buttonBackgroundColor: {
        // 	type: 'string',
        // 	format: 'color'
        // },
        // buttonFontColor: {
        // 	type: 'string',
        // 	format: 'color'
        // }
    };
    exports.default = {
        general: {
            dataSchema: {
                type: 'object',
                properties: {
                    campaigns: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                chainId: {
                                    type: 'number',
                                    enum: chainIds,
                                    required: true
                                },
                                campaignName: {
                                    type: 'string',
                                    required: true
                                },
                                campaignDesc: {
                                    type: 'string'
                                },
                                dripAddress: {
                                    type: 'string',
                                    required: true
                                }
                            }
                        }
                    }
                }
            },
            uiSchema: {
                type: 'VerticalLayout',
                elements: [
                    {
                        type: 'Control',
                        scope: '#/properties/campaigns',
                        options: {
                            detail: {
                                type: 'VerticalLayout'
                            }
                        }
                    }
                ]
            },
            customControls: {
                "#/properties/campaigns/properties/chainId": {
                    render: () => {
                        const networkPicker = new scom_network_picker_1.default(undefined, {
                            type: 'combobox',
                            networks: chainIds.map(v => { return { chainId: v }; })
                        });
                        return networkPicker;
                    },
                    getData: (control) => {
                        var _a;
                        return (_a = control.selectedNetwork) === null || _a === void 0 ? void 0 : _a.chainId;
                    },
                    setData: (control, value) => {
                        control.setNetworkByChainId(value);
                    }
                }
            }
        },
        theme: {
            dataSchema: {
                type: 'object',
                properties: {
                    "dark": {
                        type: 'object',
                        properties: theme
                    },
                    "light": {
                        type: 'object',
                        properties: theme
                    }
                }
            }
        }
    };
});
define("@scom/scom-investor-claim", ["require", "exports", "@ijstech/components", "@ijstech/eth-wallet", "@scom/scom-investor-claim/assets.ts", "@scom/scom-investor-claim/global/index.ts", "@scom/scom-investor-claim/store/index.ts", "@scom/scom-investor-claim/claim-utils/index.ts", "@scom/scom-investor-claim/index.css.ts", "@scom/scom-token-list", "@scom/scom-investor-claim/data.json.ts", "@scom/scom-investor-claim/formSchema.ts"], function (require, exports, components_4, eth_wallet_5, assets_3, index_2, index_3, index_4, index_css_1, scom_token_list_1, data_json_1, formSchema_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_4.Styles.Theme.ThemeVars;
    let ScomInvertorClaim = class ScomInvertorClaim extends components_4.Module {
        _getActions(category) {
            const actions = [
                {
                    name: 'Settings',
                    icon: 'cog',
                    command: (builder, userInputData) => {
                        let _oldData = {
                            campaigns: [],
                            defaultChainId: 0,
                            wallets: [],
                            networks: []
                        };
                        return {
                            execute: async () => {
                                _oldData = Object.assign({}, this._data);
                                if ((userInputData === null || userInputData === void 0 ? void 0 : userInputData.campaigns) !== undefined)
                                    this._data.campaigns = userInputData.campaigns;
                                await this.resetRpcWallet();
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(this._data);
                            },
                            undo: async () => {
                                this._data = Object.assign({}, _oldData);
                                this.initializeWidgetConfig();
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(this._data);
                            },
                            redo: () => { }
                        };
                    },
                    userInputDataSchema: formSchema_1.default.general.dataSchema,
                    userInputUISchema: formSchema_1.default.general.uiSchema,
                    customControls: formSchema_1.default.general.customControls
                },
                {
                    name: 'Theme Settings',
                    icon: 'palette',
                    command: (builder, userInputData) => {
                        let oldTag = {};
                        return {
                            execute: async () => {
                                if (!userInputData)
                                    return;
                                oldTag = JSON.parse(JSON.stringify(this.tag));
                                if (builder)
                                    builder.setTag(userInputData);
                                else
                                    this.setTag(userInputData);
                                if (this.dappContainer)
                                    this.dappContainer.setTag(userInputData);
                            },
                            undo: () => {
                                if (!userInputData)
                                    return;
                                this.tag = JSON.parse(JSON.stringify(oldTag));
                                if (builder)
                                    builder.setTag(this.tag);
                                else
                                    this.setTag(this.tag);
                                if (this.dappContainer)
                                    this.dappContainer.setTag(userInputData);
                            },
                            redo: () => { }
                        };
                    },
                    userInputDataSchema: formSchema_1.default.theme.dataSchema
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
                    getActions: (category) => {
                        return this._getActions(category);
                    },
                    getData: this.getData.bind(this),
                    setData: async (data) => {
                        const defaultData = data_json_1.default.defaultBuilderData;
                        await this.setData(Object.assign(Object.assign({}, defaultData), data));
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
                        };
                    },
                    setLinkParams: async (params) => {
                        if (params.data) {
                            const utf8String = decodeURIComponent(params.data);
                            const decodedString = window.atob(utf8String);
                            const newData = JSON.parse(decodedString);
                            let resultingData = Object.assign(Object.assign({}, self._data), newData);
                            await this.setData(resultingData);
                        }
                    },
                    getData: this.getData.bind(this),
                    setData: this.setData.bind(this),
                    getTag: this.getTag.bind(this),
                    setTag: this.setTag.bind(this)
                }
            ];
        }
        async getData() {
            return this._data;
        }
        async resetRpcWallet() {
            var _a;
            this.removeRpcWalletEvents();
            const rpcWalletId = await this.state.initRpcWallet(this.defaultChainId);
            const rpcWallet = this.rpcWallet;
            const chainChangedEvent = rpcWallet.registerWalletEvent(this, eth_wallet_5.Constants.RpcWalletEvent.ChainChanged, async (chainId) => {
                this.initializeWidgetConfig();
            });
            const connectedEvent = rpcWallet.registerWalletEvent(this, eth_wallet_5.Constants.RpcWalletEvent.Connected, async (connected) => {
                this.initializeWidgetConfig(true);
            });
            this.rpcWalletEvents.push(chainChangedEvent, connectedEvent);
            const data = {
                defaultChainId: this.defaultChainId,
                wallets: this.wallets,
                networks: this.networks,
                showHeader: this.showHeader,
                rpcWalletId: rpcWallet.instanceId || ''
            };
            if ((_a = this.dappContainer) === null || _a === void 0 ? void 0 : _a.setData)
                this.dappContainer.setData(data);
        }
        async setData(value) {
            this._data = value;
            await this.resetRpcWallet();
            this.initializeWidgetConfig();
        }
        async getTag() {
            return this.tag;
        }
        updateTag(type, value) {
            var _a;
            this.tag[type] = (_a = this.tag[type]) !== null && _a !== void 0 ? _a : {};
            for (let prop in value) {
                if (value.hasOwnProperty(prop))
                    this.tag[type][prop] = value[prop];
            }
        }
        async setTag(value) {
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
        updateStyle(name, value) {
            value ?
                this.style.setProperty(name, value) :
                this.style.removeProperty(name);
        }
        updateTheme() {
            var _a, _b, _c, _d;
            const themeVar = ((_a = this.dappContainer) === null || _a === void 0 ? void 0 : _a.theme) || 'light';
            this.updateStyle('--text-primary', (_b = this.tag[themeVar]) === null || _b === void 0 ? void 0 : _b.fontColor);
            this.updateStyle('--background-main', (_c = this.tag[themeVar]) === null || _c === void 0 ? void 0 : _c.backgroundColor);
            this.updateStyle('--text-secondary', (_d = this.tag[themeVar]) === null || _d === void 0 ? void 0 : _d.textSecondary);
            // this.updateStyle('--colors-primary-main', this.tag[themeVar]?.buttonBackgroundColor);
            // this.updateStyle('--colors-primary-contrast_text', this.tag[themeVar]?.buttonFontColor);
        }
        get defaultChainId() {
            return this._data.defaultChainId;
        }
        set defaultChainId(value) {
            this._data.defaultChainId = value;
        }
        get wallets() {
            var _a;
            return (_a = this._data.wallets) !== null && _a !== void 0 ? _a : [];
        }
        set wallets(value) {
            this._data.wallets = value;
        }
        get networks() {
            var _a;
            return (_a = this._data.networks) !== null && _a !== void 0 ? _a : [];
        }
        set networks(value) {
            this._data.networks = value;
        }
        get showHeader() {
            var _a;
            return (_a = this._data.showHeader) !== null && _a !== void 0 ? _a : true;
        }
        set showHeader(value) {
            this._data.showHeader = value;
        }
        get campaignInfo() {
            var _a;
            const chainId = this.chainId;
            return (_a = this._data.campaigns) === null || _a === void 0 ? void 0 : _a.find(v => v.chainId === chainId && v.dripAddress);
        }
        get chainId() {
            return this.state.getChainId();
        }
        get rpcWallet() {
            return this.state.getRpcWallet();
        }
        constructor(parent, options) {
            super(parent, options);
            this._data = {
                campaigns: [],
                defaultChainId: 0,
                wallets: [],
                networks: []
            };
            this.tag = {};
            this.defaultEdit = true;
            this.listTimer = [];
            this.rpcWalletEvents = [];
            this.symbol = 'OSWAP'; // TODO - Change this by the token address that is taken from the API
            this.initializeWidgetConfig = async (hideLoading) => {
                setTimeout(async () => {
                    if (!hideLoading && this.loadingElm) {
                        this.loadingElm.visible = true;
                    }
                    if (!(0, index_3.isClientWalletConnected)() || !this.checkValidation()) {
                        await this.renderEmpty();
                        return;
                    }
                    scom_token_list_1.tokenStore.updateTokenMapData(this.chainId);
                    const rpcWallet = this.rpcWallet;
                    if (rpcWallet.address) {
                        scom_token_list_1.tokenStore.updateAllTokenBalances(rpcWallet);
                    }
                    await eth_wallet_5.Wallet.getClientInstance().init();
                    this.campaign = await (0, index_4.getInvestorClaimInfo)(rpcWallet, this.campaignInfo);
                    await this.renderCampaign();
                    if (!hideLoading && this.loadingElm) {
                        this.loadingElm.visible = false;
                    }
                });
            };
            this.showMessage = (status, content) => {
                if (!this.txStatusModal)
                    return;
                let params = { status };
                if (status === 'success') {
                    params.txtHash = content;
                }
                else {
                    params.content = content;
                }
                this.txStatusModal.message = Object.assign({}, params);
                this.txStatusModal.showModal();
            };
            this.onClaim = async (btnClaim, data) => {
                if (!(0, index_3.isClientWalletConnected)() || !this.state.isRpcWalletConnected()) {
                    this.connectWallet();
                    return;
                }
                if (!data)
                    return;
                this.showMessage('warning', `Claiming ${(0, index_2.formatNumber)(data.claimable)} ${this.symbol}`);
                const callBack = async (err, reply) => {
                    if (err) {
                        this.showMessage('error', err);
                    }
                    else {
                        this.showMessage('success', reply);
                        btnClaim.enabled = false;
                        btnClaim.rightIcon.visible = true;
                    }
                };
                const confirmationCallBack = async (receipt) => {
                    await this.initializeWidgetConfig(true);
                    btnClaim.rightIcon.visible = false;
                    btnClaim.enabled = true;
                };
                (0, index_2.registerSendTxEvents)({
                    transactionHash: callBack,
                    confirmation: confirmationCallBack
                });
                (0, index_4.investorClaimToken)(data.dripAddress, data.lockId, callBack);
            };
            this.checkValidation = () => {
                var _a, _b;
                if (!((_b = (_a = this._data) === null || _a === void 0 ? void 0 : _a.campaigns) === null || _b === void 0 ? void 0 : _b.length))
                    return false;
                return this._data.campaigns.every(v => v.chainId && v.dripAddress);
            };
            this.removeTimer = () => {
                for (const timer of this.listTimer) {
                    clearInterval(timer);
                }
                this.listTimer = [];
            };
            this.connectWallet = async () => {
                if (!(0, index_3.isClientWalletConnected)()) {
                    if (this.mdWallet) {
                        await components_4.application.loadPackage('@scom/scom-wallet-modal', '*');
                        this.mdWallet.networks = this.networks;
                        this.mdWallet.wallets = this.wallets;
                        this.mdWallet.showModal();
                    }
                    return;
                }
                if (!this.state.isRpcWalletConnected()) {
                    const clientWallet = eth_wallet_5.Wallet.getClientInstance();
                    await clientWallet.switchNetwork(this.chainId);
                }
            };
            this.initEmptyUI = async () => {
                const isClientConnected = (0, index_3.isClientWalletConnected)();
                this.pnlEmpty.clearInnerHTML();
                this.pnlEmpty.appendChild(this.$render("i-panel", { class: "no-campaign", height: "100%", background: { color: Theme.background.main } },
                    this.$render("i-vstack", { gap: 10, verticalAlignment: "center" },
                        this.$render("i-image", { url: assets_3.default.fullPath('img/claim/TrollTrooper.svg') }),
                        this.$render("i-label", { caption: isClientConnected ? 'No Campaigns' : 'Please connect with your wallet!' }))));
                this.pnlEmpty.visible = true;
            };
            this.renderEmpty = async () => {
                await this.initEmptyUI();
                if (this.loadingElm) {
                    this.loadingElm.visible = false;
                }
            };
            this.renderCampaign = async () => {
                await this.initEmptyUI();
                this.pnlEmpty.visible = false;
                this.removeTimer();
                if (!this.campaign) {
                    this.pnlClaimInfo.visible = false;
                    this.pnlEmpty.visible = true;
                    return;
                }
                let info = Object.assign({}, this.campaign);
                const updateClaimTokenInfo = async () => {
                    var _a;
                    if (!((_a = this.campaign) === null || _a === void 0 ? void 0 : _a.lockId))
                        return;
                    const latestInfo = await (0, index_4.getLatestInvestorClaimTokenInfo)(this.rpcWallet, this.campaign.dripAddress, this.campaign.lockId);
                    info = Object.assign(Object.assign({}, latestInfo), info);
                    lbLockedAmount.caption = `${(0, index_2.formatNumber)(info.lockedAmount)} ${this.symbol}`;
                    lbClaimable.caption = `${(0, index_2.formatNumber)(info.claimable)} ${this.symbol}`;
                    const isRpcConnected = this.state.isRpcWalletConnected();
                    const isClientConnected = (0, index_3.isClientWalletConnected)();
                    btnClaim.caption = !isClientConnected ? 'Connect Wallet' : !isRpcConnected ? 'Switch Network' : 'Claim';
                    btnClaim.enabled = !isClientConnected || !isRpcConnected || (btnClaim.enabled && parseFloat(info.claimable) > 0);
                };
                const lbLockedAmount = await components_4.Label.create({
                    caption: `${(0, index_2.formatNumber)(this.campaign.lockedAmount)} ${this.symbol}`,
                    margin: { left: 'auto' }
                });
                const lbClaimable = await components_4.Label.create({
                    caption: `${(0, index_2.formatNumber)(this.campaign.claimable)} ${this.symbol}`,
                    margin: { left: 'auto' }
                });
                const btnClaim = await components_4.Button.create({
                    caption: !(0, index_3.isClientWalletConnected)() ? 'Connect Wallet' : !this.state.isRpcWalletConnected() ? 'Switch Network' : 'Claim',
                    rightIcon: { spin: true, visible: false },
                    margin: { top: 8, left: 'auto', right: 'auto' }
                });
                btnClaim.classList.add('btn-os', 'btn-claim');
                if (this.campaign.lockId) {
                    this.listTimer.push(setInterval(updateClaimTokenInfo, 10000));
                }
                let vestingStart = this.campaign.vestingStart ? components_4.moment.unix(this.campaign.vestingStart).format('YYYY-MM-DD HH:mm:ss') : '';
                let vestingEnd = this.campaign.vestingEnd ? components_4.moment.unix(this.campaign.vestingEnd).format('YYYY-MM-DD HH:mm:ss') : '';
                btnClaim.enabled = !(0, index_3.isClientWalletConnected)() || !this.state.isRpcWalletConnected() || parseFloat(this.campaign.claimable) > 0;
                btnClaim.onClick = () => this.onClaim(btnClaim, info);
                this.pnlClaimInfo.clearInnerHTML();
                this.pnlClaimInfo.appendChild(this.$render("i-vstack", { gap: 10, verticalAlignment: "center" },
                    this.$render("i-vstack", { gap: 8, horizontalAlignment: "center" },
                        this.$render("i-image", { width: 75, height: 75, url: assets_3.default.fullPath('img/tokens/openswap.png'), fallbackUrl: index_3.fallBackUrl }),
                        this.$render("i-label", { caption: this.campaign.campaignName, font: { size: '1.25rem', color: Theme.text.secondary, bold: true } }),
                        this.$render("i-label", { caption: this.campaign.campaignDesc })),
                    this.$render("i-panel", { width: "100%", height: 2, background: { color: Theme.input.background } }),
                    this.$render("i-vstack", { gap: 10, verticalAlignment: "center" },
                        this.$render("i-hstack", { gap: 4 },
                            this.$render("i-label", { caption: `${this.symbol} Locked:` }),
                            lbLockedAmount),
                        vestingStart ? this.$render("i-hstack", { gap: 4 },
                            this.$render("i-label", { caption: "Vesting Start" }),
                            this.$render("i-label", { caption: vestingStart, margin: { left: 'auto' } })) : [],
                        vestingEnd ? this.$render("i-hstack", { gap: 4 },
                            this.$render("i-label", { caption: "Vesting End" }),
                            this.$render("i-label", { caption: vestingEnd, margin: { left: 'auto' } })) : [],
                        this.$render("i-hstack", { gap: 4 },
                            this.$render("i-label", { caption: `${this.symbol} Claimable:` }),
                            lbClaimable),
                        btnClaim)));
                this.pnlClaimInfo.visible = true;
            };
            this.state = new index_3.State(data_json_1.default);
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
                }
                else {
                    this.renderEmpty();
                }
            }
            this.isReadyCallbackQueued = false;
            this.executeReadyCallback();
        }
        render() {
            return (this.$render("i-scom-dapp-container", { id: "dappContainer", class: index_css_1.claimDappContainer },
                this.$render("i-panel", { class: index_css_1.claimComponent, minHeight: 295 },
                    this.$render("i-panel", { class: "claim-layout", height: "100%", margin: { left: 'auto', right: 'auto' } },
                        this.$render("i-vstack", { id: "loadingElm", class: "i-loading-overlay" },
                            this.$render("i-vstack", { class: "i-loading-spinner", horizontalAlignment: "center", verticalAlignment: "center" },
                                this.$render("i-icon", { class: "i-loading-spinner_icon", image: { url: assets_3.default.fullPath('img/loading.svg'), width: 36, height: 36 } }),
                                this.$render("i-label", { caption: "Loading...", font: { color: '#FD4A4C', size: '1.5em' }, class: "i-loading-spinner_text" }))),
                        this.$render("i-panel", { class: "claim-wapper" },
                            this.$render("i-hstack", { id: "pnlClaimInfo", horizontalAlignment: "center", padding: { top: 10, bottom: 10, left: 16, right: 16 } }),
                            this.$render("i-panel", { id: "pnlEmpty" }))),
                    this.$render("i-scom-tx-status-modal", { id: "txStatusModal" }),
                    this.$render("i-scom-wallet-modal", { id: "mdWallet", wallets: [] }))));
        }
    };
    ScomInvertorClaim = __decorate([
        components_4.customModule,
        (0, components_4.customElements)('i-scom-investor-claim')
    ], ScomInvertorClaim);
    exports.default = ScomInvertorClaim;
});
