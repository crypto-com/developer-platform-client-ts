import { Pagination, Transaction } from './explorer.interfaces';

export interface MagicLinkData {
  magicLink: string;
}

export interface TransactionsByAddress {
  transactions: Transaction[];
  pagination?: Pagination;
}

export enum BlockTagString {
  Latest = 'latest',
  Earliest = 'earliest',
}

export interface TransactionByHash {
  blockNumber: number;
  from: string;
  to: string;
  value: string;
  gasPrice: string;
  nonce: number;
  transactionIndex: number;
  gas: number;
}

export interface TransactionStatus {
  status: number | string;
  errDescription?: string;
}

export enum Unit {
  Ether = 'ether',
  Gwei = 'gwei',
}

export enum ChainName {
  CRONOS_EVM = 'Cronos EVM Mainnet',
  CRONOS_EVM_TESTNET = 'Cronos EVM Testnet',
  CRONOS_ZKEVM = 'Cronos ZK EVM Mainnet',
  CRONOS_ZKEVM_TESTNET = 'Cronos ZK EVM Testnet',
}

export interface Chain {
  id: number;
  name: ChainName;
  explorerUrl: string;
  rpc: string;
}

export enum TransactionAction {
  Deposit = 'deposit',
  Approve = 'approve',
  Swap = 'swap',
}

export interface TransactionCount {
  count: number;
}

export interface GasPrice {
  gasPrice: string;
}

export interface FeeData {
  feeData: {
    _type: string;
    gasPrice: string;
    maxFeePerGas: string;
    maxPriorityFeePerGas: string;
  };
}

export interface GasLimit {
  gasLimit: string;
}

export interface EstimateGasPayload {
  from: string;
  to?: string;
  value?: string;
  gasLimit?: string;
  gasPrice?: string;
  maxFeePerGas?: string;
  maxPriorityFeePerGas?: string;
  data?: string;
  nonce?: number;
  accessList?: Array<{
    address: string;
    storageKeys: string[];
  }>;
}

export interface TransactionResponseData {
  blockNumber: number | null;
  blockHash: string | null;
  index: number;
  hash: string;
  type: number;
  to: string | null;
  from: string;
  nonce: number;
  gasLimit: string;
  gasPrice: string;
  maxPriorityFeePerGas: string | null;
  maxFeePerGas: string | null;
  maxFeePerBlobGas: string | null;
  data: string;
  value: string;
  chainId: string;
  signature: {
    r: string;
    s: string;
    v: number;
    yParity?: number;
  };
  accessList: Array<{
    address: string;
    storageKeys: string[];
  }> | null;
  blobVersionedHashes: string[] | null;
}
