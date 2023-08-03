/// <reference path="@ijstech/eth-wallet/index.d.ts" />
/// <reference path="@scom/scom-dapp-container/@ijstech/eth-wallet/index.d.ts" />
/// <reference path="@ijstech/eth-contract/index.d.ts" />
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
/// <amd-module name="@scom/scom-investor-claim/contracts/oswap-drip-contract/contracts/@openzeppelin/contracts/token/ERC721/ERC721.json.ts" />
declare module "@scom/scom-investor-claim/contracts/oswap-drip-contract/contracts/@openzeppelin/contracts/token/ERC721/ERC721.json.ts" {
    const _default_1: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
            name?: undefined;
            outputs?: undefined;
        } | {
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            stateMutability?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_1;
}
/// <amd-module name="@scom/scom-investor-claim/contracts/oswap-drip-contract/contracts/@openzeppelin/contracts/token/ERC721/ERC721.ts" />
declare module "@scom/scom-investor-claim/contracts/oswap-drip-contract/contracts/@openzeppelin/contracts/token/ERC721/ERC721.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
    export interface IDeployParams {
        name: string;
        symbol: string;
    }
    export interface IApproveParams {
        to: string;
        tokenId: number | BigNumber;
    }
    export interface IIsApprovedForAllParams {
        owner: string;
        operator: string;
    }
    export interface ISafeTransferFromParams {
        from: string;
        to: string;
        tokenId: number | BigNumber;
    }
    export interface ISafeTransferFrom_1Params {
        from: string;
        to: string;
        tokenId: number | BigNumber;
        data: string;
    }
    export interface ISetApprovalForAllParams {
        operator: string;
        approved: boolean;
    }
    export interface ITransferFromParams {
        from: string;
        to: string;
        tokenId: number | BigNumber;
    }
    export class ERC721 extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(params: IDeployParams, options?: TransactionOptions): Promise<string>;
        parseApprovalEvent(receipt: TransactionReceipt): ERC721.ApprovalEvent[];
        decodeApprovalEvent(event: Event): ERC721.ApprovalEvent;
        parseApprovalForAllEvent(receipt: TransactionReceipt): ERC721.ApprovalForAllEvent[];
        decodeApprovalForAllEvent(event: Event): ERC721.ApprovalForAllEvent;
        parseTransferEvent(receipt: TransactionReceipt): ERC721.TransferEvent[];
        decodeTransferEvent(event: Event): ERC721.TransferEvent;
        approve: {
            (params: IApproveParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IApproveParams, options?: TransactionOptions) => Promise<void>;
        };
        balanceOf: {
            (owner: string, options?: TransactionOptions): Promise<BigNumber>;
        };
        getApproved: {
            (tokenId: number | BigNumber, options?: TransactionOptions): Promise<string>;
        };
        isApprovedForAll: {
            (params: IIsApprovedForAllParams, options?: TransactionOptions): Promise<boolean>;
        };
        name: {
            (options?: TransactionOptions): Promise<string>;
        };
        ownerOf: {
            (tokenId: number | BigNumber, options?: TransactionOptions): Promise<string>;
        };
        safeTransferFrom: {
            (params: ISafeTransferFromParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISafeTransferFromParams, options?: TransactionOptions) => Promise<void>;
        };
        safeTransferFrom_1: {
            (params: ISafeTransferFrom_1Params, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISafeTransferFrom_1Params, options?: TransactionOptions) => Promise<void>;
        };
        setApprovalForAll: {
            (params: ISetApprovalForAllParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISetApprovalForAllParams, options?: TransactionOptions) => Promise<void>;
        };
        supportsInterface: {
            (interfaceId: string, options?: TransactionOptions): Promise<boolean>;
        };
        symbol: {
            (options?: TransactionOptions): Promise<string>;
        };
        tokenURI: {
            (tokenId: number | BigNumber, options?: TransactionOptions): Promise<string>;
        };
        transferFrom: {
            (params: ITransferFromParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ITransferFromParams, options?: TransactionOptions) => Promise<void>;
        };
        private assign;
    }
    export module ERC721 {
        interface ApprovalEvent {
            owner: string;
            approved: string;
            tokenId: BigNumber;
            _event: Event;
        }
        interface ApprovalForAllEvent {
            owner: string;
            operator: string;
            approved: boolean;
            _event: Event;
        }
        interface TransferEvent {
            from: string;
            to: string;
            tokenId: BigNumber;
            _event: Event;
        }
    }
}
/// <amd-module name="@scom/scom-investor-claim/contracts/oswap-drip-contract/contracts/Authorization.json.ts" />
declare module "@scom/scom-investor-claim/contracts/oswap-drip-contract/contracts/Authorization.json.ts" {
    const _default_2: {
        abi: ({
            inputs: any[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
            name?: undefined;
            outputs?: undefined;
        } | {
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            stateMutability?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_2;
}
/// <amd-module name="@scom/scom-investor-claim/contracts/oswap-drip-contract/contracts/Authorization.ts" />
declare module "@scom/scom-investor-claim/contracts/oswap-drip-contract/contracts/Authorization.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
    export class Authorization extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(options?: TransactionOptions): Promise<string>;
        parseAuthorizeEvent(receipt: TransactionReceipt): Authorization.AuthorizeEvent[];
        decodeAuthorizeEvent(event: Event): Authorization.AuthorizeEvent;
        parseDeauthorizeEvent(receipt: TransactionReceipt): Authorization.DeauthorizeEvent[];
        decodeDeauthorizeEvent(event: Event): Authorization.DeauthorizeEvent;
        parseStartOwnershipTransferEvent(receipt: TransactionReceipt): Authorization.StartOwnershipTransferEvent[];
        decodeStartOwnershipTransferEvent(event: Event): Authorization.StartOwnershipTransferEvent;
        parseTransferOwnershipEvent(receipt: TransactionReceipt): Authorization.TransferOwnershipEvent[];
        decodeTransferOwnershipEvent(event: Event): Authorization.TransferOwnershipEvent;
        deny: {
            (user: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (user: string, options?: TransactionOptions) => Promise<void>;
        };
        isPermitted: {
            (param1: string, options?: TransactionOptions): Promise<BigNumber>;
        };
        newOwner: {
            (options?: TransactionOptions): Promise<string>;
        };
        owner: {
            (options?: TransactionOptions): Promise<string>;
        };
        permit: {
            (user: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (user: string, options?: TransactionOptions) => Promise<void>;
        };
        takeOwnership: {
            (options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (options?: TransactionOptions) => Promise<void>;
        };
        transferOwnership: {
            (newOwner: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (newOwner: string, options?: TransactionOptions) => Promise<void>;
        };
        private assign;
    }
    export module Authorization {
        interface AuthorizeEvent {
            user: string;
            _event: Event;
        }
        interface DeauthorizeEvent {
            user: string;
            _event: Event;
        }
        interface StartOwnershipTransferEvent {
            user: string;
            _event: Event;
        }
        interface TransferOwnershipEvent {
            user: string;
            _event: Event;
        }
    }
}
/// <amd-module name="@scom/scom-investor-claim/contracts/oswap-drip-contract/contracts/Drip.json.ts" />
declare module "@scom/scom-investor-claim/contracts/oswap-drip-contract/contracts/Drip.json.ts" {
    const _default_3: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
            name?: undefined;
            outputs?: undefined;
        } | {
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            stateMutability?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_3;
}
/// <amd-module name="@scom/scom-investor-claim/contracts/oswap-drip-contract/contracts/Drip.ts" />
declare module "@scom/scom-investor-claim/contracts/oswap-drip-contract/contracts/Drip.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
    export interface IDeployParams {
        name: string;
        symbol: string;
    }
    export interface IApproveParams {
        to: string;
        tokenId: number | BigNumber;
    }
    export interface IIsApprovedForAllParams {
        owner: string;
        operator: string;
    }
    export interface ILockParams {
        recipient: string;
        token: string;
        amount: number | BigNumber;
        startDate: number | BigNumber;
        endDate: number | BigNumber;
        campaignId: number | BigNumber;
        ownerFrozen: boolean;
    }
    export interface ILockMultipleParams {
        recipient: string[];
        token: string;
        amount: (number | BigNumber)[];
        startDate: number | BigNumber;
        endDate: number | BigNumber;
        campaignId: number | BigNumber;
        ownerFrozen: boolean;
    }
    export interface ISafeTransferFromParams {
        from: string;
        to: string;
        tokenId: number | BigNumber;
    }
    export interface ISafeTransferFrom_1Params {
        from: string;
        to: string;
        tokenId: number | BigNumber;
        data: string;
    }
    export interface ISetApprovalForAllParams {
        operator: string;
        approved: boolean;
    }
    export interface ITokenOfOwnerByIndexParams {
        owner: string;
        index: number | BigNumber;
    }
    export interface ITransferFromParams {
        from: string;
        to: string;
        tokenId: number | BigNumber;
    }
    export class Drip extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(params: IDeployParams, options?: TransactionOptions): Promise<string>;
        parseApprovalEvent(receipt: TransactionReceipt): Drip.ApprovalEvent[];
        decodeApprovalEvent(event: Event): Drip.ApprovalEvent;
        parseApprovalForAllEvent(receipt: TransactionReceipt): Drip.ApprovalForAllEvent[];
        decodeApprovalForAllEvent(event: Event): Drip.ApprovalForAllEvent;
        parseAuthorizeEvent(receipt: TransactionReceipt): Drip.AuthorizeEvent[];
        decodeAuthorizeEvent(event: Event): Drip.AuthorizeEvent;
        parseDeauthorizeEvent(receipt: TransactionReceipt): Drip.DeauthorizeEvent[];
        decodeDeauthorizeEvent(event: Event): Drip.DeauthorizeEvent;
        parseDripEvent(receipt: TransactionReceipt): Drip.DripEvent[];
        decodeDripEvent(event: Event): Drip.DripEvent;
        parseLockEvent(receipt: TransactionReceipt): Drip.LockEvent[];
        decodeLockEvent(event: Event): Drip.LockEvent;
        parseStartOwnershipTransferEvent(receipt: TransactionReceipt): Drip.StartOwnershipTransferEvent[];
        decodeStartOwnershipTransferEvent(event: Event): Drip.StartOwnershipTransferEvent;
        parseTransferEvent(receipt: TransactionReceipt): Drip.TransferEvent[];
        decodeTransferEvent(event: Event): Drip.TransferEvent;
        parseTransferOwnershipEvent(receipt: TransactionReceipt): Drip.TransferOwnershipEvent[];
        decodeTransferOwnershipEvent(event: Event): Drip.TransferOwnershipEvent;
        approve: {
            (params: IApproveParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IApproveParams, options?: TransactionOptions) => Promise<void>;
        };
        balanceOf: {
            (owner: string, options?: TransactionOptions): Promise<BigNumber>;
        };
        campaignId: {
            (param1: number | BigNumber, options?: TransactionOptions): Promise<BigNumber>;
        };
        claim: {
            (id: number | BigNumber, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (id: number | BigNumber, options?: TransactionOptions) => Promise<void>;
        };
        claimMultiple: {
            (ids: (number | BigNumber)[], options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (ids: (number | BigNumber)[], options?: TransactionOptions) => Promise<void>;
        };
        claimedAmount: {
            (param1: number | BigNumber, options?: TransactionOptions): Promise<BigNumber>;
        };
        deny: {
            (user: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (user: string, options?: TransactionOptions) => Promise<void>;
        };
        endDate: {
            (param1: number | BigNumber, options?: TransactionOptions): Promise<BigNumber>;
        };
        getAllInfo: {
            (owner: string, options?: TransactionOptions): Promise<{
                _tokenId: BigNumber[];
                _token: string[];
                _unclaimedFunds: BigNumber[];
                _claimedAmount: BigNumber[];
                _totalAmount: BigNumber[];
                _startDate: BigNumber[];
                _endDate: BigNumber[];
                _campaignId: BigNumber[];
                _ownerFrozen: boolean[];
            }>;
        };
        getApproved: {
            (tokenId: number | BigNumber, options?: TransactionOptions): Promise<string>;
        };
        getInfo: {
            (id: number | BigNumber, options?: TransactionOptions): Promise<{
                _recipient: string;
                _token: string;
                _unclaimedFunds: BigNumber;
                _claimedAmount: BigNumber;
                _totalAmount: BigNumber;
                _startDate: BigNumber;
                _endDate: BigNumber;
                _campaignId: BigNumber;
                _ownerFrozen: boolean;
            }>;
        };
        isApprovedForAll: {
            (params: IIsApprovedForAllParams, options?: TransactionOptions): Promise<boolean>;
        };
        isPermitted: {
            (param1: string, options?: TransactionOptions): Promise<BigNumber>;
        };
        lock: {
            (params: ILockParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ILockParams, options?: TransactionOptions) => Promise<BigNumber>;
        };
        lockMultiple: {
            (params: ILockMultipleParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ILockMultipleParams, options?: TransactionOptions) => Promise<BigNumber[]>;
        };
        maximumAllowedClaimedFunds: {
            (id: number | BigNumber, options?: TransactionOptions): Promise<BigNumber>;
        };
        name: {
            (options?: TransactionOptions): Promise<string>;
        };
        newOwner: {
            (options?: TransactionOptions): Promise<string>;
        };
        owner: {
            (options?: TransactionOptions): Promise<string>;
        };
        ownerFrozen: {
            (param1: number | BigNumber, options?: TransactionOptions): Promise<boolean>;
        };
        ownerOf: {
            (tokenId: number | BigNumber, options?: TransactionOptions): Promise<string>;
        };
        permit: {
            (user: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (user: string, options?: TransactionOptions) => Promise<void>;
        };
        safeTransferFrom: {
            (params: ISafeTransferFromParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISafeTransferFromParams, options?: TransactionOptions) => Promise<void>;
        };
        safeTransferFrom_1: {
            (params: ISafeTransferFrom_1Params, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISafeTransferFrom_1Params, options?: TransactionOptions) => Promise<void>;
        };
        setApprovalForAll: {
            (params: ISetApprovalForAllParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISetApprovalForAllParams, options?: TransactionOptions) => Promise<void>;
        };
        startDate: {
            (param1: number | BigNumber, options?: TransactionOptions): Promise<BigNumber>;
        };
        supportsInterface: {
            (interfaceId: string, options?: TransactionOptions): Promise<boolean>;
        };
        symbol: {
            (options?: TransactionOptions): Promise<string>;
        };
        takeOwnership: {
            (options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (options?: TransactionOptions) => Promise<void>;
        };
        timelockCount: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        token: {
            (param1: number | BigNumber, options?: TransactionOptions): Promise<string>;
        };
        tokenByIndex: {
            (index: number | BigNumber, options?: TransactionOptions): Promise<BigNumber>;
        };
        tokenOfOwnerByIndex: {
            (params: ITokenOfOwnerByIndexParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        tokenURI: {
            (tokenId: number | BigNumber, options?: TransactionOptions): Promise<string>;
        };
        totalAmount: {
            (param1: number | BigNumber, options?: TransactionOptions): Promise<BigNumber>;
        };
        totalSupply: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        transferFrom: {
            (params: ITransferFromParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ITransferFromParams, options?: TransactionOptions) => Promise<void>;
        };
        transferOwnership: {
            (newOwner: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (newOwner: string, options?: TransactionOptions) => Promise<void>;
        };
        private assign;
    }
    export module Drip {
        interface ApprovalEvent {
            owner: string;
            approved: string;
            tokenId: BigNumber;
            _event: Event;
        }
        interface ApprovalForAllEvent {
            owner: string;
            operator: string;
            approved: boolean;
            _event: Event;
        }
        interface AuthorizeEvent {
            user: string;
            _event: Event;
        }
        interface DeauthorizeEvent {
            user: string;
            _event: Event;
        }
        interface DripEvent {
            id: BigNumber;
            amount: BigNumber;
            totalClaimed: BigNumber;
            totalAmount: BigNumber;
            _event: Event;
        }
        interface LockEvent {
            id: BigNumber;
            recipient: string;
            token: string;
            amount: BigNumber;
            startDate: BigNumber;
            endDate: BigNumber;
            campaignId: BigNumber;
            ownerFrozen: boolean;
            _event: Event;
        }
        interface StartOwnershipTransferEvent {
            user: string;
            _event: Event;
        }
        interface TransferEvent {
            from: string;
            to: string;
            tokenId: BigNumber;
            _event: Event;
        }
        interface TransferOwnershipEvent {
            user: string;
            _event: Event;
        }
    }
}
/// <amd-module name="@scom/scom-investor-claim/contracts/oswap-drip-contract/contracts/index.ts" />
declare module "@scom/scom-investor-claim/contracts/oswap-drip-contract/contracts/index.ts" {
    export { ERC721 } from "@scom/scom-investor-claim/contracts/oswap-drip-contract/contracts/@openzeppelin/contracts/token/ERC721/ERC721.ts";
    export { Authorization } from "@scom/scom-investor-claim/contracts/oswap-drip-contract/contracts/Authorization.ts";
    export { Drip } from "@scom/scom-investor-claim/contracts/oswap-drip-contract/contracts/Drip.ts";
}
/// <amd-module name="@scom/scom-investor-claim/contracts/oswap-drip-contract/index.ts" />
declare module "@scom/scom-investor-claim/contracts/oswap-drip-contract/index.ts" {
    export * as Contracts from "@scom/scom-investor-claim/contracts/oswap-drip-contract/contracts/index.ts";
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
    const _default_4: {
        infuraId: string;
        networks: {
            chainId: number;
            explorerTxUrl: string;
            explorerAddressUrl: string;
        }[];
        defaultBuilderData: {
            defaultChainId: number;
            campaigns: ({
                chainId: number;
                campaignName: string;
                campaignDesc: string;
                dripAddress: string;
                campaignId?: undefined;
                vestingPeriod?: undefined;
            } | {
                campaignId: number;
                campaignName: string;
                campaignDesc: string;
                vestingPeriod: string;
                dripAddress: string;
                chainId?: undefined;
            })[];
            networks: {
                chainId: number;
            }[];
            wallets: {
                name: string;
            }[];
        };
    };
    export default _default_4;
}
/// <amd-module name="@scom/scom-investor-claim/formSchema.json.ts" />
declare module "@scom/scom-investor-claim/formSchema.json.ts" {
    const _default_5: {
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
    export default _default_5;
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
