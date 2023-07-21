export default {
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
}