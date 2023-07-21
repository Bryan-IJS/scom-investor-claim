import { IWalletPlugin } from "@scom/scom-wallet-modal";

export interface INetworkConfig {
  chainName?: string;
  chainId: number;
}

export interface ICampaign {
  chainId: number;
  campaignName: string;
  campaignDesc?: string;
  dripAddress: string
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