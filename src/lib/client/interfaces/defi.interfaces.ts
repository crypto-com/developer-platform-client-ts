export enum DefiProtocol {
  H2 = 'h2finance',
  VVS = 'vvsfinance',
}

export interface WhitelistedToken {
  id: number;
  name: string;
  symbol: string;
  address: string;
  decimal: number;
  link: string;
  isSwappable: boolean;
  logoImagePngUrl: string;
  logoImageSvgUrl: string;
  chain: string;
  chainId: number;
}

export interface TokenInfo {
  id: number;
  symbol: string;
  address: string;
}

export interface Rewarder {
  address: string;
  token: TokenInfo;
  isFinished: boolean;
}

export interface Farm {
  id: number;
  pid: number;
  lpSymbol: string;
  lpAddress: string;
  token: TokenInfo;
  quoteToken: TokenInfo;
  version: string;
  suffix: string | null;
  rewardStartAt: string;
  rewardEndAt: string | null;
  isFinished: boolean;
  isMigrated: boolean;
  isBoostEnable: boolean;
  isBoostFarmExpired: boolean;
  rewarders: Rewarder[] | null;
  chain: string;
  chainId: number;
  baseApr: number;
  baseApy: number;
  lpApr: number;
  lpApy: number;
  rewarderAprs?: Array<{
    rewarder: string;
    apr: number;
  }>;
}
