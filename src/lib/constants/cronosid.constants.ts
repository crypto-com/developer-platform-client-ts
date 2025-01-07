export const CRONOSID_EVM_MAINNET_REGISTRY_CONTRACT = '0x7F4C61116729d5b27E5f180062Fdfbf32E9283E5';
export const CRONOSID_EVM_TESTNET_REGISTRY_CONTRACT = '0x16a23bFBcE9c53998c90201629E4cDB40B81B127';

export const CRONOSID_REGISTRY_CONTRACT_ABI = [
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'resolver',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];

export const CRONOSID_EVM_MAINNET_RESOLVER_CONTRACT_ABI = [
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];
