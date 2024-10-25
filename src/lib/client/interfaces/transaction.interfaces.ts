import { Pagination, Transaction } from './explorer.interfaces';

export interface MagicLinkData {
  magicLink: string;
}

export interface ListWalletsData {
  wallets: Wallet[];
  currentWallet: {
    index: number;
    address: string;
  };
}

export interface GetBalanceData {
  balances: Balance[];
}

export interface GetTransactionsByAddressData {
  transactions: Transaction[];
  pagination?: Pagination;
}

export interface ConnectWalletData {
  address: string;
}

export enum BlockTagString {
  Latest = 'latest',
  Earliest = 'earliest',
}

export interface GetTransactionByHashData {
  blockNumber: number;
  from: string;
  to: string;
  value: string;
  gasPrice: string;
  nonce: number;
  transactionIndex: number;
  gas: number;
}
export interface GetTransactionStatusData {
  status: number | string;
  errDescription?: string;
}

interface Wallet {
  walletNumber: number;
  address: string;
}

interface Balance {
  address: string;
  balanceWei?: string;
  balanceEth?: string;
  error?: string;
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
