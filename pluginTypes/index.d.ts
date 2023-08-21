/// <reference path="@ijstech/eth-wallet/index.d.ts" />
/// <reference path="@scom/scom-dapp-container/@ijstech/eth-wallet/index.d.ts" />
/// <reference path="@ijstech/eth-contract/index.d.ts" />
/// <reference path="@scom/scom-network-picker/index.d.ts" />
/// <amd-module name="@scom/scom-investor-claim/assets.ts" />
declare module "@scom/scom-investor-claim/assets.ts" {
    function fullPath(path: string): string;
    const _default: {
        fullPath: typeof fullPath;
    };
    export default _default;
}
/// <amd-module name="@scom/scom-investor-claim/global/utils/helper.ts" />
declare module "@scom/scom-investor-claim/global/utils/helper.ts" {
    export const formatNumber: (value: any, decimals?: number) => string;
    export const formatNumberWithSeparators: (value: number, precision?: number) => string;
}
/// <amd-module name="@scom/scom-investor-claim/global/utils/common.ts" />
declare module "@scom/scom-investor-claim/global/utils/common.ts" {
    import { ISendTxEventsOptions } from "@ijstech/eth-wallet";
    export const registerSendTxEvents: (sendTxEventHandlers: ISendTxEventsOptions) => void;
}
/// <amd-module name="@scom/scom-investor-claim/global/utils/interfaces.ts" />
declare module "@scom/scom-investor-claim/global/utils/interfaces.ts" {
    import { IWalletPlugin } from "@scom/scom-wallet-modal";
    export interface INetworkConfig {
        chainName?: string;
        chainId: number;
    }
    export interface ICampaign {
        chainId: number;
        campaignName: string;
        campaignDesc?: string;
        dripAddress: string;
    }
    export interface IClaimInfoOption {
        info?: any;
        lockId?: number;
        claimable: string;
        lockedAmount: string;
        vestingStart?: number;
        vestingEnd?: number;
    }
    export interface IClaimBasicInfo {
        campaigns: ICampaign[];
        defaultChainId: number;
        wallets: IWalletPlugin[];
        networks: INetworkConfig[];
        showHeader?: boolean;
    }
    export interface ICampaignInfo extends IClaimInfoOption, ICampaign {
    }
}
/// <amd-module name="@scom/scom-investor-claim/global/utils/index.ts" />
declare module "@scom/scom-investor-claim/global/utils/index.ts" {
    export * from "@scom/scom-investor-claim/global/utils/helper.ts";
    export { registerSendTxEvents } from "@scom/scom-investor-claim/global/utils/common.ts";
    export * from "@scom/scom-investor-claim/global/utils/interfaces.ts";
}
/// <amd-module name="@scom/scom-investor-claim/global/index.ts" />
declare module "@scom/scom-investor-claim/global/index.ts" {
    export * from "@scom/scom-investor-claim/global/utils/index.ts";
}
/// <amd-module name="@scom/scom-investor-claim/store/utils.ts" />
declare module "@scom/scom-investor-claim/store/utils.ts" {
    import { INetwork } from '@ijstech/eth-wallet';
    export class State {
        networkMap: {
            [key: number]: INetwork;
        };
        infuraId: string;
        rpcWalletId: string;
        constructor(options: any);
        private initData;
        initRpcWallet(defaultChainId: number): string;
        private setNetworkList;
        getRpcWallet(): import("@ijstech/eth-wallet").IRpcWallet;
        isRpcWalletConnected(): boolean;
        getChainId(): number;
    }
    export function isClientWalletConnected(): boolean;
}
/// <amd-module name="@scom/scom-investor-claim/store/index.ts" />
declare module "@scom/scom-investor-claim/store/index.ts" {
    export const fallBackUrl: string;
    export * from "@scom/scom-investor-claim/store/utils.ts";
}
/// <amd-module name="@scom/scom-investor-claim/claim-utils/index.ts" />
declare module "@scom/scom-investor-claim/claim-utils/index.ts" {
    import { IWallet } from '@ijstech/eth-wallet';
    import { ICampaign, ICampaignInfo } from "@scom/scom-investor-claim/global/index.ts";
    const getInvestorClaimInfo: (wallet: IWallet, campaign: ICampaign) => Promise<ICampaignInfo>;
    const getLatestInvestorClaimTokenInfo: (wallet: IWallet, dripAddress: string, lockId: number) => Promise<{
        claimable: string;
        lockedAmount: string;
    }>;
    const investorClaimToken: (contractAddress: string, id: number, callback?: (err: string | Error) => void) => Promise<import("@ijstech/eth-contract").TransactionReceipt>;
    export { getInvestorClaimInfo, getLatestInvestorClaimTokenInfo, investorClaimToken, };
}
/// <amd-module name="@scom/scom-investor-claim/index.css.ts" />
declare module "@scom/scom-investor-claim/index.css.ts" {
    export const claimDappContainer: string;
    export const claimComponent: string;
}
/// <amd-module name="@scom/scom-investor-claim/data.json.ts" />
declare module "@scom/scom-investor-claim/data.json.ts" {
    const _default_1: {
        infuraId: string;
        networks: {
            chainId: number;
            explorerTxUrl: string;
            explorerAddressUrl: string;
        }[];
        defaultBuilderData: {
            defaultChainId: number;
            campaigns: {
                chainId: number;
                campaignId: number;
                campaignName: string;
                campaignDesc: string;
                dripAddress: string;
            }[];
            networks: {
                chainId: number;
            }[];
            wallets: {
                name: string;
            }[];
        };
    };
    export default _default_1;
}
/// <amd-module name="@scom/scom-investor-claim/formSchema.ts" />
declare module "@scom/scom-investor-claim/formSchema.ts" {
    import ScomNetworkPicker from '@scom/scom-network-picker';
    const _default_2: {
        general: {
            dataSchema: {
                type: string;
                properties: {
                    campaigns: {
                        type: string;
                        items: {
                            type: string;
                            properties: {
                                chainId: {
                                    type: string;
                                    enum: number[];
                                    required: boolean;
                                };
                                campaignName: {
                                    type: string;
                                    required: boolean;
                                };
                                campaignDesc: {
                                    type: string;
                                };
                                dripAddress: {
                                    type: string;
                                    required: boolean;
                                };
                            };
                        };
                    };
                };
            };
            uiSchema: {
                type: string;
                elements: {
                    type: string;
                    scope: string;
                    options: {
                        detail: {
                            type: string;
                        };
                    };
                }[];
            };
            customControls: {
                "#/properties/campaigns/properties/chainId": {
                    render: () => ScomNetworkPicker;
                    getData: (control: ScomNetworkPicker) => number;
                    setData: (control: ScomNetworkPicker, value: number) => void;
                };
            };
        };
        theme: {
            dataSchema: {
                type: string;
                properties: {
                    dark: {
                        type: string;
                        properties: {
                            backgroundColor: {
                                type: string;
                                format: string;
                            };
                            fontColor: {
                                type: string;
                                format: string;
                            };
                            textSecondary: {
                                type: string;
                                title: string;
                                format: string;
                            };
                        };
                    };
                    light: {
                        type: string;
                        properties: {
                            backgroundColor: {
                                type: string;
                                format: string;
                            };
                            fontColor: {
                                type: string;
                                format: string;
                            };
                            textSecondary: {
                                type: string;
                                title: string;
                                format: string;
                            };
                        };
                    };
                };
            };
        };
    };
    export default _default_2;
}
/// <amd-module name="@scom/scom-investor-claim" />
declare module "@scom/scom-investor-claim" {
    import { Module, Container, ControlElement } from '@ijstech/components';
    import { INetworkConfig, ICampaign } from "@scom/scom-investor-claim/global/index.ts";
    import { IWalletPlugin } from '@scom/scom-wallet-modal';
    interface ScomInvestorClaimElement extends ControlElement {
        campaigns: ICampaign[];
        defaultChainId: number;
        wallets: IWalletPlugin[];
        networks: INetworkConfig[];
        showHeader?: boolean;
        lazyLoad?: boolean;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-investor-claim']: ScomInvestorClaimElement;
            }
        }
    }
    export default class ScomInvertorClaim extends Module {
        private state;
        private _data;
        tag: any;
        defaultEdit: boolean;
        private loadingElm;
        private campaign?;
        private pnlClaimInfo;
        private pnlEmpty;
        private txStatusModal;
        private listTimer;
        private dappContainer;
        private mdWallet;
        private rpcWalletEvents;
        private symbol;
        private _getActions;
        getConfigurators(): ({
            name: string;
            target: string;
            getActions: (category?: string) => ({
                name: string;
                icon: string;
                command: (builder: any, userInputData: any) => {
                    execute: () => Promise<void>;
                    undo: () => Promise<void>;
                    redo: () => void;
                };
                userInputDataSchema: {
                    type: string;
                    properties: {
                        campaigns: {
                            type: string;
                            items: {
                                type: string;
                                properties: {
                                    chainId: {
                                        type: string;
                                        enum: number[];
                                        required: boolean;
                                    };
                                    campaignName: {
                                        type: string;
                                        required: boolean;
                                    };
                                    campaignDesc: {
                                        type: string;
                                    };
                                    dripAddress: {
                                        type: string;
                                        required: boolean;
                                    };
                                };
                            };
                        };
                    };
                };
                userInputUISchema: {
                    type: string;
                    elements: {
                        type: string;
                        scope: string;
                        options: {
                            detail: {
                                type: string;
                            };
                        };
                    }[];
                };
                customControls: {
                    "#/properties/campaigns/properties/chainId": {
                        render: () => import("@scom/scom-network-picker").default;
                        getData: (control: import("@scom/scom-network-picker").default) => number;
                        setData: (control: import("@scom/scom-network-picker").default, value: number) => void;
                    };
                };
            } | {
                name: string;
                icon: string;
                command: (builder: any, userInputData: any) => {
                    execute: () => Promise<void>;
                    undo: () => void;
                    redo: () => void;
                };
                userInputDataSchema: {
                    type: string;
                    properties: {
                        dark: {
                            type: string;
                            properties: {
                                backgroundColor: {
                                    type: string;
                                    format: string;
                                };
                                fontColor: {
                                    type: string;
                                    format: string;
                                };
                                textSecondary: {
                                    type: string;
                                    title: string;
                                    format: string;
                                };
                            };
                        };
                        light: {
                            type: string;
                            properties: {
                                backgroundColor: {
                                    type: string;
                                    format: string;
                                };
                                fontColor: {
                                    type: string;
                                    format: string;
                                };
                                textSecondary: {
                                    type: string;
                                    title: string;
                                    format: string;
                                };
                            };
                        };
                    };
                };
                userInputUISchema?: undefined;
                customControls?: undefined;
            })[];
            getData: any;
            setData: (data: any) => Promise<void>;
            getTag: any;
            setTag: any;
            getLinkParams?: undefined;
            setLinkParams?: undefined;
        } | {
            name: string;
            target: string;
            getActions: () => ({
                name: string;
                icon: string;
                command: (builder: any, userInputData: any) => {
                    execute: () => Promise<void>;
                    undo: () => Promise<void>;
                    redo: () => void;
                };
                userInputDataSchema: {
                    type: string;
                    properties: {
                        campaigns: {
                            type: string;
                            items: {
                                type: string;
                                properties: {
                                    chainId: {
                                        type: string;
                                        enum: number[];
                                        required: boolean;
                                    };
                                    campaignName: {
                                        type: string;
                                        required: boolean;
                                    };
                                    campaignDesc: {
                                        type: string;
                                    };
                                    dripAddress: {
                                        type: string;
                                        required: boolean;
                                    };
                                };
                            };
                        };
                    };
                };
                userInputUISchema: {
                    type: string;
                    elements: {
                        type: string;
                        scope: string;
                        options: {
                            detail: {
                                type: string;
                            };
                        };
                    }[];
                };
                customControls: {
                    "#/properties/campaigns/properties/chainId": {
                        render: () => import("@scom/scom-network-picker").default;
                        getData: (control: import("@scom/scom-network-picker").default) => number;
                        setData: (control: import("@scom/scom-network-picker").default, value: number) => void;
                    };
                };
            } | {
                name: string;
                icon: string;
                command: (builder: any, userInputData: any) => {
                    execute: () => Promise<void>;
                    undo: () => void;
                    redo: () => void;
                };
                userInputDataSchema: {
                    type: string;
                    properties: {
                        dark: {
                            type: string;
                            properties: {
                                backgroundColor: {
                                    type: string;
                                    format: string;
                                };
                                fontColor: {
                                    type: string;
                                    format: string;
                                };
                                textSecondary: {
                                    type: string;
                                    title: string;
                                    format: string;
                                };
                            };
                        };
                        light: {
                            type: string;
                            properties: {
                                backgroundColor: {
                                    type: string;
                                    format: string;
                                };
                                fontColor: {
                                    type: string;
                                    format: string;
                                };
                                textSecondary: {
                                    type: string;
                                    title: string;
                                    format: string;
                                };
                            };
                        };
                    };
                };
                userInputUISchema?: undefined;
                customControls?: undefined;
            })[];
            getLinkParams: () => {
                data: string;
            };
            setLinkParams: (params: any) => Promise<void>;
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
        })[];
        private getData;
        private resetRpcWallet;
        private setData;
        private getTag;
        private updateTag;
        private setTag;
        private updateStyle;
        private updateTheme;
        get defaultChainId(): number;
        set defaultChainId(value: number);
        get wallets(): IWalletPlugin[];
        set wallets(value: IWalletPlugin[]);
        get networks(): any[];
        set networks(value: any[]);
        get showHeader(): boolean;
        set showHeader(value: boolean);
        private get campaignInfo();
        private get chainId();
        private get rpcWallet();
        constructor(parent?: Container, options?: ScomInvestorClaimElement);
        removeRpcWalletEvents(): void;
        onHide(): void;
        private initializeWidgetConfig;
        private showMessage;
        private onClaim;
        private checkValidation;
        private removeTimer;
        private connectWallet;
        private initEmptyUI;
        private renderEmpty;
        private renderCampaign;
        init(): Promise<void>;
        render(): any;
    }
}
