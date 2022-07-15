// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface ConstitutionOutput {
  /** SHA256 digest of the constitution script. */
  digest: string;
  /** Contents of the constitution. */
  script: string;
}

export interface ConfidentialLedgerErrorOutput {
  /** An error response from Confidential Ledger. */
  error?: ConfidentialLedgerErrorBodyOutput;
}

export interface ConfidentialLedgerErrorBodyOutput {
  /** The error code. */
  code?: string;
  /** The error message. */
  message?: string;
}

export interface ConsortiumOutput {
  members: Array<ConsortiumMemberOutput>;
  /** Path from which to retrieve the next page of results. */
  nextLink?: string;
}

export interface ConsortiumMemberOutput {
  /** PEM-encoded certificate associated with the member. */
  certificate: string;
  /** Identifier assigned to the member. */
  id: string;
}

export interface ConfidentialLedgerEnclavesOutput {
  /** Id of the Confidential Ledger node responding to the request. */
  currentNodeId: string;
  /** Dictionary of enclave quotes, indexed by node id. */
  enclaveQuotes: Record<string, EnclaveQuoteOutput>;
}

export interface EnclaveQuoteOutput {
  /** ID assigned to this node. */
  nodeId: string;
  /** MRENCLAVE value of the code running in the enclave. */
  mrenclave?: string;
  /** Version of the quote presented. */
  quoteVersion: string;
  /** Raw SGX quote, parsable by tools like Open Enclave's oeverify. */
  raw: string;
}

export interface PagedCollectionsOutput {
  collections: Array<CollectionOutput>;
  /** Path from which to retrieve the next page of results. */
  nextLink?: string;
}

export interface CollectionOutput {
  collectionId: string;
}

export interface PagedLedgerEntriesOutput {
  /** State of a ledger query. */
  state: "Loading" | "Ready";
  /** Path from which to retrieve the next page of results. */
  nextLink?: string;
  /** Array of ledger entries. */
  entries: Array<LedgerEntryOutput>;
}

export interface LedgerEntryOutput {
  /** Contents of the ledger entry. */
  contents: string;
  collectionId?: string;
  /** A unique identifier for the state of the ledger. If returned as part of a LedgerEntry, it indicates the state from which the entry was read. */
  transactionId?: string;
}

export interface LedgerWriteResultOutput {
  collectionId: string;
}

export interface LedgerQueryResultOutput {
  /** State of a ledger query. */
  state: "Loading" | "Ready";
  /** The ledger entry found as a result of the query. This is only available if the query is in Ready state. */
  entry?: LedgerEntryOutput;
}

export interface TransactionReceiptOutput {
  receipt?: ReceiptContentsOutput;
  /** State of a ledger query. */
  state: "Loading" | "Ready";
  /** A unique identifier for the state of the ledger. If returned as part of a LedgerEntry, it indicates the state from which the entry was read. */
  transactionId: string;
}

export interface ReceiptContentsOutput {
  cert?: string;
  leaf?: string;
  leafComponents?: ReceiptLeafComponentsOutput;
  nodeId: string;
  proof: Array<ReceiptElementOutput>;
  root?: string;
  serviceEndorsements?: Array<string>;
  signature: string;
}

export interface ReceiptLeafComponentsOutput {
  claimsDigest?: string;
  commitEvidence?: string;
  writeSetDigest?: string;
}

export interface ReceiptElementOutput {
  left?: string;
  right?: string;
}

export interface TransactionStatusOutput {
  /** Represents the state of the transaction. */
  state: "Committed" | "Pending";
  /** A unique identifier for the state of the ledger. If returned as part of a LedgerEntry, it indicates the state from which the entry was read. */
  transactionId: string;
}

export interface LedgerUserOutput {
  /** Represents an assignable role. */
  assignedRole: "Administrator" | "Contributor" | "Reader";
  /** Identifier for the user. This must either be an AAD object id or a certificate fingerprint. */
  userId?: string;
}
