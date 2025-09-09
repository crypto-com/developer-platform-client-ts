export interface Log {
  _type: string;
  address: string;
  blockHash: string;
  blockNumber: number;
  data: string;
  index: number;
  removed: boolean;
  topics: ReadonlyArray<string>;
  transactionHash: string;
  transactionIndex: number;
}
