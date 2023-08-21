import { BigNumber, IWallet, Utils, Wallet } from '@ijstech/eth-wallet';
import { Contracts as DripContracts } from '@scom/oswap-drip-contract';
import { ICampaign, ICampaignInfo, IClaimInfoOption } from '../global/index';

const getInvestorClaimInfo = async (wallet: IWallet, campaign: ICampaign) => {
  if (!campaign) return undefined;
  const extendedInfo = await getInvestorClaimExtendedInfo(wallet, campaign.dripAddress);
  return {
    ...campaign,
    ...extendedInfo
  } as ICampaignInfo
}

const getInvestorClaimExtendedInfo = async (wallet: IWallet, dripAddress: string): Promise<IClaimInfoOption> => {
  const zeroAmounts = {
    claimable: '0',
    lockedAmount: '0'
  }

  try {
    const currentAddress = wallet.address;
    const drip = new DripContracts.Drip(wallet, dripAddress);
    const balance = await drip.balanceOf(currentAddress);
    if (balance.gt(0)) {
      const lockId = await drip.tokenOfOwnerByIndex({
        owner: currentAddress,
        index: 0
      });
      let info = await drip.getInfo(lockId);
      if (currentAddress != info._recipient) return zeroAmounts;
      let maxClaimedFundsInWei = await drip.maximumAllowedClaimedFunds(lockId);
      let claimedAmountInWei = await drip.claimedAmount(lockId);
      let claimableInWei = new BigNumber(maxClaimedFundsInWei).minus(claimedAmountInWei).toFixed();
      let claimable = Utils.fromDecimals(claimableInWei).toFixed();
      let lockedAmountInWei = new BigNumber(info._totalAmount).minus(claimedAmountInWei).toFixed();
      let lockedAmount = Utils.fromDecimals(lockedAmountInWei).toFixed();
      let vestingStart = info._startDate.toNumber();
      let vestingEnd = info._endDate.toNumber();
      let obj: IClaimInfoOption = {
        info,
        lockId: lockId.toNumber(),
        claimable,
        lockedAmount,
        vestingStart,
        vestingEnd
      };
      return obj;
    }
    return zeroAmounts
  }
  catch (err) {
    console.log('err', err);
    return zeroAmounts;
  }
}

const getLatestInvestorClaimTokenInfo = async (wallet: IWallet, dripAddress: string, lockId: number) => {
  let drip = new DripContracts.Drip(wallet, dripAddress);
  let info = await drip.getInfo(lockId);
  let maxClaimedFundsInWei = await drip.maximumAllowedClaimedFunds(lockId);
  let claimedAmountInWei = await drip.claimedAmount(lockId);
  let claimableInWei = new BigNumber(maxClaimedFundsInWei).minus(claimedAmountInWei).toFixed();
  let claimable = Utils.fromDecimals(claimableInWei).toFixed();
  let lockedAmountInWei = new BigNumber(info._totalAmount).minus(claimedAmountInWei).toFixed();
  let lockedAmount = Utils.fromDecimals(lockedAmountInWei).toFixed();

  return {
    claimable,
    lockedAmount
  };
}

const investorClaimToken = async (contractAddress: string, id: number, callback?: (err: string | Error) => void) => {
  if (!contractAddress) return;
  try {
    let wallet = Wallet.getClientInstance();
    let drip = new DripContracts.Drip(wallet, contractAddress);
    let receipt = await drip.claim(id);
    return receipt;
  } catch (error) {
    if (callback) callback(error);
  }
}

export {
  getInvestorClaimInfo,
  getLatestInvestorClaimTokenInfo,
  investorClaimToken,
}
