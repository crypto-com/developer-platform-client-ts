export interface ExplorerResponse<T> {
  status: ExplorerResponseStatus;
  message: string;
  result: T;
  metadata?: {
    queryLimit: number;
  };
  pagination?: Pagination;
}

export enum ExplorerResponseStatus {
  Success = '1',
  Error = '0',
}

export interface Pagination {
  totalRecord: number;
  totalPage: number;
  currentPage: number;
  limit: number;
  session: string;
}

export interface Transaction {
  blockNumber: number;
  transactionHash: string;
  status: number;
  error: string;
  from: {
    address: string;
    isContract: boolean;
  };
  to: {
    address: string;
    isContract: boolean;
  };
  gas: string;
  gasPrice: string;
  gasLimit: string;
  timestamp: number;
  methodId: string;
  methodName: string;
  index: number;
  value: string;
  type: string;
  nonce: number;
  input: string;
  contractAddress: string;
  confirmations: number;
  transactionIndex: string;
}

export interface InternalTransaction {
  blockNumber: number;
  transactionHash: string;
  timestamp: number;
  from: {
    address: string;
    isContract: boolean;
  };
  to: {
    address: string;
    isContract: boolean;
  };
  value: string;
  type: string;
  gasLimit: number;
  traceId: string;
  isError: string;
  callError?: string;
  input: string;
  contractAddress?: string;
}

export interface Abi {
  abi: string | null;
}

export interface TokenTotalSupply {
  totalSupply: string;
}
