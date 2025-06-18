export interface Balance {
  balance: string;
}

export enum Symbol {
  TCRO = 'TCRO',
  CRO = 'CRO',
  ETH = 'ETH',
}

export interface TokenMetadata {
  name: string;
  symbol: string;
  decimals?: string;
}
