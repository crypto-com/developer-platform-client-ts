import { Block } from './lib/client/Block.js';
import { Client } from './lib/client/Client.js';
import { Contract } from './lib/client/Contract.js';
import { Exchange } from './lib/client/Exchange.js';
import { Token } from './lib/client/Token.js';
import { Transaction } from './lib/client/Transaction.js';
import { Wallet } from './lib/client/Wallet.js';
import { CronosEvm, CronosZkEvm } from './lib/client/interfaces/chain.interfaces.js';

/**
 * Client class for configuring and managing SDK functionality.
 *
 * @module Client
 */

/**
 * Wallet class for managing wallet-related operations like creation and balance retrieval.
 *
 * @module Wallet
 */

/**
 * Transaction class for handling blockchain transactions and related queries.
 *
 * @module Transaction
 */

/**
 * Token class for managing native token and ERC20 token operations.
 *
 * @module Token
 */

/**
 * Contract class for fetching smart contract ABIs.
 *
 * @module Contract
 */

/**
 * Block class for fetching block data.
 *
 * @module Block
 */

/**
 * Chain IDs for Cronos EVM (Mainnet and Testnet).
 *
 * @enum {string}
 * @module CronosEvm
 */

/**
 * Chain IDs for Cronos ZK EVM (Mainnet and Testnet).
 *
 * @enum {string}
 * @module CronosZkEvm
 */
  
/**
 * Exchange class for fetching exchange information.
 *
 * @module Exchange
 */

export { Client, Wallet, Transaction, Token, Contract, Block, Exchange };
export { CronosZkEvm, CronosEvm };
