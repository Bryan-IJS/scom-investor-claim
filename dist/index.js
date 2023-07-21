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
    exports.viewOnExplorerByTxHash = exports.formatNumberWithSeparators = exports.formatNumber = exports.explorerTxUrlsByChainId = void 0;
    exports.explorerTxUrlsByChainId = {
        1: 'https://etherscan.io/tx/',
        4: 'https://rinkeby.etherscan.io/tx/',
        42: 'https://kovan.etherscan.io/tx/',
        56: 'https://bscscan.com/tx/',
        97: 'https://testnet.bscscan.com/tx/',
        43113: 'https://testnet.snowtrace.io/tx/',
        43114: 'https://snowtrace.io/tx/',
        137: 'https://polygonscan.com/tx/',
        80001: 'https://mumbai.polygonscan.com/tx/',
        250: 'https://ftmscan.com/tx/',
        4002: 'https://testnet.ftmscan.com/tx/',
        13370: 'https://aminoxtestnet.blockscout.alphacarbon.network/tx/',
        421613: 'https://goerli.arbiscan.io/tx/'
    };
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
    const viewOnExplorerByTxHash = (chainId, txHash) => {
        if (exports.explorerTxUrlsByChainId[chainId]) {
            let url = `${exports.explorerTxUrlsByChainId[chainId]}${txHash}`;
            window.open(url);
        }
    };
    exports.viewOnExplorerByTxHash = viewOnExplorerByTxHash;
});
define("@scom/scom-investor-claim/global/utils/error.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseContractError = void 0;
    ///<amd-module name='@scom/scom-investor-claim/global/utils/error.ts'/> 
    async function parseContractError(oMessage, tokens) {
        var _a;
        const staticMessageMap = {
            'execution reverted: OAXDEX: K': 'x * y = k Violated',
            'execution reverted: OAXDEX: FORBIDDEN': 'Forbidden',
            'execution reverted: OAXDEX: INSUFFICIENT_INPUT_AMOUNT': 'Insufficient input amount',
            'execution reverted: OAXDEX: INVALID_TO': 'Invalid to',
            'execution reverted: OAXDEX: INSUFFICIENT_LIQUIDITY': 'Insufficient liquidity',
            'execution reverted: OAXDEX: INSUFFICIENT_OUTPUT_AMOUNT': 'Insufficient output amount',
            'execution reverted: OAXDEX: PAIR PAUSED': 'Pair paused',
            'execution reverted: OAXDEX: GLOBALLY PAUSED': 'Globally paused',
            'execution reverted: OAXDEX: INSUFFICIENT_LIQUIDITY_BURNED': 'Insufficient liquidity burned',
            'execution reverted: OAXDEX: INSUFFICIENT_LIQUIDITY_MINTED': 'Insufficient liquidity minted',
            'execution reverted: OAXDEX: OVERFLOW': 'Overflow',
            'execution reverted: OAXDEX_Pair: INSUFFICIENT_LIQUIDITY': 'Insufficient liquidity',
            'execution reverted: OAXDEX_Pair: INSUFFICIENT_OUTPUT_AMOUNT': 'Insufficient output amount',
            'execution reverted: OAXDEX_Pair: INSUFFICIENT_INPUT_AMOUNT': 'Insufficient input amount',
            'execution reverted: OAXDEX: LOCKED': 'Locked',
            'execution reverted: OAXDEX: INVALID_SIGNATURE': 'Invalid signature',
            'execution reverted: OAXDEX: EXPIRED': 'Expired',
            'Returned error: MetaMask Tx Signature: User denied transaction signature.': 'User denied transaction signature',
            'execution reverted: OracleAdaptor: Price outside allowed range': 'Circuit Breaker: Exceeds Price Protection Range',
            'execution reverted: PAIR_NOT_MATCH': 'Pair Not Match',
            'execution reverted: No oracle found': 'No Oracle found',
            'execution reverted: Amount exceeds available fund': 'Insufficient liquidity',
        };
        return (_a = staticMessageMap[oMessage]) !== null && _a !== void 0 ? _a : oMessage;
    }
    exports.parseContractError = parseContractError;
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
define("@scom/scom-investor-claim/global/utils/index.ts", ["require", "exports", "@scom/scom-investor-claim/global/utils/helper.ts", "@scom/scom-investor-claim/global/utils/error.ts", "@scom/scom-investor-claim/global/utils/common.ts", "@scom/scom-investor-claim/global/utils/interfaces.ts"], function (require, exports, helper_1, error_1, common_1, interfaces_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.registerSendTxEvents = exports.parseContractError = void 0;
    ///<amd-module name='@scom/scom-investor-claim/global/utils/index.ts'/> 
    __exportStar(helper_1, exports);
    Object.defineProperty(exports, "parseContractError", { enumerable: true, get: function () { return error_1.parseContractError; } });
    Object.defineProperty(exports, "registerSendTxEvents", { enumerable: true, get: function () { return common_1.registerSendTxEvents; } });
    __exportStar(interfaces_1, exports);
});
define("@scom/scom-investor-claim/global/index.ts", ["require", "exports", "@scom/scom-investor-claim/global/utils/index.ts"], function (require, exports, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ;
    __exportStar(index_1, exports);
});
define("@scom/scom-investor-claim/store/utils.ts", ["require", "exports", "@ijstech/eth-wallet", "@scom/scom-network-list", "@ijstech/components"], function (require, exports, eth_wallet_3, scom_network_list_1, components_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getClientWallet = exports.getRpcWallet = exports.initRpcWallet = exports.getChainId = exports.isRpcWalletConnected = exports.isClientWalletConnected = exports.setDataFromConfig = exports.getInfuraId = exports.state = void 0;
    exports.state = {
        networkMap: {},
        infuraId: '',
        rpcWalletId: ''
    };
    const setInfuraId = (infuraId) => {
        exports.state.infuraId = infuraId;
    };
    const getInfuraId = () => {
        return exports.state.infuraId;
    };
    exports.getInfuraId = getInfuraId;
    const setNetworkList = (networkList, infuraId) => {
        const wallet = eth_wallet_3.Wallet.getClientInstance();
        exports.state.networkMap = {};
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
            exports.state.networkMap[network.chainId] = Object.assign(Object.assign({}, networkInfo), network);
            wallet.setNetworkInfo(exports.state.networkMap[network.chainId]);
        }
    };
    const setDataFromConfig = (options) => {
        if (options.infuraId) {
            setInfuraId(options.infuraId);
        }
        if (options.networks) {
            setNetworkList(options.networks, options.infuraId);
        }
    };
    exports.setDataFromConfig = setDataFromConfig;
    function isClientWalletConnected() {
        const wallet = eth_wallet_3.Wallet.getClientInstance();
        return wallet.isConnected;
    }
    exports.isClientWalletConnected = isClientWalletConnected;
    function isRpcWalletConnected() {
        const wallet = getRpcWallet();
        return wallet === null || wallet === void 0 ? void 0 : wallet.isConnected;
    }
    exports.isRpcWalletConnected = isRpcWalletConnected;
    function getChainId() {
        const rpcWallet = getRpcWallet();
        return rpcWallet === null || rpcWallet === void 0 ? void 0 : rpcWallet.chainId;
    }
    exports.getChainId = getChainId;
    function initRpcWallet(defaultChainId) {
        if (exports.state.rpcWalletId) {
            return exports.state.rpcWalletId;
        }
        const clientWallet = eth_wallet_3.Wallet.getClientInstance();
        const networkList = Object.values(components_2.application.store.networkMap);
        const instanceId = clientWallet.initRpcWallet({
            networks: networkList,
            defaultChainId,
            infuraId: components_2.application.store.infuraId,
            multicalls: components_2.application.store.multicalls
        });
        exports.state.rpcWalletId = instanceId;
        if (clientWallet.address) {
            const rpcWallet = eth_wallet_3.Wallet.getRpcWalletInstance(instanceId);
            rpcWallet.address = clientWallet.address;
        }
        return instanceId;
    }
    exports.initRpcWallet = initRpcWallet;
    function getRpcWallet() {
        return eth_wallet_3.Wallet.getRpcWalletInstance(exports.state.rpcWalletId);
    }
    exports.getRpcWallet = getRpcWallet;
    function getClientWallet() {
        return eth_wallet_3.Wallet.getClientInstance();
    }
    exports.getClientWallet = getClientWallet;
});
define("@scom/scom-investor-claim/store/index.ts", ["require", "exports", "@scom/scom-investor-claim/assets.ts", "@scom/scom-investor-claim/store/utils.ts"], function (require, exports, assets_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fallBackUrl = void 0;
    exports.fallBackUrl = assets_1.default.fullPath('img/token-placeholder.svg');
    __exportStar(utils_1, exports);
});
define("@scom/scom-investor-claim/contracts/oswap-drip-contract/contracts/@openzeppelin/contracts/token/ERC721/ERC721.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-investor-claim/contracts/oswap-drip-contract/contracts/@openzeppelin/contracts/token/ERC721/ERC721.json.ts'/> 
    exports.default = {
        "abi": [
            { "inputs": [{ "internalType": "string", "name": "name_", "type": "string" }, { "internalType": "string", "name": "symbol_", "type": "string" }], "stateMutability": "nonpayable", "type": "constructor" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Approval", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" },
            { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getApproved", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ownerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "_data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "tokenURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
        ],
        "bytecode": "60806040523480156200001157600080fd5b5060405162001bcd38038062001bcd8339810160408190526200003491620001db565b81516200004990600090602085019062000068565b5080516200005f90600190602084019062000068565b50505062000282565b828054620000769062000245565b90600052602060002090601f0160209004810192826200009a5760008555620000e5565b82601f10620000b557805160ff1916838001178555620000e5565b82800160010185558215620000e5579182015b82811115620000e5578251825591602001919060010190620000c8565b50620000f3929150620000f7565b5090565b5b80821115620000f35760008155600101620000f8565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200013657600080fd5b81516001600160401b03808211156200015357620001536200010e565b604051601f8301601f19908116603f011681019082821181831017156200017e576200017e6200010e565b816040528381526020925086838588010111156200019b57600080fd5b600091505b83821015620001bf5785820183015181830184015290820190620001a0565b83821115620001d15760008385830101525b9695505050505050565b60008060408385031215620001ef57600080fd5b82516001600160401b03808211156200020757600080fd5b620002158683870162000124565b935060208501519150808211156200022c57600080fd5b506200023b8582860162000124565b9150509250929050565b600181811c908216806200025a57607f821691505b602082108114156200027c57634e487b7160e01b600052602260045260246000fd5b50919050565b61193b80620002926000396000f3fe608060405234801561001057600080fd5b50600436106100df5760003560e01c80636352211e1161008c578063a22cb46511610066578063a22cb465146101d0578063b88d4fde146101e3578063c87b56dd146101f6578063e985e9c51461020957600080fd5b80636352211e1461019457806370a08231146101a757806395d89b41146101c857600080fd5b8063095ea7b3116100bd578063095ea7b31461015957806323b872dd1461016e57806342842e0e1461018157600080fd5b806301ffc9a7146100e457806306fdde031461010c578063081812fc14610121575b600080fd5b6100f76100f23660046113fe565b610252565b60405190151581526020015b60405180910390f35b610114610337565b6040516101039190611491565b61013461012f3660046114a4565b6103c9565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610103565b61016c6101673660046114e6565b6104a8565b005b61016c61017c366004611510565b610635565b61016c61018f366004611510565b6106d6565b6101346101a23660046114a4565b6106f1565b6101ba6101b536600461154c565b6107a3565b604051908152602001610103565b610114610871565b61016c6101de366004611567565b610880565b61016c6101f13660046115d2565b61088f565b6101146102043660046114a4565b610937565b6100f76102173660046116cc565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260056020908152604080832093909416825291909152205460ff1690565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f80ac58cd0000000000000000000000000000000000000000000000000000000014806102e557507fffffffff0000000000000000000000000000000000000000000000000000000082167f5b5e139f00000000000000000000000000000000000000000000000000000000145b8061033157507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b92915050565b606060008054610346906116ff565b80601f0160208091040260200160405190810160405280929190818152602001828054610372906116ff565b80156103bf5780601f10610394576101008083540402835291602001916103bf565b820191906000526020600020905b8154815290600101906020018083116103a257829003601f168201915b5050505050905090565b60008181526002602052604081205473ffffffffffffffffffffffffffffffffffffffff1661047f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201527f697374656e7420746f6b656e000000000000000000000000000000000000000060648201526084015b60405180910390fd5b5060009081526004602052604090205473ffffffffffffffffffffffffffffffffffffffff1690565b60006104b3826106f1565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610571576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560448201527f72000000000000000000000000000000000000000000000000000000000000006064820152608401610476565b3373ffffffffffffffffffffffffffffffffffffffff8216148061059a575061059a8133610217565b610626576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c00000000000000006064820152608401610476565b6106308383610a54565b505050565b61063f3382610af4565b6106cb576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603160248201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60448201527f776e6572206e6f7220617070726f7665640000000000000000000000000000006064820152608401610476565b610630838383610c64565b6106308383836040518060200160405280600081525061088f565b60008181526002602052604081205473ffffffffffffffffffffffffffffffffffffffff1680610331576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201527f656e7420746f6b656e00000000000000000000000000000000000000000000006064820152608401610476565b600073ffffffffffffffffffffffffffffffffffffffff8216610848576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a6560448201527f726f2061646472657373000000000000000000000000000000000000000000006064820152608401610476565b5073ffffffffffffffffffffffffffffffffffffffff1660009081526003602052604090205490565b606060018054610346906116ff565b61088b338383610ecb565b5050565b6108993383610af4565b610925576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603160248201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60448201527f776e6572206e6f7220617070726f7665640000000000000000000000000000006064820152608401610476565b61093184848484610ff9565b50505050565b60008181526002602052604090205460609073ffffffffffffffffffffffffffffffffffffffff166109eb576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201527f6e6578697374656e7420746f6b656e00000000000000000000000000000000006064820152608401610476565b6000610a0260408051602081019091526000815290565b90506000815111610a225760405180602001604052806000815250610a4d565b80610a2c8461109c565b604051602001610a3d929190611753565b6040516020818303038152906040525b9392505050565b600081815260046020526040902080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff84169081179091558190610aae826106f1565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b60008181526002602052604081205473ffffffffffffffffffffffffffffffffffffffff16610ba5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201527f697374656e7420746f6b656e00000000000000000000000000000000000000006064820152608401610476565b6000610bb0836106f1565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480610c1f57508373ffffffffffffffffffffffffffffffffffffffff16610c07846103c9565b73ffffffffffffffffffffffffffffffffffffffff16145b80610c5c575073ffffffffffffffffffffffffffffffffffffffff80821660009081526005602090815260408083209388168352929052205460ff165b949350505050565b8273ffffffffffffffffffffffffffffffffffffffff16610c84826106f1565b73ffffffffffffffffffffffffffffffffffffffff1614610d27576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f4552433732313a207472616e73666572206f6620746f6b656e2074686174206960448201527f73206e6f74206f776e00000000000000000000000000000000000000000000006064820152608401610476565b73ffffffffffffffffffffffffffffffffffffffff8216610dc9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f2061646460448201527f72657373000000000000000000000000000000000000000000000000000000006064820152608401610476565b610dd4600082610a54565b73ffffffffffffffffffffffffffffffffffffffff83166000908152600360205260408120805460019290610e0a9084906117b1565b909155505073ffffffffffffffffffffffffffffffffffffffff82166000908152600360205260408120805460019290610e459084906117c8565b909155505060008181526002602052604080822080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff86811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610f61576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610476565b73ffffffffffffffffffffffffffffffffffffffff83811660008181526005602090815260408083209487168084529482529182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b611004848484610c64565b611010848484846111ce565b610931576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e74657200000000000000000000000000006064820152608401610476565b6060816110dc57505060408051808201909152600181527f3000000000000000000000000000000000000000000000000000000000000000602082015290565b8160005b811561110657806110f0816117e0565b91506110ff9050600a83611848565b91506110e0565b60008167ffffffffffffffff811115611121576111216115a3565b6040519080825280601f01601f19166020018201604052801561114b576020820181803683370190505b5090505b8415610c5c576111606001836117b1565b915061116d600a8661185c565b6111789060306117c8565b60f81b81838151811061118d5761118d611870565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053506111c7600a86611848565b945061114f565b600073ffffffffffffffffffffffffffffffffffffffff84163b156113c2576040517f150b7a0200000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff85169063150b7a029061124590339089908890889060040161189f565b602060405180830381600087803b15801561125f57600080fd5b505af19250505080156112ad575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682019092526112aa918101906118e8565b60015b611377573d8080156112db576040519150601f19603f3d011682016040523d82523d6000602084013e6112e0565b606091505b50805161136f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e74657200000000000000000000000000006064820152608401610476565b805181602001fd5b7fffffffff00000000000000000000000000000000000000000000000000000000167f150b7a0200000000000000000000000000000000000000000000000000000000149050610c5c565b506001949350505050565b7fffffffff00000000000000000000000000000000000000000000000000000000811681146113fb57600080fd5b50565b60006020828403121561141057600080fd5b8135610a4d816113cd565b60005b8381101561143657818101518382015260200161141e565b838111156109315750506000910152565b6000815180845261145f81602086016020860161141b565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b602081526000610a4d6020830184611447565b6000602082840312156114b657600080fd5b5035919050565b803573ffffffffffffffffffffffffffffffffffffffff811681146114e157600080fd5b919050565b600080604083850312156114f957600080fd5b611502836114bd565b946020939093013593505050565b60008060006060848603121561152557600080fd5b61152e846114bd565b925061153c602085016114bd565b9150604084013590509250925092565b60006020828403121561155e57600080fd5b610a4d826114bd565b6000806040838503121561157a57600080fd5b611583836114bd565b91506020830135801515811461159857600080fd5b809150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080600080608085870312156115e857600080fd5b6115f1856114bd565b93506115ff602086016114bd565b925060408501359150606085013567ffffffffffffffff8082111561162357600080fd5b818701915087601f83011261163757600080fd5b813581811115611649576116496115a3565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f0116810190838211818310171561168f5761168f6115a3565b816040528281528a60208487010111156116a857600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b600080604083850312156116df57600080fd5b6116e8836114bd565b91506116f6602084016114bd565b90509250929050565b600181811c9082168061171357607f821691505b6020821081141561174d577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b6000835161176581846020880161141b565b83519083019061177981836020880161141b565b01949350505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000828210156117c3576117c3611782565b500390565b600082198211156117db576117db611782565b500190565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82141561181257611812611782565b5060010190565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b60008261185757611857611819565b500490565b60008261186b5761186b611819565b500690565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600073ffffffffffffffffffffffffffffffffffffffff8087168352808616602084015250836040830152608060608301526118de6080830184611447565b9695505050505050565b6000602082840312156118fa57600080fd5b8151610a4d816113cd56fea2646970667358221220a219bc657f05b7bbfd910b96793762b2db08118db1eded1e5ba94f0cbe4e0dc764736f6c63430008090033"
    };
});
define("@scom/scom-investor-claim/contracts/oswap-drip-contract/contracts/@openzeppelin/contracts/token/ERC721/ERC721.ts", ["require", "exports", "@ijstech/eth-contract", "@scom/scom-investor-claim/contracts/oswap-drip-contract/contracts/@openzeppelin/contracts/token/ERC721/ERC721.json.ts"], function (require, exports, eth_contract_1, ERC721_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ERC721 = void 0;
    class ERC721 extends eth_contract_1.Contract {
        constructor(wallet, address) {
            super(wallet, address, ERC721_json_1.default.abi, ERC721_json_1.default.bytecode);
            this.assign();
        }
        deploy(params, options) {
            return this.__deploy([params.name, params.symbol], options);
        }
        parseApprovalEvent(receipt) {
            return this.parseEvents(receipt, "Approval").map(e => this.decodeApprovalEvent(e));
        }
        decodeApprovalEvent(event) {
            let result = event.data;
            return {
                owner: result.owner,
                approved: result.approved,
                tokenId: new eth_contract_1.BigNumber(result.tokenId),
                _event: event
            };
        }
        parseApprovalForAllEvent(receipt) {
            return this.parseEvents(receipt, "ApprovalForAll").map(e => this.decodeApprovalForAllEvent(e));
        }
        decodeApprovalForAllEvent(event) {
            let result = event.data;
            return {
                owner: result.owner,
                operator: result.operator,
                approved: result.approved,
                _event: event
            };
        }
        parseTransferEvent(receipt) {
            return this.parseEvents(receipt, "Transfer").map(e => this.decodeTransferEvent(e));
        }
        decodeTransferEvent(event) {
            let result = event.data;
            return {
                from: result.from,
                to: result.to,
                tokenId: new eth_contract_1.BigNumber(result.tokenId),
                _event: event
            };
        }
        assign() {
            let balanceOf_call = async (owner, options) => {
                let result = await this.call('balanceOf', [owner], options);
                return new eth_contract_1.BigNumber(result);
            };
            this.balanceOf = balanceOf_call;
            let getApproved_call = async (tokenId, options) => {
                let result = await this.call('getApproved', [this.wallet.utils.toString(tokenId)], options);
                return result;
            };
            this.getApproved = getApproved_call;
            let isApprovedForAllParams = (params) => [params.owner, params.operator];
            let isApprovedForAll_call = async (params, options) => {
                let result = await this.call('isApprovedForAll', isApprovedForAllParams(params), options);
                return result;
            };
            this.isApprovedForAll = isApprovedForAll_call;
            let name_call = async (options) => {
                let result = await this.call('name', [], options);
                return result;
            };
            this.name = name_call;
            let ownerOf_call = async (tokenId, options) => {
                let result = await this.call('ownerOf', [this.wallet.utils.toString(tokenId)], options);
                return result;
            };
            this.ownerOf = ownerOf_call;
            let supportsInterface_call = async (interfaceId, options) => {
                let result = await this.call('supportsInterface', [interfaceId], options);
                return result;
            };
            this.supportsInterface = supportsInterface_call;
            let symbol_call = async (options) => {
                let result = await this.call('symbol', [], options);
                return result;
            };
            this.symbol = symbol_call;
            let tokenURI_call = async (tokenId, options) => {
                let result = await this.call('tokenURI', [this.wallet.utils.toString(tokenId)], options);
                return result;
            };
            this.tokenURI = tokenURI_call;
            let approveParams = (params) => [params.to, this.wallet.utils.toString(params.tokenId)];
            let approve_send = async (params, options) => {
                let result = await this.send('approve', approveParams(params), options);
                return result;
            };
            let approve_call = async (params, options) => {
                let result = await this.call('approve', approveParams(params), options);
                return;
            };
            this.approve = Object.assign(approve_send, {
                call: approve_call
            });
            let safeTransferFromParams = (params) => [params.from, params.to, this.wallet.utils.toString(params.tokenId)];
            let safeTransferFrom_send = async (params, options) => {
                let result = await this.send('safeTransferFrom', safeTransferFromParams(params), options);
                return result;
            };
            let safeTransferFrom_call = async (params, options) => {
                let result = await this.call('safeTransferFrom', safeTransferFromParams(params), options);
                return;
            };
            this.safeTransferFrom = Object.assign(safeTransferFrom_send, {
                call: safeTransferFrom_call
            });
            let safeTransferFrom_1Params = (params) => [params.from, params.to, this.wallet.utils.toString(params.tokenId), this.wallet.utils.stringToBytes(params.data)];
            let safeTransferFrom_1_send = async (params, options) => {
                let result = await this.send('safeTransferFrom', safeTransferFrom_1Params(params), options);
                return result;
            };
            let safeTransferFrom_1_call = async (params, options) => {
                let result = await this.call('safeTransferFrom', safeTransferFrom_1Params(params), options);
                return;
            };
            this.safeTransferFrom_1 = Object.assign(safeTransferFrom_1_send, {
                call: safeTransferFrom_1_call
            });
            let setApprovalForAllParams = (params) => [params.operator, params.approved];
            let setApprovalForAll_send = async (params, options) => {
                let result = await this.send('setApprovalForAll', setApprovalForAllParams(params), options);
                return result;
            };
            let setApprovalForAll_call = async (params, options) => {
                let result = await this.call('setApprovalForAll', setApprovalForAllParams(params), options);
                return;
            };
            this.setApprovalForAll = Object.assign(setApprovalForAll_send, {
                call: setApprovalForAll_call
            });
            let transferFromParams = (params) => [params.from, params.to, this.wallet.utils.toString(params.tokenId)];
            let transferFrom_send = async (params, options) => {
                let result = await this.send('transferFrom', transferFromParams(params), options);
                return result;
            };
            let transferFrom_call = async (params, options) => {
                let result = await this.call('transferFrom', transferFromParams(params), options);
                return;
            };
            this.transferFrom = Object.assign(transferFrom_send, {
                call: transferFrom_call
            });
        }
    }
    ERC721._abi = ERC721_json_1.default.abi;
    exports.ERC721 = ERC721;
});
define("@scom/scom-investor-claim/contracts/oswap-drip-contract/contracts/Authorization.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-investor-claim/contracts/oswap-drip-contract/contracts/Authorization.json.ts'/> 
    exports.default = {
        "abi": [
            { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "Authorize", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "Deauthorize", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "StartOwnershipTransfer", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "TransferOwnership", "type": "event" },
            { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "deny", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "isPermitted", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "newOwner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "permit", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [], "name": "takeOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "newOwner_", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
        ],
        "bytecode": "608060405234801561001057600080fd5b50600080546001600160a01b031916331790556104e6806100326000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c80639c52a7f11161005b5780639c52a7f11461010b578063a2f55ae51461011e578063d4ee1d9014610131578063f2fde38b1461015157600080fd5b80633fd8cc4e1461008257806360536172146100bc5780638da5cb5b146100c6575b600080fd5b6100a5610090366004610473565b60026020526000908152604090205460ff1681565b60405160ff90911681526020015b60405180910390f35b6100c4610164565b005b6000546100e69073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016100b3565b6100c4610119366004610473565b610292565b6100c461012c366004610473565b610339565b6001546100e69073ffffffffffffffffffffffffffffffffffffffff1681565b6100c461015f366004610473565b6103dc565b60015473ffffffffffffffffffffffffffffffffffffffff16331461020f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f416374696f6e20706572666f726d656420627920756e617574686f72697a656460448201527f20616464726573732e0000000000000000000000000000000000000000000000606482015260840160405180910390fd5b600180546000805473ffffffffffffffffffffffffffffffffffffffff83167fffffffffffffffffffffffff000000000000000000000000000000000000000091821681179092559091169091556040519081527fcfaaa26691e16e66e73290fc725eee1a6b4e0e693a1640484937aac25ffb55a49060200160405180910390a1565b60005473ffffffffffffffffffffffffffffffffffffffff1633146102b657600080fd5b73ffffffffffffffffffffffffffffffffffffffff811660008181526002602090815260409182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016905590519182527f79ede3839cd7a7d8bd77e97e5c890565fe4f76cdbbeaa364646e28a8695a788491015b60405180910390a150565b60005473ffffffffffffffffffffffffffffffffffffffff16331461035d57600080fd5b73ffffffffffffffffffffffffffffffffffffffff811660008181526002602090815260409182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016600117905590519182527f6d81a01b39982517ba331aeb4f387b0f9cc32334b65bb9a343a077973cf7adf5910161032e565b60005473ffffffffffffffffffffffffffffffffffffffff16331461040057600080fd5b600180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff83169081179091556040519081527f686a7ab184e6928ddedba810af7b443d6baa40bf32c4787ccd72c5b4b28cae1b9060200161032e565b60006020828403121561048557600080fd5b813573ffffffffffffffffffffffffffffffffffffffff811681146104a957600080fd5b939250505056fea2646970667358221220f73dde1c806680a8765a9dfae78239961ba06ab23ab6863807307140550fe49a64736f6c63430008090033"
    };
});
define("@scom/scom-investor-claim/contracts/oswap-drip-contract/contracts/Authorization.ts", ["require", "exports", "@ijstech/eth-contract", "@scom/scom-investor-claim/contracts/oswap-drip-contract/contracts/Authorization.json.ts"], function (require, exports, eth_contract_2, Authorization_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Authorization = void 0;
    class Authorization extends eth_contract_2.Contract {
        constructor(wallet, address) {
            super(wallet, address, Authorization_json_1.default.abi, Authorization_json_1.default.bytecode);
            this.assign();
        }
        deploy(options) {
            return this.__deploy([], options);
        }
        parseAuthorizeEvent(receipt) {
            return this.parseEvents(receipt, "Authorize").map(e => this.decodeAuthorizeEvent(e));
        }
        decodeAuthorizeEvent(event) {
            let result = event.data;
            return {
                user: result.user,
                _event: event
            };
        }
        parseDeauthorizeEvent(receipt) {
            return this.parseEvents(receipt, "Deauthorize").map(e => this.decodeDeauthorizeEvent(e));
        }
        decodeDeauthorizeEvent(event) {
            let result = event.data;
            return {
                user: result.user,
                _event: event
            };
        }
        parseStartOwnershipTransferEvent(receipt) {
            return this.parseEvents(receipt, "StartOwnershipTransfer").map(e => this.decodeStartOwnershipTransferEvent(e));
        }
        decodeStartOwnershipTransferEvent(event) {
            let result = event.data;
            return {
                user: result.user,
                _event: event
            };
        }
        parseTransferOwnershipEvent(receipt) {
            return this.parseEvents(receipt, "TransferOwnership").map(e => this.decodeTransferOwnershipEvent(e));
        }
        decodeTransferOwnershipEvent(event) {
            let result = event.data;
            return {
                user: result.user,
                _event: event
            };
        }
        assign() {
            let isPermitted_call = async (param1, options) => {
                let result = await this.call('isPermitted', [param1], options);
                return new eth_contract_2.BigNumber(result);
            };
            this.isPermitted = isPermitted_call;
            let newOwner_call = async (options) => {
                let result = await this.call('newOwner', [], options);
                return result;
            };
            this.newOwner = newOwner_call;
            let owner_call = async (options) => {
                let result = await this.call('owner', [], options);
                return result;
            };
            this.owner = owner_call;
            let deny_send = async (user, options) => {
                let result = await this.send('deny', [user], options);
                return result;
            };
            let deny_call = async (user, options) => {
                let result = await this.call('deny', [user], options);
                return;
            };
            this.deny = Object.assign(deny_send, {
                call: deny_call
            });
            let permit_send = async (user, options) => {
                let result = await this.send('permit', [user], options);
                return result;
            };
            let permit_call = async (user, options) => {
                let result = await this.call('permit', [user], options);
                return;
            };
            this.permit = Object.assign(permit_send, {
                call: permit_call
            });
            let takeOwnership_send = async (options) => {
                let result = await this.send('takeOwnership', [], options);
                return result;
            };
            let takeOwnership_call = async (options) => {
                let result = await this.call('takeOwnership', [], options);
                return;
            };
            this.takeOwnership = Object.assign(takeOwnership_send, {
                call: takeOwnership_call
            });
            let transferOwnership_send = async (newOwner, options) => {
                let result = await this.send('transferOwnership', [newOwner], options);
                return result;
            };
            let transferOwnership_call = async (newOwner, options) => {
                let result = await this.call('transferOwnership', [newOwner], options);
                return;
            };
            this.transferOwnership = Object.assign(transferOwnership_send, {
                call: transferOwnership_call
            });
        }
    }
    Authorization._abi = Authorization_json_1.default.abi;
    exports.Authorization = Authorization;
});
define("@scom/scom-investor-claim/contracts/oswap-drip-contract/contracts/Drip.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-investor-claim/contracts/oswap-drip-contract/contracts/Drip.json.ts'/> 
    exports.default = {
        "abi": [
            { "inputs": [{ "internalType": "string", "name": "name_", "type": "string" }, { "internalType": "string", "name": "symbol_", "type": "string" }], "stateMutability": "nonpayable", "type": "constructor" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Approval", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "Authorize", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "Deauthorize", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "totalClaimed", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "totalAmount", "type": "uint256" }], "name": "Drip", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "recipient", "type": "address" }, { "indexed": true, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "startDate", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "endDate", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "campaignId", "type": "uint256" }, { "indexed": false, "internalType": "bool", "name": "ownerFrozen", "type": "bool" }], "name": "Lock", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "StartOwnershipTransfer", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "TransferOwnership", "type": "event" },
            { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "campaignId", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "claim", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }], "name": "claimMultiple", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "claimedAmount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "deny", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "endDate", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "getAllInfo", "outputs": [{ "internalType": "uint256[]", "name": "_tokenId", "type": "uint256[]" }, { "internalType": "contract IERC20[]", "name": "_token", "type": "address[]" }, { "internalType": "uint256[]", "name": "_unclaimedFunds", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "_claimedAmount", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "_totalAmount", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "_startDate", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "_endDate", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "_campaignId", "type": "uint256[]" }, { "internalType": "bool[]", "name": "_ownerFrozen", "type": "bool[]" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getApproved", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "getInfo", "outputs": [{ "internalType": "address", "name": "_recipient", "type": "address" }, { "internalType": "contract IERC20", "name": "_token", "type": "address" }, { "internalType": "uint256", "name": "_unclaimedFunds", "type": "uint256" }, { "internalType": "uint256", "name": "_claimedAmount", "type": "uint256" }, { "internalType": "uint256", "name": "_totalAmount", "type": "uint256" }, { "internalType": "uint256", "name": "_startDate", "type": "uint256" }, { "internalType": "uint256", "name": "_endDate", "type": "uint256" }, { "internalType": "uint256", "name": "_campaignId", "type": "uint256" }, { "internalType": "bool", "name": "_ownerFrozen", "type": "bool" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "isPermitted", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "_recipient", "type": "address" }, { "internalType": "contract IERC20", "name": "_token", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "internalType": "uint256", "name": "_startDate", "type": "uint256" }, { "internalType": "uint256", "name": "_endDate", "type": "uint256" }, { "internalType": "uint256", "name": "_campaignId", "type": "uint256" }, { "internalType": "bool", "name": "_ownerFrozen", "type": "bool" }], "name": "lock", "outputs": [{ "internalType": "uint256", "name": "lockId", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address[]", "name": "_recipient", "type": "address[]" }, { "internalType": "contract IERC20", "name": "_token", "type": "address" }, { "internalType": "uint256[]", "name": "_amount", "type": "uint256[]" }, { "internalType": "uint256", "name": "_startDate", "type": "uint256" }, { "internalType": "uint256", "name": "_endDate", "type": "uint256" }, { "internalType": "uint256", "name": "_campaignId", "type": "uint256" }, { "internalType": "bool", "name": "_ownerFrozen", "type": "bool" }], "name": "lockMultiple", "outputs": [{ "internalType": "uint256[]", "name": "lockId", "type": "uint256[]" }], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "maximumAllowedClaimedFunds", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "newOwner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "ownerFrozen", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ownerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "permit", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "_data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "startDate", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "takeOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [], "name": "timelockCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "token", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "tokenByIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "tokenOfOwnerByIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "tokenURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "totalAmount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "newOwner_", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
        ],
        "bytecode": "60806040523480156200001157600080fd5b506040516200422a3803806200422a8339810160408190526200003491620001f4565b8151829082906200004d90600090602085019062000081565b5080516200006390600190602084019062000081565b5050600680546001600160a01b03191633179055506200029b915050565b8280546200008f906200025e565b90600052602060002090601f016020900481019282620000b35760008555620000fe565b82601f10620000ce57805160ff1916838001178555620000fe565b82800160010185558215620000fe579182015b82811115620000fe578251825591602001919060010190620000e1565b506200010c92915062000110565b5090565b5b808211156200010c576000815560010162000111565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200014f57600080fd5b81516001600160401b03808211156200016c576200016c62000127565b604051601f8301601f19908116603f0116810190828211818310171562000197576200019762000127565b81604052838152602092508683858801011115620001b457600080fd5b600091505b83821015620001d85785820183015181830184015290820190620001b9565b83821115620001ea5760008385830101525b9695505050505050565b600080604083850312156200020857600080fd5b82516001600160401b03808211156200022057600080fd5b6200022e868387016200013d565b935060208501519150808211156200024557600080fd5b5062000254858286016200013d565b9150509250929050565b600181811c908216806200027357607f821691505b602082108114156200029557634e487b7160e01b600052602260045260246000fd5b50919050565b613f7f80620002ab6000396000f3fe608060405234801561001057600080fd5b50600436106102915760003560e01c806352d55bb61161016057806395d89b41116100d8578063b88d4fde1161008c578063d4ee1d9011610071578063d4ee1d9014610673578063e985e9c514610693578063f2fde38b146106dc57600080fd5b8063b88d4fde1461064d578063c87b56dd1461066057600080fd5b8063a22cb465116100bd578063a22cb46514610607578063a2f55ae51461061a578063b66bb6821461062d57600080fd5b806395d89b41146105ec5780639c52a7f1146105f457600080fd5b80637a3931c31161012f5780638da5cb5b116101145780638da5cb5b146105a65780639051cce9146105c6578063958ddc98146105d957600080fd5b80637a3931c31461055e5780637e16c30c1461057e57600080fd5b806352d55bb61461052757806360536172146105305780636352211e1461053857806370a082311461054b57600080fd5b80631a3cd59a1161020e5780633fd8cc4e116101c257806342842e0e116101a757806342842e0e146104e15780634cac5b4b146104f45780634f6ccce71461051457600080fd5b80633fd8cc4e1461048c57806341d92cd9146104c157600080fd5b80632f745c59116101f35780632f745c5914610446578063379607f5146104595780633ad424171461046c57600080fd5b80631a3cd59a146103c257806323b872dd1461043357600080fd5b806306fdde0311610265578063095ea7b31161024a578063095ea7b314610392578063154a3465146103a757806318160ddd146103ba57600080fd5b806306fdde031461036a578063081812fc1461037f57600080fd5b80626cb8831461029657806301ffc9a7146102c9578063029af15d146102ec578063044215c61461030f575b600080fd5b6102b66102a4366004613595565b600f6020526000908152604090205481565b6040519081526020015b60405180910390f35b6102dc6102d73660046135dc565b6106ef565b60405190151581526020016102c0565b6102dc6102fa366004613595565b60146020526000908152604090205460ff1681565b61034561031d366004613595565b600e6020526000908152604090205473ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016102c0565b61037261074b565b6040516102c0919061366f565b61034561038d366004613595565b6107dd565b6103a56103a03660046136a4565b6108bc565b005b6102b66103b53660046136de565b610a49565b600b546102b6565b6103d56103d0366004613595565b610cd3565b6040805173ffffffffffffffffffffffffffffffffffffffff9a8b1681529990981660208a0152968801959095526060870193909352608086019190915260a085015260c084015260e08301521515610100820152610120016102c0565b6103a5610441366004613750565b610dbd565b6102b66104543660046136a4565b610e5e565b6103a5610467366004613595565b610f2d565b6102b661047a366004613595565b60106020526000908152604090205481565b6104af61049a366004613791565b60086020526000908152604090205460ff1681565b60405160ff90911681526020016102c0565b6102b66104cf366004613595565b60116020526000908152604090205481565b6103a56104ef366004613750565b610f39565b6102b6610502366004613595565b60126020526000908152604090205481565b6102b6610522366004613595565b610f54565b6102b6600d5481565b6103a5611012565b610345610546366004613595565b61113c565b6102b6610559366004613791565b6111ee565b61057161056c3660046137fa565b6112bc565b6040516102c091906138e9565b61059161058c366004613791565b6114a6565b6040516102c09998979695949392919061392e565b6006546103459073ffffffffffffffffffffffffffffffffffffffff1681565b6103a56105d4366004613aaf565b61195e565b6102b66105e7366004613595565b61199f565b610372611a8c565b6103a5610602366004613791565b611a9b565b6103a5610615366004613b55565b611b42565b6103a5610628366004613791565b611b51565b6102b661063b366004613595565b60136020526000908152604090205481565b6103a561065b366004613b8e565b611bf4565b61037261066e366004613595565b611c9c565b6007546103459073ffffffffffffffffffffffffffffffffffffffff1681565b6102dc6106a1366004613c70565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260056020908152604080832093909416825291909152205460ff1690565b6103a56106ea366004613791565b611db9565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f780e9d63000000000000000000000000000000000000000000000000000000001480610745575061074582611e50565b92915050565b60606000805461075a90613c9e565b80601f016020809104026020016040519081016040528092919081815260200182805461078690613c9e565b80156107d35780601f106107a8576101008083540402835291602001916107d3565b820191906000526020600020905b8154815290600101906020018083116107b657829003601f168201915b5050505050905090565b60008181526002602052604081205473ffffffffffffffffffffffffffffffffffffffff16610893576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201527f697374656e7420746f6b656e000000000000000000000000000000000000000060648201526084015b60405180910390fd5b5060009081526004602052604090205473ffffffffffffffffffffffffffffffffffffffff1690565b60006108c78261113c565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610985576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560448201527f7200000000000000000000000000000000000000000000000000000000000000606482015260840161088a565b3373ffffffffffffffffffffffffffffffffffffffff821614806109ae57506109ae81336106a1565b610a3a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c0000000000000000606482015260840161088a565b610a448383611f33565b505050565b3360009081526008602052604081205460ff16600114610aeb576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f416374696f6e20706572666f726d656420627920756e617574686f72697a656460448201527f20616464726573732e0000000000000000000000000000000000000000000000606482015260840161088a565b83851115610b7b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602860248201527f537461727420646174652063616e6e6f74206265206c61746572207468616e2060448201527f656e642064617465000000000000000000000000000000000000000000000000606482015260840161088a565b50600d8054906001906000610b908385613d21565b90915550506000818152600e6020908152604080832080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff8c8116918217909255601084528285208b9055601184528285208a90556012845282852089905560138452828520889055601484529382902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001687151590811790915582518681529384018b9052918301899052606083018890526080830187905260a08301919091528a16907f1a726560fe6cfd373d663a252cfcbe66ba2f361ce613d28747d1c7e4c6de7a589060c00160405180910390a3610cbe73ffffffffffffffffffffffffffffffffffffffff8816333089611fd5565b610cc888826120b1565b979650505050505050565b6000806000806000806000806000610cea8a61113c565b60008b8152600e602052604090205490995073ffffffffffffffffffffffffffffffffffffffff169750610d1d8a6120cb565b9650600f60008b8152602001908152602001600020549550601060008b8152602001908152602001600020549450601160008b8152602001908152602001600020549350601260008b8152602001908152602001600020549250601360008b8152602001908152602001600020549150601460008b815260200190815260200160002060009054906101000a900460ff1690509193959799909294969850565b610dc733826120ed565b610e53576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603160248201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60448201527f776e6572206e6f7220617070726f766564000000000000000000000000000000606482015260840161088a565b610a44838383612259565b6000610e69836111ee565b8210610ef7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602b60248201527f455243373231456e756d657261626c653a206f776e657220696e646578206f7560448201527f74206f6620626f756e6473000000000000000000000000000000000000000000606482015260840161088a565b5073ffffffffffffffffffffffffffffffffffffffff919091166000908152600960209081526040808320938352929052205490565b610f3681612399565b50565b610a4483838360405180602001604052806000815250611bf4565b6000610f5f600b5490565b8210610fed576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602c60248201527f455243373231456e756d657261626c653a20676c6f62616c20696e646578206f60448201527f7574206f6620626f756e64730000000000000000000000000000000000000000606482015260840161088a565b600b828154811061100057611000613d39565b90600052602060002001549050919050565b60075473ffffffffffffffffffffffffffffffffffffffff1633146110b9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f416374696f6e20706572666f726d656420627920756e617574686f72697a656460448201527f20616464726573732e0000000000000000000000000000000000000000000000606482015260840161088a565b600780546006805473ffffffffffffffffffffffffffffffffffffffff83167fffffffffffffffffffffffff000000000000000000000000000000000000000091821681179092559091169091556040519081527fcfaaa26691e16e66e73290fc725eee1a6b4e0e693a1640484937aac25ffb55a49060200160405180910390a1565b60008181526002602052604081205473ffffffffffffffffffffffffffffffffffffffff1680610745576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201527f656e7420746f6b656e0000000000000000000000000000000000000000000000606482015260840161088a565b600073ffffffffffffffffffffffffffffffffffffffff8216611293576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a6560448201527f726f206164647265737300000000000000000000000000000000000000000000606482015260840161088a565b5073ffffffffffffffffffffffffffffffffffffffff1660009081526003602052604090205490565b3360009081526008602052604090205460609060ff16600114611361576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f416374696f6e20706572666f726d656420627920756e617574686f72697a656460448201527f20616464726573732e0000000000000000000000000000000000000000000000606482015260840161088a565b888681146113cb576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f4172726179206c656e677468206e6f74206d6174636865640000000000000000604482015260640161088a565b8067ffffffffffffffff8111156113e4576113e4613a31565b60405190808252806020026020018201604052801561140d578160200160208202803683370190505b50915060005b81811015611497576114688c8c8381811061143057611430613d39565b90506020020160208101906114459190613791565b8b8b8b8581811061145857611458613d39565b905060200201358a8a8a8a610a49565b83828151811061147a5761147a613d39565b60209081029190910101528061148f81613d68565b915050611413565b50509998505050505050505050565b606080606080606080606080606060006114bf8b6111ee565b90508067ffffffffffffffff8111156114da576114da613a31565b604051908082528060200260200182016040528015611503578160200160208202803683370190505b5099508067ffffffffffffffff81111561151f5761151f613a31565b604051908082528060200260200182016040528015611548578160200160208202803683370190505b5098508067ffffffffffffffff81111561156457611564613a31565b60405190808252806020026020018201604052801561158d578160200160208202803683370190505b5097508067ffffffffffffffff8111156115a9576115a9613a31565b6040519080825280602002602001820160405280156115d2578160200160208202803683370190505b5096508067ffffffffffffffff8111156115ee576115ee613a31565b604051908082528060200260200182016040528015611617578160200160208202803683370190505b5095508067ffffffffffffffff81111561163357611633613a31565b60405190808252806020026020018201604052801561165c578160200160208202803683370190505b5094508067ffffffffffffffff81111561167857611678613a31565b6040519080825280602002602001820160405280156116a1578160200160208202803683370190505b5093508067ffffffffffffffff8111156116bd576116bd613a31565b6040519080825280602002602001820160405280156116e6578160200160208202803683370190505b5092508067ffffffffffffffff81111561170257611702613a31565b60405190808252806020026020018201604052801561172b578160200160208202803683370190505b50915060005b8181101561194f5760006117458d83610e5e565b9050808c838151811061175a5761175a613d39565b6020908102919091018101919091526000828152600e90915260409020548b5173ffffffffffffffffffffffffffffffffffffffff909116908c90849081106117a5576117a5613d39565b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff16815250506117e8816120cb565b8a83815181106117fa576117fa613d39565b602002602001018181525050600f60008281526020019081526020016000205489838151811061182c5761182c613d39565b602002602001018181525050601060008281526020019081526020016000205488838151811061185e5761185e613d39565b602002602001018181525050601160008281526020019081526020016000205487838151811061189057611890613d39565b60200260200101818152505060126000828152602001908152602001600020548683815181106118c2576118c2613d39565b60200260200101818152505060136000828152602001908152602001600020548583815181106118f4576118f4613d39565b602090810291909101810191909152600082815260149091526040902054845160ff9091169085908490811061192c5761192c613d39565b91151560209283029190910190910152508061194781613d68565b915050611731565b50509193959799909294969850565b805160005b81811015610a445761198d83828151811061198057611980613d39565b6020026020010151612399565b8061199781613d68565b915050611963565b6000818152601160205260408120544210156119bd57506000919050565b60008281526011602090815260408083205460129092529091205414156119f1575060009081526010602052604090205490565b6000828152601260205260409020544210611a19575060009081526010602052604090205490565b600082815260116020526040812054611a329042613da1565b60008481526011602090815260408083205460129092528220549293509091611a5b9190613da1565b6000858152601060205260409020549091508190611a7a908490613db8565b611a849190613e24565b949350505050565b60606001805461075a90613c9e565b60065473ffffffffffffffffffffffffffffffffffffffff163314611abf57600080fd5b73ffffffffffffffffffffffffffffffffffffffff811660008181526008602090815260409182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016905590519182527f79ede3839cd7a7d8bd77e97e5c890565fe4f76cdbbeaa364646e28a8695a788491015b60405180910390a150565b611b4d33838361251a565b5050565b60065473ffffffffffffffffffffffffffffffffffffffff163314611b7557600080fd5b73ffffffffffffffffffffffffffffffffffffffff811660008181526008602090815260409182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016600117905590519182527f6d81a01b39982517ba331aeb4f387b0f9cc32334b65bb9a343a077973cf7adf59101611b37565b611bfe33836120ed565b611c8a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603160248201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60448201527f776e6572206e6f7220617070726f766564000000000000000000000000000000606482015260840161088a565b611c9684848484612648565b50505050565b60008181526002602052604090205460609073ffffffffffffffffffffffffffffffffffffffff16611d50576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201527f6e6578697374656e7420746f6b656e0000000000000000000000000000000000606482015260840161088a565b6000611d6760408051602081019091526000815290565b90506000815111611d875760405180602001604052806000815250611db2565b80611d91846126eb565b604051602001611da2929190613e38565b6040516020818303038152906040525b9392505050565b60065473ffffffffffffffffffffffffffffffffffffffff163314611ddd57600080fd5b600780547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff83169081179091556040519081527f686a7ab184e6928ddedba810af7b443d6baa40bf32c4787ccd72c5b4b28cae1b90602001611b37565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f80ac58cd000000000000000000000000000000000000000000000000000000001480611ee357507fffffffff0000000000000000000000000000000000000000000000000000000082167f5b5e139f00000000000000000000000000000000000000000000000000000000145b8061074557507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff00000000000000000000000000000000000000000000000000000000831614610745565b73ffffffffffffffffffffffffffffffffffffffff82161580611f65575060008181526014602052604090205460ff16155b611fcb576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f546f6b656e206f776e65722069732066726f7a656e2100000000000000000000604482015260640161088a565b611b4d828261281d565b60405173ffffffffffffffffffffffffffffffffffffffff80851660248301528316604482015260648101829052611c969085907f23b872dd00000000000000000000000000000000000000000000000000000000906084015b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff00000000000000000000000000000000000000000000000000000000909316929092179091526128bd565b611b4d8282604051806020016040528060008152506129c9565b6000818152600f60205260408120546120e38361199f565b6107459190613da1565b60008181526002602052604081205473ffffffffffffffffffffffffffffffffffffffff1661219e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201527f697374656e7420746f6b656e0000000000000000000000000000000000000000606482015260840161088a565b60006121a98361113c565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16148061221857508373ffffffffffffffffffffffffffffffffffffffff16612200846107dd565b73ffffffffffffffffffffffffffffffffffffffff16145b80611a84575073ffffffffffffffffffffffffffffffffffffffff80821660009081526005602090815260408083209388168352929052205460ff16611a84565b8273ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415612315576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f43616e6e6f74207472616e7366657220746f207468652073616d65206164647260448201527f6573730000000000000000000000000000000000000000000000000000000000606482015260840161088a565b60008181526014602052604090205460ff161561238e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f546f6b656e206f776e65722069732066726f7a656e2100000000000000000000604482015260640161088a565b610a44838383612a6c565b336123a38261113c565b73ffffffffffffffffffffffffffffffffffffffff1614612446576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603760248201527f43616e6e6f7420636c61696d2829206f6e206120746f6b656e2062656c6f6e6760448201527f696e6720746f20616e6f74686572206164647265737321000000000000000000606482015260840161088a565b60006124518261199f565b6000838152600f602052604090205490915081141561246e575050565b6000828152600f60205260408120546124879083613da1565b6000848152600f602090815260408083208690556010825291829020548251878152918201849052818301869052606082015290519192507f926b655c5b227b763d39119f89c9b68ec25502973c1ecd75f7dfe88b19b5559b919081900360800190a16000838152600e6020526040902054610a449073ffffffffffffffffffffffffffffffffffffffff163383612cde565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614156125b0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c657200000000000000604482015260640161088a565b73ffffffffffffffffffffffffffffffffffffffff83811660008181526005602090815260408083209487168084529482529182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b612653848484612259565b61265f84848484612d34565b611c96576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e7465720000000000000000000000000000606482015260840161088a565b60608161272b57505060408051808201909152600181527f3000000000000000000000000000000000000000000000000000000000000000602082015290565b8160005b8115612755578061273f81613d68565b915061274e9050600a83613e24565b915061272f565b60008167ffffffffffffffff81111561277057612770613a31565b6040519080825280601f01601f19166020018201604052801561279a576020820181803683370190505b5090505b8415611a84576127af600183613da1565b91506127bc600a86613e67565b6127c7906030613d21565b60f81b8183815181106127dc576127dc613d39565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350612816600a86613e24565b945061279e565b600081815260046020526040902080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff841690811790915581906128778261113c565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600061291f826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff16612f339092919063ffffffff16565b805190915015610a44578080602001905181019061293d9190613e7b565b610a44576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f74207375636365656400000000000000000000000000000000000000000000606482015260840161088a565b6129d38383612f42565b6129e06000848484612d34565b610a44576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e7465720000000000000000000000000000606482015260840161088a565b8273ffffffffffffffffffffffffffffffffffffffff16612a8c8261113c565b73ffffffffffffffffffffffffffffffffffffffff1614612b2f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f4552433732313a207472616e73666572206f6620746f6b656e2074686174206960448201527f73206e6f74206f776e0000000000000000000000000000000000000000000000606482015260840161088a565b73ffffffffffffffffffffffffffffffffffffffff8216612bd1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f2061646460448201527f7265737300000000000000000000000000000000000000000000000000000000606482015260840161088a565b612bdc838383613110565b612be7600082611f33565b73ffffffffffffffffffffffffffffffffffffffff83166000908152600360205260408120805460019290612c1d908490613da1565b909155505073ffffffffffffffffffffffffffffffffffffffff82166000908152600360205260408120805460019290612c58908490613d21565b909155505060008181526002602052604080822080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff86811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b60405173ffffffffffffffffffffffffffffffffffffffff8316602482015260448101829052610a449084907fa9059cbb000000000000000000000000000000000000000000000000000000009060640161202f565b600073ffffffffffffffffffffffffffffffffffffffff84163b15612f28576040517f150b7a0200000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff85169063150b7a0290612dab903390899088908890600401613e98565b602060405180830381600087803b158015612dc557600080fd5b505af1925050508015612e13575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201909252612e1091810190613ee1565b60015b612edd573d808015612e41576040519150601f19603f3d011682016040523d82523d6000602084013e612e46565b606091505b508051612ed5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e7465720000000000000000000000000000606482015260840161088a565b805181602001fd5b7fffffffff00000000000000000000000000000000000000000000000000000000167f150b7a0200000000000000000000000000000000000000000000000000000000149050611a84565b506001949350505050565b6060611a848484600085613216565b73ffffffffffffffffffffffffffffffffffffffff8216612fbf576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f2061646472657373604482015260640161088a565b60008181526002602052604090205473ffffffffffffffffffffffffffffffffffffffff161561304b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000604482015260640161088a565b61305760008383613110565b73ffffffffffffffffffffffffffffffffffffffff8216600090815260036020526040812080546001929061308d908490613d21565b909155505060008181526002602052604080822080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b73ffffffffffffffffffffffffffffffffffffffff83166131785761317381600b80546000838152600c60205260408120829055600182018355919091527f0175b7a638427703f0dbe7bb9bbf987a2551717b34e79f33b5b1008d1fa01db90155565b6131b5565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16146131b5576131b5838261338b565b73ffffffffffffffffffffffffffffffffffffffff82166131d957610a4481613442565b8273ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614610a4457610a4482826134f1565b6060824710156132a8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f60448201527f722063616c6c0000000000000000000000000000000000000000000000000000606482015260840161088a565b843b613310576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015260640161088a565b6000808673ffffffffffffffffffffffffffffffffffffffff1685876040516133399190613efe565b60006040518083038185875af1925050503d8060008114613376576040519150601f19603f3d011682016040523d82523d6000602084013e61337b565b606091505b5091509150610cc8828286613542565b60006001613398846111ee565b6133a29190613da1565b6000838152600a60205260409020549091508082146134025773ffffffffffffffffffffffffffffffffffffffff841660009081526009602090815260408083208584528252808320548484528184208190558352600a90915290208190555b506000918252600a6020908152604080842084905573ffffffffffffffffffffffffffffffffffffffff9094168352600981528383209183525290812055565b600b5460009061345490600190613da1565b6000838152600c6020526040812054600b805493945090928490811061347c5761347c613d39565b9060005260206000200154905080600b838154811061349d5761349d613d39565b6000918252602080832090910192909255828152600c9091526040808220849055858252812055600b8054806134d5576134d5613f1a565b6001900381819060005260206000200160009055905550505050565b60006134fc836111ee565b73ffffffffffffffffffffffffffffffffffffffff90931660009081526009602090815260408083208684528252808320859055938252600a9052919091209190915550565b60608315613551575081611db2565b8251156135615782518084602001fd5b816040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161088a919061366f565b6000602082840312156135a757600080fd5b5035919050565b7fffffffff0000000000000000000000000000000000000000000000000000000081168114610f3657600080fd5b6000602082840312156135ee57600080fd5b8135611db2816135ae565b60005b838110156136145781810151838201526020016135fc565b83811115611c965750506000910152565b6000815180845261363d8160208601602086016135f9565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b602081526000611db26020830184613625565b73ffffffffffffffffffffffffffffffffffffffff81168114610f3657600080fd5b600080604083850312156136b757600080fd5b82356136c281613682565b946020939093013593505050565b8015158114610f3657600080fd5b600080600080600080600060e0888a0312156136f957600080fd5b873561370481613682565b9650602088013561371481613682565b955060408801359450606088013593506080880135925060a0880135915060c0880135613740816136d0565b8091505092959891949750929550565b60008060006060848603121561376557600080fd5b833561377081613682565b9250602084013561378081613682565b929592945050506040919091013590565b6000602082840312156137a357600080fd5b8135611db281613682565b60008083601f8401126137c057600080fd5b50813567ffffffffffffffff8111156137d857600080fd5b6020830191508360208260051b85010111156137f357600080fd5b9250929050565b600080600080600080600080600060e08a8c03121561381857600080fd5b893567ffffffffffffffff8082111561383057600080fd5b61383c8d838e016137ae565b909b50995060208c0135915061385182613682565b90975060408b0135908082111561386757600080fd5b506138748c828d016137ae565b90975095505060608a0135935060808a0135925060a08a0135915060c08a013561389d816136d0565b809150509295985092959850929598565b600081518084526020808501945080840160005b838110156138de578151875295820195908201906001016138c2565b509495945050505050565b602081526000611db260208301846138ae565b600081518084526020808501945080840160005b838110156138de578151151587529582019590820190600101613910565b60006101208083526139428184018d6138ae565b9050602083820381850152818c518084528284019150828e01935060005b8181101561399257845173ffffffffffffffffffffffffffffffffffffffff1683529383019391830191600101613960565b505084810360408601526139a6818d6138ae565b9250505082810360608401526139bc818a6138ae565b905082810360808401526139d081896138ae565b905082810360a08401526139e481886138ae565b905082810360c08401526139f881876138ae565b905082810360e0840152613a0c81866138ae565b9050828103610100840152613a2181856138fc565b9c9b505050505050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff81118282101715613aa757613aa7613a31565b604052919050565b60006020808385031215613ac257600080fd5b823567ffffffffffffffff80821115613ada57600080fd5b818501915085601f830112613aee57600080fd5b813581811115613b0057613b00613a31565b8060051b9150613b11848301613a60565b8181529183018401918481019088841115613b2b57600080fd5b938501935b83851015613b4957843582529385019390850190613b30565b98975050505050505050565b60008060408385031215613b6857600080fd5b8235613b7381613682565b91506020830135613b83816136d0565b809150509250929050565b60008060008060808587031215613ba457600080fd5b8435613baf81613682565b9350602085810135613bc081613682565b935060408601359250606086013567ffffffffffffffff80821115613be457600080fd5b818801915088601f830112613bf857600080fd5b813581811115613c0a57613c0a613a31565b613c3a847fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f84011601613a60565b91508082528984828501011115613c5057600080fd5b808484018584013760008482840101525080935050505092959194509250565b60008060408385031215613c8357600080fd5b8235613c8e81613682565b91506020830135613b8381613682565b600181811c90821680613cb257607f821691505b60208210811415613cec577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60008219821115613d3457613d34613cf2565b500190565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415613d9a57613d9a613cf2565b5060010190565b600082821015613db357613db3613cf2565b500390565b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615613df057613df0613cf2565b500290565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600082613e3357613e33613df5565b500490565b60008351613e4a8184602088016135f9565b835190830190613e5e8183602088016135f9565b01949350505050565b600082613e7657613e76613df5565b500690565b600060208284031215613e8d57600080fd5b8151611db2816136d0565b600073ffffffffffffffffffffffffffffffffffffffff808716835280861660208401525083604083015260806060830152613ed76080830184613625565b9695505050505050565b600060208284031215613ef357600080fd5b8151611db2816135ae565b60008251613f108184602087016135f9565b9190910192915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fdfea26469706673582212207c6e5b8f2a7d944a5b23a45cd828478951f3a0468a648423ea054768dac1ec1364736f6c63430008090033"
    };
});
define("@scom/scom-investor-claim/contracts/oswap-drip-contract/contracts/Drip.ts", ["require", "exports", "@ijstech/eth-contract", "@scom/scom-investor-claim/contracts/oswap-drip-contract/contracts/Drip.json.ts"], function (require, exports, eth_contract_3, Drip_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Drip = void 0;
    class Drip extends eth_contract_3.Contract {
        constructor(wallet, address) {
            super(wallet, address, Drip_json_1.default.abi, Drip_json_1.default.bytecode);
            this.assign();
        }
        deploy(params, options) {
            return this.__deploy([params.name, params.symbol], options);
        }
        parseApprovalEvent(receipt) {
            return this.parseEvents(receipt, "Approval").map(e => this.decodeApprovalEvent(e));
        }
        decodeApprovalEvent(event) {
            let result = event.data;
            return {
                owner: result.owner,
                approved: result.approved,
                tokenId: new eth_contract_3.BigNumber(result.tokenId),
                _event: event
            };
        }
        parseApprovalForAllEvent(receipt) {
            return this.parseEvents(receipt, "ApprovalForAll").map(e => this.decodeApprovalForAllEvent(e));
        }
        decodeApprovalForAllEvent(event) {
            let result = event.data;
            return {
                owner: result.owner,
                operator: result.operator,
                approved: result.approved,
                _event: event
            };
        }
        parseAuthorizeEvent(receipt) {
            return this.parseEvents(receipt, "Authorize").map(e => this.decodeAuthorizeEvent(e));
        }
        decodeAuthorizeEvent(event) {
            let result = event.data;
            return {
                user: result.user,
                _event: event
            };
        }
        parseDeauthorizeEvent(receipt) {
            return this.parseEvents(receipt, "Deauthorize").map(e => this.decodeDeauthorizeEvent(e));
        }
        decodeDeauthorizeEvent(event) {
            let result = event.data;
            return {
                user: result.user,
                _event: event
            };
        }
        parseDripEvent(receipt) {
            return this.parseEvents(receipt, "Drip").map(e => this.decodeDripEvent(e));
        }
        decodeDripEvent(event) {
            let result = event.data;
            return {
                id: new eth_contract_3.BigNumber(result.id),
                amount: new eth_contract_3.BigNumber(result.amount),
                totalClaimed: new eth_contract_3.BigNumber(result.totalClaimed),
                totalAmount: new eth_contract_3.BigNumber(result.totalAmount),
                _event: event
            };
        }
        parseLockEvent(receipt) {
            return this.parseEvents(receipt, "Lock").map(e => this.decodeLockEvent(e));
        }
        decodeLockEvent(event) {
            let result = event.data;
            return {
                id: new eth_contract_3.BigNumber(result.id),
                recipient: result.recipient,
                token: result.token,
                amount: new eth_contract_3.BigNumber(result.amount),
                startDate: new eth_contract_3.BigNumber(result.startDate),
                endDate: new eth_contract_3.BigNumber(result.endDate),
                campaignId: new eth_contract_3.BigNumber(result.campaignId),
                ownerFrozen: result.ownerFrozen,
                _event: event
            };
        }
        parseStartOwnershipTransferEvent(receipt) {
            return this.parseEvents(receipt, "StartOwnershipTransfer").map(e => this.decodeStartOwnershipTransferEvent(e));
        }
        decodeStartOwnershipTransferEvent(event) {
            let result = event.data;
            return {
                user: result.user,
                _event: event
            };
        }
        parseTransferEvent(receipt) {
            return this.parseEvents(receipt, "Transfer").map(e => this.decodeTransferEvent(e));
        }
        decodeTransferEvent(event) {
            let result = event.data;
            return {
                from: result.from,
                to: result.to,
                tokenId: new eth_contract_3.BigNumber(result.tokenId),
                _event: event
            };
        }
        parseTransferOwnershipEvent(receipt) {
            return this.parseEvents(receipt, "TransferOwnership").map(e => this.decodeTransferOwnershipEvent(e));
        }
        decodeTransferOwnershipEvent(event) {
            let result = event.data;
            return {
                user: result.user,
                _event: event
            };
        }
        assign() {
            let balanceOf_call = async (owner, options) => {
                let result = await this.call('balanceOf', [owner], options);
                return new eth_contract_3.BigNumber(result);
            };
            this.balanceOf = balanceOf_call;
            let campaignId_call = async (param1, options) => {
                let result = await this.call('campaignId', [this.wallet.utils.toString(param1)], options);
                return new eth_contract_3.BigNumber(result);
            };
            this.campaignId = campaignId_call;
            let claimedAmount_call = async (param1, options) => {
                let result = await this.call('claimedAmount', [this.wallet.utils.toString(param1)], options);
                return new eth_contract_3.BigNumber(result);
            };
            this.claimedAmount = claimedAmount_call;
            let endDate_call = async (param1, options) => {
                let result = await this.call('endDate', [this.wallet.utils.toString(param1)], options);
                return new eth_contract_3.BigNumber(result);
            };
            this.endDate = endDate_call;
            let getAllInfo_call = async (owner, options) => {
                let result = await this.call('getAllInfo', [owner], options);
                return {
                    _tokenId: result._tokenId.map(e => new eth_contract_3.BigNumber(e)),
                    _token: result._token,
                    _unclaimedFunds: result._unclaimedFunds.map(e => new eth_contract_3.BigNumber(e)),
                    _claimedAmount: result._claimedAmount.map(e => new eth_contract_3.BigNumber(e)),
                    _totalAmount: result._totalAmount.map(e => new eth_contract_3.BigNumber(e)),
                    _startDate: result._startDate.map(e => new eth_contract_3.BigNumber(e)),
                    _endDate: result._endDate.map(e => new eth_contract_3.BigNumber(e)),
                    _campaignId: result._campaignId.map(e => new eth_contract_3.BigNumber(e)),
                    _ownerFrozen: result._ownerFrozen
                };
            };
            this.getAllInfo = getAllInfo_call;
            let getApproved_call = async (tokenId, options) => {
                let result = await this.call('getApproved', [this.wallet.utils.toString(tokenId)], options);
                return result;
            };
            this.getApproved = getApproved_call;
            let getInfo_call = async (id, options) => {
                let result = await this.call('getInfo', [this.wallet.utils.toString(id)], options);
                return {
                    _recipient: result._recipient,
                    _token: result._token,
                    _unclaimedFunds: new eth_contract_3.BigNumber(result._unclaimedFunds),
                    _claimedAmount: new eth_contract_3.BigNumber(result._claimedAmount),
                    _totalAmount: new eth_contract_3.BigNumber(result._totalAmount),
                    _startDate: new eth_contract_3.BigNumber(result._startDate),
                    _endDate: new eth_contract_3.BigNumber(result._endDate),
                    _campaignId: new eth_contract_3.BigNumber(result._campaignId),
                    _ownerFrozen: result._ownerFrozen
                };
            };
            this.getInfo = getInfo_call;
            let isApprovedForAllParams = (params) => [params.owner, params.operator];
            let isApprovedForAll_call = async (params, options) => {
                let result = await this.call('isApprovedForAll', isApprovedForAllParams(params), options);
                return result;
            };
            this.isApprovedForAll = isApprovedForAll_call;
            let isPermitted_call = async (param1, options) => {
                let result = await this.call('isPermitted', [param1], options);
                return new eth_contract_3.BigNumber(result);
            };
            this.isPermitted = isPermitted_call;
            let maximumAllowedClaimedFunds_call = async (id, options) => {
                let result = await this.call('maximumAllowedClaimedFunds', [this.wallet.utils.toString(id)], options);
                return new eth_contract_3.BigNumber(result);
            };
            this.maximumAllowedClaimedFunds = maximumAllowedClaimedFunds_call;
            let name_call = async (options) => {
                let result = await this.call('name', [], options);
                return result;
            };
            this.name = name_call;
            let newOwner_call = async (options) => {
                let result = await this.call('newOwner', [], options);
                return result;
            };
            this.newOwner = newOwner_call;
            let owner_call = async (options) => {
                let result = await this.call('owner', [], options);
                return result;
            };
            this.owner = owner_call;
            let ownerFrozen_call = async (param1, options) => {
                let result = await this.call('ownerFrozen', [this.wallet.utils.toString(param1)], options);
                return result;
            };
            this.ownerFrozen = ownerFrozen_call;
            let ownerOf_call = async (tokenId, options) => {
                let result = await this.call('ownerOf', [this.wallet.utils.toString(tokenId)], options);
                return result;
            };
            this.ownerOf = ownerOf_call;
            let startDate_call = async (param1, options) => {
                let result = await this.call('startDate', [this.wallet.utils.toString(param1)], options);
                return new eth_contract_3.BigNumber(result);
            };
            this.startDate = startDate_call;
            let supportsInterface_call = async (interfaceId, options) => {
                let result = await this.call('supportsInterface', [interfaceId], options);
                return result;
            };
            this.supportsInterface = supportsInterface_call;
            let symbol_call = async (options) => {
                let result = await this.call('symbol', [], options);
                return result;
            };
            this.symbol = symbol_call;
            let timelockCount_call = async (options) => {
                let result = await this.call('timelockCount', [], options);
                return new eth_contract_3.BigNumber(result);
            };
            this.timelockCount = timelockCount_call;
            let token_call = async (param1, options) => {
                let result = await this.call('token', [this.wallet.utils.toString(param1)], options);
                return result;
            };
            this.token = token_call;
            let tokenByIndex_call = async (index, options) => {
                let result = await this.call('tokenByIndex', [this.wallet.utils.toString(index)], options);
                return new eth_contract_3.BigNumber(result);
            };
            this.tokenByIndex = tokenByIndex_call;
            let tokenOfOwnerByIndexParams = (params) => [params.owner, this.wallet.utils.toString(params.index)];
            let tokenOfOwnerByIndex_call = async (params, options) => {
                let result = await this.call('tokenOfOwnerByIndex', tokenOfOwnerByIndexParams(params), options);
                return new eth_contract_3.BigNumber(result);
            };
            this.tokenOfOwnerByIndex = tokenOfOwnerByIndex_call;
            let tokenURI_call = async (tokenId, options) => {
                let result = await this.call('tokenURI', [this.wallet.utils.toString(tokenId)], options);
                return result;
            };
            this.tokenURI = tokenURI_call;
            let totalAmount_call = async (param1, options) => {
                let result = await this.call('totalAmount', [this.wallet.utils.toString(param1)], options);
                return new eth_contract_3.BigNumber(result);
            };
            this.totalAmount = totalAmount_call;
            let totalSupply_call = async (options) => {
                let result = await this.call('totalSupply', [], options);
                return new eth_contract_3.BigNumber(result);
            };
            this.totalSupply = totalSupply_call;
            let approveParams = (params) => [params.to, this.wallet.utils.toString(params.tokenId)];
            let approve_send = async (params, options) => {
                let result = await this.send('approve', approveParams(params), options);
                return result;
            };
            let approve_call = async (params, options) => {
                let result = await this.call('approve', approveParams(params), options);
                return;
            };
            this.approve = Object.assign(approve_send, {
                call: approve_call
            });
            let claim_send = async (id, options) => {
                let result = await this.send('claim', [this.wallet.utils.toString(id)], options);
                return result;
            };
            let claim_call = async (id, options) => {
                let result = await this.call('claim', [this.wallet.utils.toString(id)], options);
                return;
            };
            this.claim = Object.assign(claim_send, {
                call: claim_call
            });
            let claimMultiple_send = async (ids, options) => {
                let result = await this.send('claimMultiple', [this.wallet.utils.toString(ids)], options);
                return result;
            };
            let claimMultiple_call = async (ids, options) => {
                let result = await this.call('claimMultiple', [this.wallet.utils.toString(ids)], options);
                return;
            };
            this.claimMultiple = Object.assign(claimMultiple_send, {
                call: claimMultiple_call
            });
            let deny_send = async (user, options) => {
                let result = await this.send('deny', [user], options);
                return result;
            };
            let deny_call = async (user, options) => {
                let result = await this.call('deny', [user], options);
                return;
            };
            this.deny = Object.assign(deny_send, {
                call: deny_call
            });
            let lockParams = (params) => [params.recipient, params.token, this.wallet.utils.toString(params.amount), this.wallet.utils.toString(params.startDate), this.wallet.utils.toString(params.endDate), this.wallet.utils.toString(params.campaignId), params.ownerFrozen];
            let lock_send = async (params, options) => {
                let result = await this.send('lock', lockParams(params), options);
                return result;
            };
            let lock_call = async (params, options) => {
                let result = await this.call('lock', lockParams(params), options);
                return new eth_contract_3.BigNumber(result);
            };
            this.lock = Object.assign(lock_send, {
                call: lock_call
            });
            let lockMultipleParams = (params) => [params.recipient, params.token, this.wallet.utils.toString(params.amount), this.wallet.utils.toString(params.startDate), this.wallet.utils.toString(params.endDate), this.wallet.utils.toString(params.campaignId), params.ownerFrozen];
            let lockMultiple_send = async (params, options) => {
                let result = await this.send('lockMultiple', lockMultipleParams(params), options);
                return result;
            };
            let lockMultiple_call = async (params, options) => {
                let result = await this.call('lockMultiple', lockMultipleParams(params), options);
                return result.map(e => new eth_contract_3.BigNumber(e));
            };
            this.lockMultiple = Object.assign(lockMultiple_send, {
                call: lockMultiple_call
            });
            let permit_send = async (user, options) => {
                let result = await this.send('permit', [user], options);
                return result;
            };
            let permit_call = async (user, options) => {
                let result = await this.call('permit', [user], options);
                return;
            };
            this.permit = Object.assign(permit_send, {
                call: permit_call
            });
            let safeTransferFromParams = (params) => [params.from, params.to, this.wallet.utils.toString(params.tokenId)];
            let safeTransferFrom_send = async (params, options) => {
                let result = await this.send('safeTransferFrom', safeTransferFromParams(params), options);
                return result;
            };
            let safeTransferFrom_call = async (params, options) => {
                let result = await this.call('safeTransferFrom', safeTransferFromParams(params), options);
                return;
            };
            this.safeTransferFrom = Object.assign(safeTransferFrom_send, {
                call: safeTransferFrom_call
            });
            let safeTransferFrom_1Params = (params) => [params.from, params.to, this.wallet.utils.toString(params.tokenId), this.wallet.utils.stringToBytes(params.data)];
            let safeTransferFrom_1_send = async (params, options) => {
                let result = await this.send('safeTransferFrom', safeTransferFrom_1Params(params), options);
                return result;
            };
            let safeTransferFrom_1_call = async (params, options) => {
                let result = await this.call('safeTransferFrom', safeTransferFrom_1Params(params), options);
                return;
            };
            this.safeTransferFrom_1 = Object.assign(safeTransferFrom_1_send, {
                call: safeTransferFrom_1_call
            });
            let setApprovalForAllParams = (params) => [params.operator, params.approved];
            let setApprovalForAll_send = async (params, options) => {
                let result = await this.send('setApprovalForAll', setApprovalForAllParams(params), options);
                return result;
            };
            let setApprovalForAll_call = async (params, options) => {
                let result = await this.call('setApprovalForAll', setApprovalForAllParams(params), options);
                return;
            };
            this.setApprovalForAll = Object.assign(setApprovalForAll_send, {
                call: setApprovalForAll_call
            });
            let takeOwnership_send = async (options) => {
                let result = await this.send('takeOwnership', [], options);
                return result;
            };
            let takeOwnership_call = async (options) => {
                let result = await this.call('takeOwnership', [], options);
                return;
            };
            this.takeOwnership = Object.assign(takeOwnership_send, {
                call: takeOwnership_call
            });
            let transferFromParams = (params) => [params.from, params.to, this.wallet.utils.toString(params.tokenId)];
            let transferFrom_send = async (params, options) => {
                let result = await this.send('transferFrom', transferFromParams(params), options);
                return result;
            };
            let transferFrom_call = async (params, options) => {
                let result = await this.call('transferFrom', transferFromParams(params), options);
                return;
            };
            this.transferFrom = Object.assign(transferFrom_send, {
                call: transferFrom_call
            });
            let transferOwnership_send = async (newOwner, options) => {
                let result = await this.send('transferOwnership', [newOwner], options);
                return result;
            };
            let transferOwnership_call = async (newOwner, options) => {
                let result = await this.call('transferOwnership', [newOwner], options);
                return;
            };
            this.transferOwnership = Object.assign(transferOwnership_send, {
                call: transferOwnership_call
            });
        }
    }
    Drip._abi = Drip_json_1.default.abi;
    exports.Drip = Drip;
});
define("@scom/scom-investor-claim/contracts/oswap-drip-contract/contracts/index.ts", ["require", "exports", "@scom/scom-investor-claim/contracts/oswap-drip-contract/contracts/@openzeppelin/contracts/token/ERC721/ERC721.ts", "@scom/scom-investor-claim/contracts/oswap-drip-contract/contracts/Authorization.ts", "@scom/scom-investor-claim/contracts/oswap-drip-contract/contracts/Drip.ts"], function (require, exports, ERC721_1, Authorization_1, Drip_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Drip = exports.Authorization = exports.ERC721 = void 0;
    Object.defineProperty(exports, "ERC721", { enumerable: true, get: function () { return ERC721_1.ERC721; } });
    Object.defineProperty(exports, "Authorization", { enumerable: true, get: function () { return Authorization_1.Authorization; } });
    Object.defineProperty(exports, "Drip", { enumerable: true, get: function () { return Drip_1.Drip; } });
});
define("@scom/scom-investor-claim/contracts/oswap-drip-contract/index.ts", ["require", "exports", "@scom/scom-investor-claim/contracts/oswap-drip-contract/contracts/index.ts"], function (require, exports, Contracts) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Contracts = void 0;
    ///<amd-module name='@scom/scom-investor-claim/contracts/oswap-drip-contract/index.ts'/> 
    exports.Contracts = Contracts;
});
define("@scom/scom-investor-claim/claim-utils/index.ts", ["require", "exports", "@ijstech/eth-wallet", "@scom/scom-investor-claim/contracts/oswap-drip-contract/index.ts", "@scom/scom-investor-claim/store/index.ts"], function (require, exports, eth_wallet_4, index_2, index_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.investorClaimToken = exports.getLatestInvestorClaimTokenInfo = exports.getInvestorClaimInfo = void 0;
    const getInvestorClaimInfo = async (campaign) => {
        if (!campaign)
            return undefined;
        const extendedInfo = await getInvestorClaimExtendedInfo(campaign.dripAddress);
        return Object.assign(Object.assign({}, campaign), extendedInfo);
    };
    exports.getInvestorClaimInfo = getInvestorClaimInfo;
    const getInvestorClaimExtendedInfo = async (dripAddress) => {
        const zeroAmounts = {
            claimable: '0',
            lockedAmount: '0'
        };
        try {
            const wallet = (0, index_3.getRpcWallet)();
            const currentAddress = wallet.address;
            const drip = new index_2.Contracts.Drip(wallet, dripAddress);
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
    const getLatestInvestorClaimTokenInfo = async (dripAddress, lockId) => {
        let wallet = (0, index_3.getRpcWallet)();
        let drip = new index_2.Contracts.Drip(wallet, dripAddress);
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
            let wallet = (0, index_3.getRpcWallet)();
            let drip = new index_2.Contracts.Drip(wallet, contractAddress);
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
define("@scom/scom-investor-claim/alert/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_3.Styles.Theme.ThemeVars;
    exports.default = components_3.Styles.style({
        textAlign: 'center',
        $nest: {
            'i-label > *': {
                fontSize: '.875rem'
            },
            '.modal': {
                minWidth: '25%',
                maxWidth: '100%',
                width: 455,
                background: Theme.background.modal,
                borderRadius: 12
            },
            '.i-modal-close svg': {
                fill: '#F05E61'
            },
            '.i-modal_content': {
                padding: '0 2.563rem 1.5rem'
            },
            '.i-modal_header': {
                borderBottom: 'none !important'
            },
            '.waiting-txt > *': {
                color: '#F6C958',
                fontSize: '1.125rem'
            },
            '.confirm-txt > *': {
                color: '#C2C3CB'
            },
            '.red-link *': {
                color: '#FD4A4C',
                textDecoration: 'none'
            },
            '.mb-1': {
                marginBottom: '1rem'
            },
            'i-button': {
                padding: '1rem 2rem',
                textAlign: 'center'
            },
            '.btn-os': {
                background: 'transparent linear-gradient(90deg, #AC1D78 0%, #E04862 100%) 0% 0% no-repeat padding-box',
                fontFamily: 'Raleway Bold',
                fontSize: '1rem',
                fontWeight: 'bold',
                color: '#fff'
                // color: Theme.colors.primary.contrastText
            }
        }
    });
});
define("@scom/scom-investor-claim/alert/index.tsx", ["require", "exports", "@ijstech/components", "@ijstech/eth-wallet", "@scom/scom-investor-claim/global/index.ts", "@scom/scom-investor-claim/alert/index.css.ts", "@scom/scom-investor-claim/assets.ts"], function (require, exports, components_4, eth_wallet_5, index_4, index_css_1, assets_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Alert = void 0;
    const Theme = components_4.Styles.Theme.ThemeVars;
    ;
    let Alert = class Alert extends components_4.Module {
        get message() {
            return this._message;
        }
        set message(value) {
            this._message = value;
            this.renderUI();
        }
        constructor(parent, options) {
            super(parent, options);
        }
        ;
        async init() {
            this.classList.add(index_css_1.default);
            super.init();
        }
        closeModal() {
            this.confirmModal.visible = false;
        }
        showModal() {
            this.confirmModal.visible = true;
        }
        async buildLink() {
            if (this.message.txtHash) {
                const chainId = await eth_wallet_5.Wallet.getClientInstance().getChainId();
                (0, index_4.viewOnExplorerByTxHash)(chainId, this.message.txtHash);
            }
        }
        async renderUI() {
            this.mainContent.innerHTML = '';
            const mainSection = await components_4.VStack.create({
                horizontalAlignment: 'center'
            });
            if (this.message.status === 'warning') {
                mainSection.id = 'warningSection';
                const loading = (this.$render("i-panel", { height: 100 },
                    this.$render("i-vstack", { id: "loadingElm", class: "i-loading-overlay", height: "100%", background: { color: "transparent" } },
                        this.$render("i-vstack", { class: "i-loading-spinner", horizontalAlignment: "center", verticalAlignment: "center" },
                            this.$render("i-icon", { class: "i-loading-spinner_icon", image: { url: assets_2.default.fullPath('img/loading.svg'), width: 24, height: 24 } }),
                            this.$render("i-label", { caption: "Loading...", font: { color: '#FD4A4C' }, class: "i-loading-spinner_text" })))));
                mainSection.appendChild(loading);
                const section = new components_4.VStack();
                section.margin = { bottom: 20 };
                const captionList = ['Waiting For Confirmation', this.message.content || '', 'Confirm this transaction in your wallet'];
                const classList = ['waiting-txt mb-1', 'mb-1', 'confirm-txt'];
                for (let i = 0; i < captionList.length; i++) {
                    const caption = captionList[i];
                    const label = await components_4.Label.create();
                    label.caption = caption;
                    if (classList[i]) {
                        const classes = classList[i].split(' ');
                        classes.forEach(className => label.classList.add(className));
                    }
                    section.appendChild(label);
                }
                ;
                mainSection.appendChild(section);
            }
            else if (this.message.status === 'success') {
                const image = await components_4.Image.create({
                    width: '50px',
                    url: assets_2.default.fullPath('img/success-icon.svg'),
                    display: 'inline-block',
                    margin: { bottom: 16 }
                });
                mainSection.appendChild(image);
                const label = await components_4.Label.create();
                label.caption = 'Transaction Submitted';
                label.classList.add("waiting-txt");
                mainSection.appendChild(label);
                const contentSection = await components_4.Panel.create();
                contentSection.id = 'contentSection';
                mainSection.appendChild(contentSection);
                const contentLabel = await components_4.Label.create({
                    wordBreak: 'break-all'
                });
                contentLabel.caption = this.message.content || '';
                contentSection.appendChild(contentLabel);
                if (this.message.txtHash) {
                    const section = new components_4.VStack();
                    const label1 = await components_4.Label.create({
                        caption: this.message.txtHash.substr(0, 33),
                        margin: { bottom: 4 }
                    });
                    section.appendChild(label1);
                    const label2 = await components_4.Label.create({
                        caption: this.message.txtHash.substr(33, this.message.txtHash.length),
                        margin: { bottom: 16 }
                    });
                    section.appendChild(label2);
                    const link = await components_4.Label.create({
                        caption: 'View on block explorer',
                        display: 'block'
                    });
                    link.onClick = this.buildLink.bind(this);
                    link.classList.add("red-link", "block", "pointer");
                    section.appendChild(link);
                    contentSection.appendChild(section);
                }
                const button = new components_4.Button(mainSection, {
                    width: '100%',
                    caption: 'Close',
                    // font: { color: Theme.colors.primary.contrastText }
                    font: { color: '#fff' },
                    margin: { top: 16 }
                });
                button.classList.add('btn-os');
                button.onClick = () => this.closeModal();
                mainSection.appendChild(button);
            }
            else {
                const image = await components_4.Image.create({
                    width: '50px',
                    url: assets_2.default.fullPath('img/oswap_error.png'),
                    display: 'inline-block',
                    margin: { bottom: 16 }
                });
                mainSection.appendChild(image);
                const label = await components_4.Label.create({
                    caption: 'Transaction Rejected.',
                    margin: { bottom: 16 }
                });
                label.classList.add('waiting-txt');
                mainSection.appendChild(label);
                const section = await components_4.VStack.create();
                section.id = 'contentSection';
                const contentLabel = await components_4.Label.create({
                    caption: await this.onErrMsgChanged(),
                    margin: { bottom: 16 },
                    wordBreak: 'break-word'
                });
                section.appendChild(contentLabel);
                mainSection.appendChild(section);
                const button = new components_4.Button(mainSection, {
                    width: '100%',
                    caption: 'Cancel',
                    // font: { color: Theme.colors.primary.contrastText }
                    font: { color: '#fff' },
                    margin: { top: 16 }
                });
                button.classList.add('btn-os');
                button.onClick = () => this.closeModal();
                mainSection.appendChild(button);
            }
            this.mainContent.clearInnerHTML();
            this.mainContent.appendChild(mainSection);
        }
        async onErrMsgChanged() {
            if (this.message.status !== 'error')
                return this.message.content;
            if (this.message.content.message && this.message.content.message.includes('Internal JSON-RPC error.')) {
                this.message.content.message = JSON.parse(this.message.content.message.replace('Internal JSON-RPC error.\n', '')).message;
            }
            return await (0, index_4.parseContractError)(this.message.content.message, this.message.obj);
        }
        render() {
            return (this.$render("i-modal", { id: "confirmModal", closeIcon: { name: 'times' }, class: "confirm-modal", minHeight: "280px" },
                this.$render("i-panel", { id: "mainContent", class: "i-modal_content" })));
        }
    };
    Alert = __decorate([
        (0, components_4.customElements)('i-scom-claim-alert')
    ], Alert);
    exports.Alert = Alert;
    ;
});
define("@scom/scom-investor-claim/index.css.ts", ["require", "exports", "@ijstech/components", "@scom/scom-investor-claim/assets.ts"], function (require, exports, components_5, assets_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.claimComponent = exports.claimDappContainer = void 0;
    const Theme = components_5.Styles.Theme.ThemeVars;
    const colorVar = {
        primaryButton: 'transparent linear-gradient(90deg, #AC1D78 0%, #E04862 100%) 0% 0% no-repeat padding-box',
        primaryGradient: 'linear-gradient(255deg,#f15e61,#b52082)',
        darkBg: '#181E3E 0% 0% no-repeat padding-box',
        primaryDisabled: 'transparent linear-gradient(270deg,#351f52,#552a42) 0% 0% no-repeat padding-box !important'
    };
    components_5.Styles.fontFace({
        fontFamily: "Montserrat Regular",
        src: `url("${assets_3.default.fullPath('fonts/montserrat/Montserrat-Regular.ttf')}") format("truetype")`,
        fontWeight: 'nomal',
        fontStyle: 'normal'
    });
    components_5.Styles.fontFace({
        fontFamily: "Raleway Bold",
        src: `url("${assets_3.default.fullPath('fonts/raleway/Raleway-Bold.ttf')}") format("truetype")`,
        fontWeight: 'bold',
        fontStyle: 'normal'
    });
    exports.claimDappContainer = components_5.Styles.style({
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
    exports.claimComponent = components_5.Styles.style({
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
                isMainChain: true,
                isCrossChainSupported: true,
                explorerName: 'BSCScan',
                explorerTxUrl: 'https://testnet.bscscan.com/tx/',
                explorerAddressUrl: 'https://testnet.bscscan.com/address/',
                isTestnet: true
            },
            {
                chainId: 43113,
                shortName: 'AVAX Testnet',
                isCrossChainSupported: true,
                explorerName: 'SnowTrace',
                explorerTxUrl: 'https://testnet.snowtrace.io/tx/',
                explorerAddressUrl: 'https://testnet.snowtrace.io/address/',
                isTestnet: true
            }
        ],
        defaultBuilderData: {
            defaultChainId: 43113,
            campaigns: [
                {
                    chainId: 97,
                    campaignName: 'Claim OSWAP',
                    campaignDesc: 'Thank you for supporting OpenSwap as an early stage backer',
                    dripAddress: '0xFc28280774317326229aCC97C830ad77348fa1eF'
                },
                {
                    campaignId: 1,
                    campaignName: 'Backer Claim',
                    campaignDesc: 'Thank you for supporting OpenSwap as an early stage backer.',
                    vestingPeriod: '24 Months',
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
define("@scom/scom-investor-claim/formSchema.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-investor-claim/formSchema.json.ts'/> 
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
                                    enum: [1, 56, 137, 250, 97, 80001, 43113, 43114],
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
define("@scom/scom-investor-claim", ["require", "exports", "@ijstech/components", "@ijstech/eth-wallet", "@scom/scom-investor-claim/assets.ts", "@scom/scom-investor-claim/global/index.ts", "@scom/scom-investor-claim/store/index.ts", "@scom/scom-investor-claim/claim-utils/index.ts", "@scom/scom-investor-claim/alert/index.tsx", "@scom/scom-investor-claim/index.css.ts", "@scom/scom-token-list", "@scom/scom-investor-claim/data.json.ts", "@scom/scom-investor-claim/formSchema.json.ts"], function (require, exports, components_6, eth_wallet_6, assets_4, index_5, index_6, index_7, index_8, index_css_2, scom_token_list_1, data_json_1, formSchema_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_6.Styles.Theme.ThemeVars;
    let ScomInvertorClaim = class ScomInvertorClaim extends components_6.Module {
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
                                this.refreshUI();
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(this._data);
                            },
                            undo: async () => {
                                this._data = Object.assign({}, _oldData);
                                this.refreshUI();
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(this._data);
                            },
                            redo: () => { }
                        };
                    },
                    userInputDataSchema: formSchema_json_1.default.general.dataSchema,
                    userInputUISchema: formSchema_json_1.default.general.uiSchema
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
                    userInputDataSchema: formSchema_json_1.default.theme.dataSchema
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
        async setData(value) {
            var _a;
            this._data = value;
            const rpcWalletId = (0, index_6.initRpcWallet)(this.defaultChainId);
            const rpcWallet = (0, index_6.getRpcWallet)();
            const event = rpcWallet.registerWalletEvent(this, eth_wallet_6.Constants.RpcWalletEvent.Connected, async (connected) => {
                await this.initializeWidgetConfig();
            });
            this.rpcWalletEvents.push(event);
            const data = {
                defaultChainId: this.defaultChainId,
                wallets: this.wallets,
                networks: this.networks,
                showHeader: this.showHeader,
                rpcWalletId: rpcWallet.instanceId
            };
            if ((_a = this.dappContainer) === null || _a === void 0 ? void 0 : _a.setData)
                this.dappContainer.setData(data);
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
            const chainId = (0, index_6.getChainId)();
            return (_a = this._data.campaigns) === null || _a === void 0 ? void 0 : _a.find(v => v.chainId === chainId && v.dripAddress);
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
            this.clientEvents = [];
            this.symbol = 'OSWAP'; // TODO - Change this by the token address that is taken from the API
            this.registerEvent = () => {
                this.clientEvents.push(this.$eventBus.register(this, "chainChanged" /* EventId.chainChanged */, this.onChainChanged));
            };
            this.onChainChanged = async () => {
                this.initializeWidgetConfig();
            };
            this.refreshUI = () => {
                this.initializeWidgetConfig();
            };
            this.initializeWidgetConfig = async (hideLoading) => {
                setTimeout(async () => {
                    if (!hideLoading && this.loadingElm) {
                        this.loadingElm.visible = true;
                    }
                    if (!(0, index_6.isClientWalletConnected)() || !this._data || !this.checkValidation()) {
                        await this.renderEmpty();
                        return;
                    }
                    scom_token_list_1.tokenStore.updateTokenMapData((0, index_6.getChainId)());
                    const rpcWallet = (0, index_6.getRpcWallet)();
                    if (rpcWallet.address) {
                        scom_token_list_1.tokenStore.updateAllTokenBalances(rpcWallet);
                    }
                    await eth_wallet_6.Wallet.getClientInstance().init();
                    this.campaign = await (0, index_7.getInvestorClaimInfo)(this.campaignInfo);
                    await this.renderCampaign(hideLoading);
                    if (!hideLoading && this.loadingElm) {
                        this.loadingElm.visible = false;
                    }
                });
            };
            this.showMessage = (status, content) => {
                if (!this.claimAlert)
                    return;
                let params = { status };
                if (status === 'success') {
                    params.txtHash = content;
                }
                else {
                    params.content = content;
                }
                this.claimAlert.message = Object.assign({}, params);
                this.claimAlert.showModal();
            };
            this.onClaim = async (btnClaim, data) => {
                if (!(0, index_6.isClientWalletConnected)() || !(0, index_6.isRpcWalletConnected)()) {
                    this.connectWallet();
                    return;
                }
                if (!data)
                    return;
                this.showMessage('warning', `Claiming ${(0, index_5.formatNumber)(data.claimable)} ${this.symbol}`);
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
                (0, index_5.registerSendTxEvents)({
                    transactionHash: callBack,
                    confirmation: confirmationCallBack
                });
                (0, index_7.investorClaimToken)(data.dripAddress, data.lockId, callBack);
            };
            this.checkValidation = () => {
                var _a;
                if (!((_a = this._data.campaigns) === null || _a === void 0 ? void 0 : _a.length))
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
                if (!(0, index_6.isClientWalletConnected)()) {
                    if (this.mdWallet) {
                        await components_6.application.loadPackage('@scom/scom-wallet-modal', '*');
                        this.mdWallet.networks = this.networks;
                        this.mdWallet.wallets = this.wallets;
                        this.mdWallet.showModal();
                    }
                    return;
                }
                if (!(0, index_6.isRpcWalletConnected)()) {
                    const chainId = (0, index_6.getChainId)();
                    const clientWallet = eth_wallet_6.Wallet.getClientInstance();
                    await clientWallet.switchNetwork(chainId);
                }
            };
            this.initEmptyUI = async () => {
                const isClientConnected = (0, index_6.isClientWalletConnected)();
                this.pnlEmpty.clearInnerHTML();
                this.pnlEmpty.appendChild(this.$render("i-panel", { class: "no-campaign", height: "100%", background: { color: Theme.background.main } },
                    this.$render("i-vstack", { gap: 10, verticalAlignment: "center" },
                        this.$render("i-image", { url: assets_4.default.fullPath('img/claim/TrollTrooper.svg') }),
                        this.$render("i-label", { caption: isClientConnected ? 'No Campaigns' : 'Please connect with your wallet!' }))));
                this.pnlEmpty.visible = true;
            };
            this.renderEmpty = async () => {
                await this.initEmptyUI();
                if (this.loadingElm) {
                    this.loadingElm.visible = false;
                }
            };
            this.renderCampaign = async (hideLoading) => {
                await this.initEmptyUI();
                this.pnlEmpty.visible = false;
                if (!this.campaign) {
                    this.pnlClaimInfo.visible = false;
                    this.pnlEmpty.visible = true;
                    this.removeTimer();
                    return;
                }
                this.removeTimer();
                let info = Object.assign({}, this.campaign);
                const updateClaimTokenInfo = async () => {
                    var _a;
                    if (!((_a = this.campaign) === null || _a === void 0 ? void 0 : _a.lockId))
                        return;
                    const latestInfo = await (0, index_7.getLatestInvestorClaimTokenInfo)(this.campaign.dripAddress, this.campaign.lockId);
                    info = Object.assign(Object.assign({}, latestInfo), info);
                    lbLockedAmount.caption = `${(0, index_5.formatNumber)(info.lockedAmount)} ${this.symbol}`;
                    lbClaimable.caption = `${(0, index_5.formatNumber)(info.claimable)} ${this.symbol}`;
                    const isRpcConnected = (0, index_6.isRpcWalletConnected)();
                    const isClientConnected = (0, index_6.isClientWalletConnected)();
                    btnClaim.caption = !isClientConnected ? 'Connect Wallet' : !isRpcConnected ? 'Switch Network' : 'Claim';
                    btnClaim.enabled = !isClientConnected || !isRpcConnected || (btnClaim.enabled && parseFloat(info.claimable) > 0);
                };
                const lbLockedAmount = await components_6.Label.create({
                    caption: `${(0, index_5.formatNumber)(this.campaign.lockedAmount)} ${this.symbol}`,
                    margin: { left: 'auto' }
                });
                const lbClaimable = await components_6.Label.create({
                    caption: `${(0, index_5.formatNumber)(this.campaign.claimable)} ${this.symbol}`,
                    margin: { left: 'auto' }
                });
                const btnClaim = await components_6.Button.create({
                    caption: !(0, index_6.isClientWalletConnected)() ? 'Connect Wallet' : !(0, index_6.isRpcWalletConnected)() ? 'Switch Network' : 'Claim',
                    rightIcon: { spin: true, visible: false },
                    margin: { top: 8, left: 'auto', right: 'auto' }
                });
                btnClaim.classList.add('btn-os', 'btn-claim');
                if (this.campaign.lockId) {
                    this.listTimer.push(setInterval(updateClaimTokenInfo, 1000));
                }
                let vestingStart = this.campaign.vestingStart ? components_6.moment.unix(this.campaign.vestingStart).format('YYYY-MM-DD HH:mm:ss') : '';
                let vestingEnd = this.campaign.vestingEnd ? components_6.moment.unix(this.campaign.vestingEnd).format('YYYY-MM-DD HH:mm:ss') : '';
                btnClaim.enabled = !(0, index_6.isClientWalletConnected)() || !(0, index_6.isRpcWalletConnected)() || parseFloat(this.campaign.claimable) > 0;
                btnClaim.onClick = () => this.onClaim(btnClaim, info);
                this.pnlClaimInfo.clearInnerHTML();
                this.pnlClaimInfo.appendChild(this.$render("i-vstack", { gap: 10, verticalAlignment: "center" },
                    this.$render("i-vstack", { gap: 8, horizontalAlignment: "center" },
                        this.$render("i-image", { width: 75, height: 75, url: assets_4.default.fullPath('img/tokens/openswap.png'), fallbackUrl: index_6.fallBackUrl }),
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
            if (data_json_1.default)
                (0, index_6.setDataFromConfig)(data_json_1.default);
            this.$eventBus = components_6.application.EventBus;
            this.registerEvent();
        }
        onHide() {
            this.dappContainer.onHide();
            const rpcWallet = (0, index_6.getRpcWallet)();
            for (let event of this.rpcWalletEvents) {
                rpcWallet.unregisterWalletEvent(event);
            }
            this.rpcWalletEvents = [];
            for (let event of this.clientEvents) {
                event.unregister();
            }
            this.clientEvents = [];
        }
        async init() {
            this.isReadyCallbackQueued = true;
            super.init();
            this.claimAlert = new index_8.Alert();
            this.claimComponent.appendChild(this.claimAlert);
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
            return (this.$render("i-scom-dapp-container", { id: "dappContainer", class: index_css_2.claimDappContainer },
                this.$render("i-panel", { id: "claimComponent", class: index_css_2.claimComponent, minHeight: 295 },
                    this.$render("i-panel", { class: "claim-layout", height: "100%", margin: { left: 'auto', right: 'auto' } },
                        this.$render("i-vstack", { id: "loadingElm", class: "i-loading-overlay" },
                            this.$render("i-vstack", { class: "i-loading-spinner", horizontalAlignment: "center", verticalAlignment: "center" },
                                this.$render("i-icon", { class: "i-loading-spinner_icon", image: { url: assets_4.default.fullPath('img/loading.svg'), width: 36, height: 36 } }),
                                this.$render("i-label", { caption: "Loading...", font: { color: '#FD4A4C', size: '1.5em' }, class: "i-loading-spinner_text" }))),
                        this.$render("i-panel", { class: "claim-wapper" },
                            this.$render("i-hstack", { id: "pnlClaimInfo", horizontalAlignment: "center", padding: { top: 10, bottom: 10, left: 16, right: 16 } }),
                            this.$render("i-panel", { id: "pnlEmpty" }))),
                    this.$render("i-scom-wallet-modal", { id: "mdWallet", wallets: [] }))));
        }
    };
    ScomInvertorClaim = __decorate([
        components_6.customModule,
        (0, components_6.customElements)('i-scom-investor-claim')
    ], ScomInvertorClaim);
    exports.default = ScomInvertorClaim;
});
