# Crypto.com Developer Platform Client.ts

The **Crypto.com Developer Platform Client.ts** is a TypeScript/JavaScript SDK designed to interact with the Crypto.com Developer Platform Service API. This client simplifies working with the Cronos blockchain, covering native tokens, ERC20/ERC721 tokens, smart contracts, DeFi, exchange, and transaction services.

![npm](https://img.shields.io/npm/v/@crypto.com/developer-platform-client)

## Features

- Native and ERC20/ERC721 token operations
- Token transfers, wrapping, swapping
- Contract ABI and bytecode fetching
- Cronos ID (name ↔ address resolution)
- Blockchain transactions and block data
- DeFi protocols (farms, whitelisted tokens)
- Crypto.com exchange data
- Supports **Cronos EVM** and **Cronos ZK EVM**

## Installation

```bash
npm install @crypto.com/developer-platform-client
```

## Usage

Here’s how you can use the **Crypto.com Developer Platform Client.ts** in your project:

### Initialize the Client

First, initialize the client with your API key. To get an API Key, please create an account and a project at https://developer.crypto.com.

```ts
import { Client, CronosZkEvm } from '@crypto.com/developer-platform-client';

Client.init({
  apiKey: 'YOUR_API_KEY',
  provider: 'https://your-provider-url.com', // Optional
});
```

## Wallet

```ts
const wallet = await Wallet.create();
console.log(wallet);
```

```ts
const balance = await Wallet.balance('0xYourWallet');
console.log(balance);
```

## Token

```ts
const native = await Token.getNativeTokenBalance('0xYourWallet');
console.log(native);
```

```ts
const erc20 = await Token.getERC20TokenBalance('0xYourWallet', '0xToken');
console.log(erc20);
```

```ts
const transfer = await Token.transfer({ to: '0xRecipient', amount: 5 });
console.log(transfer);
```

```ts
const wrap = await Token.wrap({ amount: 10 });
console.log(wrap);
```

```ts
const swap = await Token.swap({
  fromContractAddress: '0xFrom',
  toContractAddress: '0xTo',
  amount: 2,
});
console.log(swap);
```

```ts
const balance721 = await Token.getERC721TokenBalance('0xYourWallet', '0xERC721Contract');
console.log(balance721);
```

```ts
const owner = await Token.getTokenOwner('0xERC721Contract', '1');
console.log(owner);
```

```ts
const uri = await Token.getTokenURI('0xERC721Contract', '1');
console.log(uri);
```

```ts
const metadata721 = await Token.getERC721Metadata('0xERC721Contract');
console.log(metadata721);
```

```ts
const metadata20 = await Token.getERC20Metadata('0xERC20Contract');
console.log(metadata20);
```

## Transaction

```ts
const txs = await Transaction.getTransactionsByAddress('0xAddress', 'explorerKey');
console.log(txs);
```

```ts
const tx = await Transaction.getTransactionByHash('0xHash');
console.log(tx);
```

```ts
const status = await Transaction.getTransactionStatus('0xHash');
console.log(status);
```

```ts
const count = await Transaction.getTransactionCount('0xWallet');
console.log(count);
```

```ts
const gasPrice = await Transaction.getGasPrice();
console.log(gasPrice);
```

```ts
const fee = await Transaction.getFeeData();
console.log(fee);
```

```ts
const estimate = await Transaction.estimateGas({
  from: '0xFrom',
  to: '0xTo',
  value: '0xValue',
  data: '0xData',
});
console.log(estimate);
```

## Contract

```ts
const abi = await Contract.getContractABI('0xContract', 'explorerKey');
console.log(abi);
```

```ts
const bytecode = await Contract.getContractCode('0xContract');
console.log(bytecode);
```

## Block

```ts
const current = await Block.getCurrentBlock();
console.log(current);
```

```ts
const block = await Block.getBlockByTag('latest');
console.log(block);
```

## Cronos ID

```ts
const resolved = await CronosId.forwardResolve('alice.cro');
console.log(resolved);
```

```ts
const reverse = await CronosId.reverseResolve('0xYourWallet');
console.log(reverse);
```

## DeFi

```ts
const tokens = await Defi.getWhitelistedTokens(DefiProtocol.H2);
console.log(tokens);
```

```ts
const farms = await Defi.getAllFarms(DefiProtocol.VVS);
console.log(farms);
```

```ts
const farm = await Defi.getFarmBySymbol(DefiProtocol.H2, 'zkCRO-MOON');
console.log(farm);
```

## Exchange

```ts
const all = await Exchange.getAllTickers();
console.log(all);
```

```ts
const ticker = await Exchange.getTickerByInstrument('BTC_USDT');
console.log(ticker);
```

## API

### Client Methods

- `Client.init(config)`: Initializes the client with an API key, chain, and optional provider.
- `Client.getApiKey()`: Returns the currently configured API key.
- `Client.getProvider()`: Returns the configured provider URL.
- `Client.getChainId()`: Returns the selected chain ID.

### Wallet Methods

- `Wallet.create()`: Creates a new wallet and returns its address, private key, and mnemonic.
- `Wallet.balance(address)`: Fetches the native token balance for a wallet address.

### Token Methods

- `Token.getNativeTokenBalance(address)`: Returns the native token balance for a given wallet or CronosId.
- `Token.getERC20TokenBalance(address, contractAddress, blockHeight?)`: Returns the ERC20 token balance.
- `Token.transfer({ to, amount, contractAddress? })`: Transfers native or ERC20 tokens.
- `Token.wrap({ amount })`: Wraps tokens.
- `Token.swap({ fromContractAddress, toContractAddress, amount })`: Swaps tokens.
- `Token.getERC721TokenBalance(address, contractAddress)`: Returns ERC721 token balance.
- `Token.getTokenOwner(contractAddress, tokenId)`: Returns the owner of a specific ERC721 token.
- `Token.getTokenURI(contractAddress, tokenId)`: Returns the token URI of an ERC721 token.
- `Token.getERC721Metadata(contractAddress)`: Returns metadata for an ERC721 contract.
- `Token.getERC20Metadata(contractAddress)`: Returns metadata for an ERC20 contract.

### Transaction Methods

- `Transaction.getTransactionsByAddress(address, explorerKey, session?, limit?, startBlock?, endBlock?)`: Returns transaction list.
- `Transaction.getTransactionByHash(txHash)`: Returns a transaction by hash.
- `Transaction.getTransactionStatus(txHash)`: Returns transaction status.
- `Transaction.getTransactionCount(address)`: Returns the nonce/transaction count for a wallet.
- `Transaction.getGasPrice()`: Returns the current gas price.
- `Transaction.getFeeData()`: Returns fee-related data.
- `Transaction.estimateGas(payload)`: Estimates the gas for a transaction.

### Contract Methods

- `Contract.getContractABI(contractAddress, explorerKey)`: Returns the ABI of a smart contract.
- `Contract.getContractCode(contractAddress)`: Returns bytecode of a smart contract.

### Block Methods

- `Block.getCurrentBlock()`: Returns the latest block.
- `Block.getBlockByTag(tag, txDetail?)`: Fetches block by tag or number.

### CronosId Methods

- `CronosId.forwardResolve(cronosId)`: Resolves a CronosId to a wallet address.
- `CronosId.reverseResolve(address)`: Resolves an address to its CronosId (if any).

### DeFi Methods

- `Defi.getWhitelistedTokens(protocol)`: Returns whitelisted tokens for a protocol.
- `Defi.getAllFarms(protocol)`: Returns all farms for a protocol.
- `Defi.getFarmBySymbol(protocol, symbol)`: Returns farm details by symbol.

### Exchange Methods

- `Exchange.getAllTickers()`: Returns all market tickers.
- `Exchange.getTickerByInstrument(instrumentName)`: Returns market data for a given trading pair.

## Supported Chains

The SDK supports both **Cronos EVM** and **Cronos ZK EVM** networks.

```ts
CronosEvm.Mainnet; // Chain ID: 25
CronosEvm.Testnet; // Chain ID: 338
CronosZkEvm.Mainnet; // Chain ID: 388
CronosZkEvm.Testnet; // Chain ID: 240
```

## License

This project is licensed under the MIT License.

## Contact

If you have any questions or comments about the library, please feel free to open an issue or a pull request on our GitHub repository.
