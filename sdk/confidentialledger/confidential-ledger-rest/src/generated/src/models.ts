// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface Constitution {
  /** SHA256 digest of the constitution script. */
  digest: string;
  /** Contents of the constitution. */
  script: string;
}

export interface ConfidentialLedgerError {
  /** An error response from Confidential Ledger. */
  error?: ConfidentialLedgerErrorBody;
}

export interface ConfidentialLedgerErrorBody {
  /** The error code. */
  code?: string;
  /** The error message. */
  message?: string;
  /** An error response from Confidential Ledger. */
  innerError?: ConfidentialLedgerErrorBody;
}

export interface Consortium {
  members: ConsortiumMember[];
}

export interface ConsortiumMember {
  /** PEM-encoded certificate associated with the member. */
  certificate: string;
  /** Identifier assigned to the member. */
  id: string;
}

export interface ConfidentialLedgerEnclaves {
  /** Id of the Confidential Ledger node responding to the request. */
  currentNodeId: string;
  /** Dictionary of enclave quotes, indexed by node id. */
  enclaveQuotes: EnclaveQuotesDictionary;
}

export interface EnclaveQuote {
  /** ID assigned to this node. */
  nodeId: string;
  /** MRENCLAVE value of the code running in the enclave. */
  mrenclave?: string;
  /** Version of the quote presented. */
  quoteVersion: string;
  /** Raw SGX quote, parsable by tools like Open Enclave's oeverify. */
  raw: string;
}

export interface PagedLedgerEntries {
  /** State of a ledger query. */
  state: ConfidentialLedgerQueryState;
  /** Path from which to retrieve the next page of results. */
  nextLink?: string;
  /** Array of ledger entries. */
  entries: LedgerEntry[];
}

export interface LedgerEntry {
  /** Contents of the ledger entry. */
  contents: string;
  /** Identifier for sub-ledgers. */
  subLedgerId?: string;
  /** A unique identifier for the state of the ledger. If returned as part of a LedgerEntry, it indicates the state from which the entry was read. */
  transactionId?: string;
}

export interface LedgerWriteResult {
  /** Identifier for sub-ledgers. */
  subLedgerId: string;
}

export interface LedgerQueryResult {
  /** State of a ledger query. */
  state: ConfidentialLedgerQueryState;
  /** The ledger entry found as a result of the query. This is only available if the query is in Ready state. */
  entry?: LedgerEntry;
}

export interface TransactionReceipt {
  /** A receipt certifying the transaction at the specified id. */
  receipt?: ReceiptContents;
  /** State of a ledger query. */
  state: ConfidentialLedgerQueryState;
  /** A unique identifier for the state of the ledger. If returned as part of a LedgerEntry, it indicates the state from which the entry was read. */
  transactionId: string;
}

export interface ReceiptContents {
  /** Merkle tree leaf for this transaction. */
  leaf: string;
  /** Id of the node returning the receipt. */
  nodeId: string;
  /** Merkle proof. */
  proof: MerkleProofElement[];
  /** Root of the Merkle tree at the time the transaction was recorded. */
  root: string;
  /** Signature by the node, with its certificate, over the Merkle root. */
  signature: string;
}

export interface MerkleProofElement {
  left?: string;
  right?: string;
}

export interface TransactionStatus {
  /** Represents the state of the transaction. */
  state: TransactionState;
  /** A unique identifier for the state of the ledger. If returned as part of a LedgerEntry, it indicates the state from which the entry was read. */
  transactionId: string;
}

export interface LedgerUser {
  /** Represents an assignable role. */
  assignedRole: ConfidentialLedgerUserRoleName;
  /** Identifier for the user. This must either be an AAD object id or a certificate fingerprint. */
  userId?: string;
}

export interface RoleAssignment {
  /** Represents an assignable role. */
  roleName: ConfidentialLedgerUserRoleName;
  /** Description of the role. */
  description?: string;
}

export type ConfidentialLedgerQueryState = "Loading" | "Ready";
export type TransactionState = "Committed" | "Pending";
export type ConfidentialLedgerUserRoleName =
  | "Administrator"
  | "Contributor"
  | "Reader";
export type EnclaveQuotesDictionary = Record<string, EnclaveQuote>;
