export interface EthProxyResponse<T> {
  id: number;
  result: T;
  jsonrpc: string;
}

export interface EthProxyTransaction {
  maxFeePerGas: string;
  maxPriorityFeePerGas: string;
  hash: string;
  nonce: string;
  blockHash: string;
  from: string;
  s: string;
  blockNumber: string;
  value: string;
  v: string;
  r: string;
  type: string;
  l1BatchTxIndex: string;
  transactionIndex: string;
  to: string;
  gas: string;
  chainId: string;
  l1BatchNumber: string;
  gasPrice: string;
  input: string;
}

export interface EthProxyTransactionReceipt {
  status: string;
  type: string;
  effectiveGasPrice: string;
  transactionIndex: string;
  from: string;
  logs: EthProxyLogs[];
  l2ToL1Logs: unknown[];
  cumulativeGasUsed: string;
  contractAddress: string;
  transactionHash: string;
  l1BatchNumber: string;
  gasUsed: string;
  blockHash: string;
  l1BatchTxIndex: string;
  root: string;
}

export interface EthProxyLogs {
  blockNumber: string;
  l1BatchNumber: number;
  transactionIndex: string;
  logIndex: string;
  transactionLogIndex: string;
  logType: string;
  blockTimestamp: string;
  topics: string[];
  data: string;
  blockHash: string;
  transactionHash: string;
  removed: boolean;
  address: string;
}

export interface EthProxyBlock {
  size: string;
  parentHash: string;
  logsBloom: string;
  difficulty: string;
  transactions: string[];
  hash: string;
  l1BatchNumber: number;
  mixHash: string;
  gasLimit: string;
  l1BatchTimestamp: number;
  totalDifficulty: string;
  uncles: string[];
  sha3Uncles: string;
  miner: string;
  transactionsRoot: string;
  gasUsed: string;
  extraData: string;
  timestamp: string;
  sealFields: string[];
  nonce: string;
  stateRoot: string;
  receiptsRoot: string;
  number: string;
  baseFeePerGas: string;
}
