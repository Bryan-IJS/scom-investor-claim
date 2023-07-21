import {IWallet, Contract as _Contract, Transaction, TransactionReceipt, BigNumber, Event, IBatchRequestObj, TransactionOptions} from "@ijstech/eth-contract";
import Bin from "./Drip.json";
export interface IDeployParams {name:string;symbol:string}
export interface IApproveParams {to:string;tokenId:number|BigNumber}
export interface IIsApprovedForAllParams {owner:string;operator:string}
export interface ILockParams {recipient:string;token:string;amount:number|BigNumber;startDate:number|BigNumber;endDate:number|BigNumber;campaignId:number|BigNumber;ownerFrozen:boolean}
export interface ILockMultipleParams {recipient:string[];token:string;amount:(number|BigNumber)[];startDate:number|BigNumber;endDate:number|BigNumber;campaignId:number|BigNumber;ownerFrozen:boolean}
export interface ISafeTransferFromParams {from:string;to:string;tokenId:number|BigNumber}
export interface ISafeTransferFrom_1Params {from:string;to:string;tokenId:number|BigNumber;data:string}
export interface ISetApprovalForAllParams {operator:string;approved:boolean}
export interface ITokenOfOwnerByIndexParams {owner:string;index:number|BigNumber}
export interface ITransferFromParams {from:string;to:string;tokenId:number|BigNumber}
export class Drip extends _Contract{
    static _abi: any = Bin.abi;
    constructor(wallet: IWallet, address?: string){
        super(wallet, address, Bin.abi, Bin.bytecode);
        this.assign()
    }
    deploy(params: IDeployParams, options?: TransactionOptions): Promise<string>{
        return this.__deploy([params.name,params.symbol], options);
    }
    parseApprovalEvent(receipt: TransactionReceipt): Drip.ApprovalEvent[]{
        return this.parseEvents(receipt, "Approval").map(e=>this.decodeApprovalEvent(e));
    }
    decodeApprovalEvent(event: Event): Drip.ApprovalEvent{
        let result = event.data;
        return {
            owner: result.owner,
            approved: result.approved,
            tokenId: new BigNumber(result.tokenId),
            _event: event
        };
    }
    parseApprovalForAllEvent(receipt: TransactionReceipt): Drip.ApprovalForAllEvent[]{
        return this.parseEvents(receipt, "ApprovalForAll").map(e=>this.decodeApprovalForAllEvent(e));
    }
    decodeApprovalForAllEvent(event: Event): Drip.ApprovalForAllEvent{
        let result = event.data;
        return {
            owner: result.owner,
            operator: result.operator,
            approved: result.approved,
            _event: event
        };
    }
    parseAuthorizeEvent(receipt: TransactionReceipt): Drip.AuthorizeEvent[]{
        return this.parseEvents(receipt, "Authorize").map(e=>this.decodeAuthorizeEvent(e));
    }
    decodeAuthorizeEvent(event: Event): Drip.AuthorizeEvent{
        let result = event.data;
        return {
            user: result.user,
            _event: event
        };
    }
    parseDeauthorizeEvent(receipt: TransactionReceipt): Drip.DeauthorizeEvent[]{
        return this.parseEvents(receipt, "Deauthorize").map(e=>this.decodeDeauthorizeEvent(e));
    }
    decodeDeauthorizeEvent(event: Event): Drip.DeauthorizeEvent{
        let result = event.data;
        return {
            user: result.user,
            _event: event
        };
    }
    parseDripEvent(receipt: TransactionReceipt): Drip.DripEvent[]{
        return this.parseEvents(receipt, "Drip").map(e=>this.decodeDripEvent(e));
    }
    decodeDripEvent(event: Event): Drip.DripEvent{
        let result = event.data;
        return {
            id: new BigNumber(result.id),
            amount: new BigNumber(result.amount),
            totalClaimed: new BigNumber(result.totalClaimed),
            totalAmount: new BigNumber(result.totalAmount),
            _event: event
        };
    }
    parseLockEvent(receipt: TransactionReceipt): Drip.LockEvent[]{
        return this.parseEvents(receipt, "Lock").map(e=>this.decodeLockEvent(e));
    }
    decodeLockEvent(event: Event): Drip.LockEvent{
        let result = event.data;
        return {
            id: new BigNumber(result.id),
            recipient: result.recipient,
            token: result.token,
            amount: new BigNumber(result.amount),
            startDate: new BigNumber(result.startDate),
            endDate: new BigNumber(result.endDate),
            campaignId: new BigNumber(result.campaignId),
            ownerFrozen: result.ownerFrozen,
            _event: event
        };
    }
    parseStartOwnershipTransferEvent(receipt: TransactionReceipt): Drip.StartOwnershipTransferEvent[]{
        return this.parseEvents(receipt, "StartOwnershipTransfer").map(e=>this.decodeStartOwnershipTransferEvent(e));
    }
    decodeStartOwnershipTransferEvent(event: Event): Drip.StartOwnershipTransferEvent{
        let result = event.data;
        return {
            user: result.user,
            _event: event
        };
    }
    parseTransferEvent(receipt: TransactionReceipt): Drip.TransferEvent[]{
        return this.parseEvents(receipt, "Transfer").map(e=>this.decodeTransferEvent(e));
    }
    decodeTransferEvent(event: Event): Drip.TransferEvent{
        let result = event.data;
        return {
            from: result.from,
            to: result.to,
            tokenId: new BigNumber(result.tokenId),
            _event: event
        };
    }
    parseTransferOwnershipEvent(receipt: TransactionReceipt): Drip.TransferOwnershipEvent[]{
        return this.parseEvents(receipt, "TransferOwnership").map(e=>this.decodeTransferOwnershipEvent(e));
    }
    decodeTransferOwnershipEvent(event: Event): Drip.TransferOwnershipEvent{
        let result = event.data;
        return {
            user: result.user,
            _event: event
        };
    }
    approve: {
        (params: IApproveParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: IApproveParams, options?: TransactionOptions) => Promise<void>;
    }
    balanceOf: {
        (owner:string, options?: TransactionOptions): Promise<BigNumber>;
    }
    campaignId: {
        (param1:number|BigNumber, options?: TransactionOptions): Promise<BigNumber>;
    }
    claim: {
        (id:number|BigNumber, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (id:number|BigNumber, options?: TransactionOptions) => Promise<void>;
    }
    claimMultiple: {
        (ids:(number|BigNumber)[], options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (ids:(number|BigNumber)[], options?: TransactionOptions) => Promise<void>;
    }
    claimedAmount: {
        (param1:number|BigNumber, options?: TransactionOptions): Promise<BigNumber>;
    }
    deny: {
        (user:string, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (user:string, options?: TransactionOptions) => Promise<void>;
    }
    endDate: {
        (param1:number|BigNumber, options?: TransactionOptions): Promise<BigNumber>;
    }
    getAllInfo: {
        (owner:string, options?: TransactionOptions): Promise<{_tokenId:BigNumber[],_token:string[],_unclaimedFunds:BigNumber[],_claimedAmount:BigNumber[],_totalAmount:BigNumber[],_startDate:BigNumber[],_endDate:BigNumber[],_campaignId:BigNumber[],_ownerFrozen:boolean[]}>;
    }
    getApproved: {
        (tokenId:number|BigNumber, options?: TransactionOptions): Promise<string>;
    }
    getInfo: {
        (id:number|BigNumber, options?: TransactionOptions): Promise<{_recipient:string,_token:string,_unclaimedFunds:BigNumber,_claimedAmount:BigNumber,_totalAmount:BigNumber,_startDate:BigNumber,_endDate:BigNumber,_campaignId:BigNumber,_ownerFrozen:boolean}>;
    }
    isApprovedForAll: {
        (params: IIsApprovedForAllParams, options?: TransactionOptions): Promise<boolean>;
    }
    isPermitted: {
        (param1:string, options?: TransactionOptions): Promise<BigNumber>;
    }
    lock: {
        (params: ILockParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: ILockParams, options?: TransactionOptions) => Promise<BigNumber>;
    }
    lockMultiple: {
        (params: ILockMultipleParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: ILockMultipleParams, options?: TransactionOptions) => Promise<BigNumber[]>;
    }
    maximumAllowedClaimedFunds: {
        (id:number|BigNumber, options?: TransactionOptions): Promise<BigNumber>;
    }
    name: {
        (options?: TransactionOptions): Promise<string>;
    }
    newOwner: {
        (options?: TransactionOptions): Promise<string>;
    }
    owner: {
        (options?: TransactionOptions): Promise<string>;
    }
    ownerFrozen: {
        (param1:number|BigNumber, options?: TransactionOptions): Promise<boolean>;
    }
    ownerOf: {
        (tokenId:number|BigNumber, options?: TransactionOptions): Promise<string>;
    }
    permit: {
        (user:string, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (user:string, options?: TransactionOptions) => Promise<void>;
    }
    safeTransferFrom: {
        (params: ISafeTransferFromParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: ISafeTransferFromParams, options?: TransactionOptions) => Promise<void>;
    }
    safeTransferFrom_1: {
        (params: ISafeTransferFrom_1Params, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: ISafeTransferFrom_1Params, options?: TransactionOptions) => Promise<void>;
    }
    setApprovalForAll: {
        (params: ISetApprovalForAllParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: ISetApprovalForAllParams, options?: TransactionOptions) => Promise<void>;
    }
    startDate: {
        (param1:number|BigNumber, options?: TransactionOptions): Promise<BigNumber>;
    }
    supportsInterface: {
        (interfaceId:string, options?: TransactionOptions): Promise<boolean>;
    }
    symbol: {
        (options?: TransactionOptions): Promise<string>;
    }
    takeOwnership: {
        (options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (options?: TransactionOptions) => Promise<void>;
    }
    timelockCount: {
        (options?: TransactionOptions): Promise<BigNumber>;
    }
    token: {
        (param1:number|BigNumber, options?: TransactionOptions): Promise<string>;
    }
    tokenByIndex: {
        (index:number|BigNumber, options?: TransactionOptions): Promise<BigNumber>;
    }
    tokenOfOwnerByIndex: {
        (params: ITokenOfOwnerByIndexParams, options?: TransactionOptions): Promise<BigNumber>;
    }
    tokenURI: {
        (tokenId:number|BigNumber, options?: TransactionOptions): Promise<string>;
    }
    totalAmount: {
        (param1:number|BigNumber, options?: TransactionOptions): Promise<BigNumber>;
    }
    totalSupply: {
        (options?: TransactionOptions): Promise<BigNumber>;
    }
    transferFrom: {
        (params: ITransferFromParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: ITransferFromParams, options?: TransactionOptions) => Promise<void>;
    }
    transferOwnership: {
        (newOwner:string, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (newOwner:string, options?: TransactionOptions) => Promise<void>;
    }
    private assign(){
        let balanceOf_call = async (owner:string, options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('balanceOf',[owner],options);
            return new BigNumber(result);
        }
        this.balanceOf = balanceOf_call
        let campaignId_call = async (param1:number|BigNumber, options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('campaignId',[this.wallet.utils.toString(param1)],options);
            return new BigNumber(result);
        }
        this.campaignId = campaignId_call
        let claimedAmount_call = async (param1:number|BigNumber, options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('claimedAmount',[this.wallet.utils.toString(param1)],options);
            return new BigNumber(result);
        }
        this.claimedAmount = claimedAmount_call
        let endDate_call = async (param1:number|BigNumber, options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('endDate',[this.wallet.utils.toString(param1)],options);
            return new BigNumber(result);
        }
        this.endDate = endDate_call
        let getAllInfo_call = async (owner:string, options?: TransactionOptions): Promise<{_tokenId:BigNumber[],_token:string[],_unclaimedFunds:BigNumber[],_claimedAmount:BigNumber[],_totalAmount:BigNumber[],_startDate:BigNumber[],_endDate:BigNumber[],_campaignId:BigNumber[],_ownerFrozen:boolean[]}> => {
            let result = await this.call('getAllInfo',[owner],options);
            return {
                _tokenId: result._tokenId.map(e=>new BigNumber(e)),
                _token: result._token,
                _unclaimedFunds: result._unclaimedFunds.map(e=>new BigNumber(e)),
                _claimedAmount: result._claimedAmount.map(e=>new BigNumber(e)),
                _totalAmount: result._totalAmount.map(e=>new BigNumber(e)),
                _startDate: result._startDate.map(e=>new BigNumber(e)),
                _endDate: result._endDate.map(e=>new BigNumber(e)),
                _campaignId: result._campaignId.map(e=>new BigNumber(e)),
                _ownerFrozen: result._ownerFrozen
            };
        }
        this.getAllInfo = getAllInfo_call
        let getApproved_call = async (tokenId:number|BigNumber, options?: TransactionOptions): Promise<string> => {
            let result = await this.call('getApproved',[this.wallet.utils.toString(tokenId)],options);
            return result;
        }
        this.getApproved = getApproved_call
        let getInfo_call = async (id:number|BigNumber, options?: TransactionOptions): Promise<{_recipient:string,_token:string,_unclaimedFunds:BigNumber,_claimedAmount:BigNumber,_totalAmount:BigNumber,_startDate:BigNumber,_endDate:BigNumber,_campaignId:BigNumber,_ownerFrozen:boolean}> => {
            let result = await this.call('getInfo',[this.wallet.utils.toString(id)],options);
            return {
                _recipient: result._recipient,
                _token: result._token,
                _unclaimedFunds: new BigNumber(result._unclaimedFunds),
                _claimedAmount: new BigNumber(result._claimedAmount),
                _totalAmount: new BigNumber(result._totalAmount),
                _startDate: new BigNumber(result._startDate),
                _endDate: new BigNumber(result._endDate),
                _campaignId: new BigNumber(result._campaignId),
                _ownerFrozen: result._ownerFrozen
            };
        }
        this.getInfo = getInfo_call
        let isApprovedForAllParams = (params: IIsApprovedForAllParams) => [params.owner,params.operator];
        let isApprovedForAll_call = async (params: IIsApprovedForAllParams, options?: TransactionOptions): Promise<boolean> => {
            let result = await this.call('isApprovedForAll',isApprovedForAllParams(params),options);
            return result;
        }
        this.isApprovedForAll = isApprovedForAll_call
        let isPermitted_call = async (param1:string, options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('isPermitted',[param1],options);
            return new BigNumber(result);
        }
        this.isPermitted = isPermitted_call
        let maximumAllowedClaimedFunds_call = async (id:number|BigNumber, options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('maximumAllowedClaimedFunds',[this.wallet.utils.toString(id)],options);
            return new BigNumber(result);
        }
        this.maximumAllowedClaimedFunds = maximumAllowedClaimedFunds_call
        let name_call = async (options?: TransactionOptions): Promise<string> => {
            let result = await this.call('name',[],options);
            return result;
        }
        this.name = name_call
        let newOwner_call = async (options?: TransactionOptions): Promise<string> => {
            let result = await this.call('newOwner',[],options);
            return result;
        }
        this.newOwner = newOwner_call
        let owner_call = async (options?: TransactionOptions): Promise<string> => {
            let result = await this.call('owner',[],options);
            return result;
        }
        this.owner = owner_call
        let ownerFrozen_call = async (param1:number|BigNumber, options?: TransactionOptions): Promise<boolean> => {
            let result = await this.call('ownerFrozen',[this.wallet.utils.toString(param1)],options);
            return result;
        }
        this.ownerFrozen = ownerFrozen_call
        let ownerOf_call = async (tokenId:number|BigNumber, options?: TransactionOptions): Promise<string> => {
            let result = await this.call('ownerOf',[this.wallet.utils.toString(tokenId)],options);
            return result;
        }
        this.ownerOf = ownerOf_call
        let startDate_call = async (param1:number|BigNumber, options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('startDate',[this.wallet.utils.toString(param1)],options);
            return new BigNumber(result);
        }
        this.startDate = startDate_call
        let supportsInterface_call = async (interfaceId:string, options?: TransactionOptions): Promise<boolean> => {
            let result = await this.call('supportsInterface',[interfaceId],options);
            return result;
        }
        this.supportsInterface = supportsInterface_call
        let symbol_call = async (options?: TransactionOptions): Promise<string> => {
            let result = await this.call('symbol',[],options);
            return result;
        }
        this.symbol = symbol_call
        let timelockCount_call = async (options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('timelockCount',[],options);
            return new BigNumber(result);
        }
        this.timelockCount = timelockCount_call
        let token_call = async (param1:number|BigNumber, options?: TransactionOptions): Promise<string> => {
            let result = await this.call('token',[this.wallet.utils.toString(param1)],options);
            return result;
        }
        this.token = token_call
        let tokenByIndex_call = async (index:number|BigNumber, options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('tokenByIndex',[this.wallet.utils.toString(index)],options);
            return new BigNumber(result);
        }
        this.tokenByIndex = tokenByIndex_call
        let tokenOfOwnerByIndexParams = (params: ITokenOfOwnerByIndexParams) => [params.owner,this.wallet.utils.toString(params.index)];
        let tokenOfOwnerByIndex_call = async (params: ITokenOfOwnerByIndexParams, options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('tokenOfOwnerByIndex',tokenOfOwnerByIndexParams(params),options);
            return new BigNumber(result);
        }
        this.tokenOfOwnerByIndex = tokenOfOwnerByIndex_call
        let tokenURI_call = async (tokenId:number|BigNumber, options?: TransactionOptions): Promise<string> => {
            let result = await this.call('tokenURI',[this.wallet.utils.toString(tokenId)],options);
            return result;
        }
        this.tokenURI = tokenURI_call
        let totalAmount_call = async (param1:number|BigNumber, options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('totalAmount',[this.wallet.utils.toString(param1)],options);
            return new BigNumber(result);
        }
        this.totalAmount = totalAmount_call
        let totalSupply_call = async (options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('totalSupply',[],options);
            return new BigNumber(result);
        }
        this.totalSupply = totalSupply_call
        let approveParams = (params: IApproveParams) => [params.to,this.wallet.utils.toString(params.tokenId)];
        let approve_send = async (params: IApproveParams, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('approve',approveParams(params),options);
            return result;
        }
        let approve_call = async (params: IApproveParams, options?: TransactionOptions): Promise<void> => {
            let result = await this.call('approve',approveParams(params),options);
            return;
        }
        this.approve = Object.assign(approve_send, {
            call:approve_call
        });
        let claim_send = async (id:number|BigNumber, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('claim',[this.wallet.utils.toString(id)],options);
            return result;
        }
        let claim_call = async (id:number|BigNumber, options?: TransactionOptions): Promise<void> => {
            let result = await this.call('claim',[this.wallet.utils.toString(id)],options);
            return;
        }
        this.claim = Object.assign(claim_send, {
            call:claim_call
        });
        let claimMultiple_send = async (ids:(number|BigNumber)[], options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('claimMultiple',[this.wallet.utils.toString(ids)],options);
            return result;
        }
        let claimMultiple_call = async (ids:(number|BigNumber)[], options?: TransactionOptions): Promise<void> => {
            let result = await this.call('claimMultiple',[this.wallet.utils.toString(ids)],options);
            return;
        }
        this.claimMultiple = Object.assign(claimMultiple_send, {
            call:claimMultiple_call
        });
        let deny_send = async (user:string, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('deny',[user],options);
            return result;
        }
        let deny_call = async (user:string, options?: TransactionOptions): Promise<void> => {
            let result = await this.call('deny',[user],options);
            return;
        }
        this.deny = Object.assign(deny_send, {
            call:deny_call
        });
        let lockParams = (params: ILockParams) => [params.recipient,params.token,this.wallet.utils.toString(params.amount),this.wallet.utils.toString(params.startDate),this.wallet.utils.toString(params.endDate),this.wallet.utils.toString(params.campaignId),params.ownerFrozen];
        let lock_send = async (params: ILockParams, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('lock',lockParams(params),options);
            return result;
        }
        let lock_call = async (params: ILockParams, options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('lock',lockParams(params),options);
            return new BigNumber(result);
        }
        this.lock = Object.assign(lock_send, {
            call:lock_call
        });
        let lockMultipleParams = (params: ILockMultipleParams) => [params.recipient,params.token,this.wallet.utils.toString(params.amount),this.wallet.utils.toString(params.startDate),this.wallet.utils.toString(params.endDate),this.wallet.utils.toString(params.campaignId),params.ownerFrozen];
        let lockMultiple_send = async (params: ILockMultipleParams, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('lockMultiple',lockMultipleParams(params),options);
            return result;
        }
        let lockMultiple_call = async (params: ILockMultipleParams, options?: TransactionOptions): Promise<BigNumber[]> => {
            let result = await this.call('lockMultiple',lockMultipleParams(params),options);
            return result.map(e=>new BigNumber(e));
        }
        this.lockMultiple = Object.assign(lockMultiple_send, {
            call:lockMultiple_call
        });
        let permit_send = async (user:string, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('permit',[user],options);
            return result;
        }
        let permit_call = async (user:string, options?: TransactionOptions): Promise<void> => {
            let result = await this.call('permit',[user],options);
            return;
        }
        this.permit = Object.assign(permit_send, {
            call:permit_call
        });
        let safeTransferFromParams = (params: ISafeTransferFromParams) => [params.from,params.to,this.wallet.utils.toString(params.tokenId)];
        let safeTransferFrom_send = async (params: ISafeTransferFromParams, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('safeTransferFrom',safeTransferFromParams(params),options);
            return result;
        }
        let safeTransferFrom_call = async (params: ISafeTransferFromParams, options?: TransactionOptions): Promise<void> => {
            let result = await this.call('safeTransferFrom',safeTransferFromParams(params),options);
            return;
        }
        this.safeTransferFrom = Object.assign(safeTransferFrom_send, {
            call:safeTransferFrom_call
        });
        let safeTransferFrom_1Params = (params: ISafeTransferFrom_1Params) => [params.from,params.to,this.wallet.utils.toString(params.tokenId),this.wallet.utils.stringToBytes(params.data)];
        let safeTransferFrom_1_send = async (params: ISafeTransferFrom_1Params, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('safeTransferFrom',safeTransferFrom_1Params(params),options);
            return result;
        }
        let safeTransferFrom_1_call = async (params: ISafeTransferFrom_1Params, options?: TransactionOptions): Promise<void> => {
            let result = await this.call('safeTransferFrom',safeTransferFrom_1Params(params),options);
            return;
        }
        this.safeTransferFrom_1 = Object.assign(safeTransferFrom_1_send, {
            call:safeTransferFrom_1_call
        });
        let setApprovalForAllParams = (params: ISetApprovalForAllParams) => [params.operator,params.approved];
        let setApprovalForAll_send = async (params: ISetApprovalForAllParams, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('setApprovalForAll',setApprovalForAllParams(params),options);
            return result;
        }
        let setApprovalForAll_call = async (params: ISetApprovalForAllParams, options?: TransactionOptions): Promise<void> => {
            let result = await this.call('setApprovalForAll',setApprovalForAllParams(params),options);
            return;
        }
        this.setApprovalForAll = Object.assign(setApprovalForAll_send, {
            call:setApprovalForAll_call
        });
        let takeOwnership_send = async (options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('takeOwnership',[],options);
            return result;
        }
        let takeOwnership_call = async (options?: TransactionOptions): Promise<void> => {
            let result = await this.call('takeOwnership',[],options);
            return;
        }
        this.takeOwnership = Object.assign(takeOwnership_send, {
            call:takeOwnership_call
        });
        let transferFromParams = (params: ITransferFromParams) => [params.from,params.to,this.wallet.utils.toString(params.tokenId)];
        let transferFrom_send = async (params: ITransferFromParams, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('transferFrom',transferFromParams(params),options);
            return result;
        }
        let transferFrom_call = async (params: ITransferFromParams, options?: TransactionOptions): Promise<void> => {
            let result = await this.call('transferFrom',transferFromParams(params),options);
            return;
        }
        this.transferFrom = Object.assign(transferFrom_send, {
            call:transferFrom_call
        });
        let transferOwnership_send = async (newOwner:string, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('transferOwnership',[newOwner],options);
            return result;
        }
        let transferOwnership_call = async (newOwner:string, options?: TransactionOptions): Promise<void> => {
            let result = await this.call('transferOwnership',[newOwner],options);
            return;
        }
        this.transferOwnership = Object.assign(transferOwnership_send, {
            call:transferOwnership_call
        });
    }
}
export module Drip{
    export interface ApprovalEvent {owner:string,approved:string,tokenId:BigNumber,_event:Event}
    export interface ApprovalForAllEvent {owner:string,operator:string,approved:boolean,_event:Event}
    export interface AuthorizeEvent {user:string,_event:Event}
    export interface DeauthorizeEvent {user:string,_event:Event}
    export interface DripEvent {id:BigNumber,amount:BigNumber,totalClaimed:BigNumber,totalAmount:BigNumber,_event:Event}
    export interface LockEvent {id:BigNumber,recipient:string,token:string,amount:BigNumber,startDate:BigNumber,endDate:BigNumber,campaignId:BigNumber,ownerFrozen:boolean,_event:Event}
    export interface StartOwnershipTransferEvent {user:string,_event:Event}
    export interface TransferEvent {from:string,to:string,tokenId:BigNumber,_event:Event}
    export interface TransferOwnershipEvent {user:string,_event:Event}
}