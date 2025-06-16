export interface BlockNumber {
  blockNumber: number;
}

export interface Block {
  block: BlockData;
}

export interface BlockData {
  _type: string;
  baseFeePerGas: string;
  difficulty: string;
  extraData: string;
  gasLimit: string;
  gasUsed: string;
  blobGasUsed: string | null;
  excessBlobGas: string | null;
  hash: string;
  miner: string;
  prevRandao: string;
  nonce: string;
  number: number;
  parentHash: string;
  timestamp: number;
  parentBeaconBlockRoot: string | null;
  stateRoot: string;
  receiptsRoot: string;
  transactions: string[];
}
