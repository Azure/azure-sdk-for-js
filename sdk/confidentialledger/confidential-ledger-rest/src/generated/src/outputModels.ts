// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** The governance script for the application. */
export interface ConstitutionOutput {
  /** SHA256 digest of the constitution script. */
  digest: string;
  /** Contents of the constitution. */
  script: string;
}

/** An error response from Confidential Ledger. */
export interface ConfidentialLedgerErrorOutput {
  /** An error response from Confidential Ledger. */
  readonly error?: ConfidentialLedgerErrorBodyOutput;
}

/** An error response from Confidential Ledger. */
export interface ConfidentialLedgerErrorBodyOutput {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
}

/** List of members in the consortium. */
export interface ConsortiumOutput {
  members: Array<ConsortiumMemberOutput>;
  /** Path from which to retrieve the next page of results. */
  nextLink?: string;
}

/** Describes a member of the consortium. */
export interface ConsortiumMemberOutput {
  /** PEM-encoded certificate associated with the member. */
  certificate: string;
  /** Identifier assigned to the member. */
  id: string;
}

/** Information about the enclaves running the Confidential Ledger. */
export interface ConfidentialLedgerEnclavesOutput {
  /** Id of the Confidential Ledger node responding to the request. */
  currentNodeId: string;
  /** Dictionary of enclave quotes, indexed by node id. */
  enclaveQuotes: Record<string, EnclaveQuoteOutput>;
}

/** Contains the enclave quote. */
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

/** Paginated collections returned in response to a query. */
export interface PagedCollectionsOutput {
  collections: Array<CollectionOutput>;
  /** Path from which to retrieve the next page of results. */
  nextLink?: string;
}

/** Identifier for collections. */
export interface CollectionOutput {
  collectionId: string;
}

/** Paginated ledger entries returned in response to a query. */
export interface PagedLedgerEntriesOutput {
  /** State of a ledger query. */
  state: "Loading" | "Ready";
  /** Path from which to retrieve the next page of results. */
  nextLink?: string;
  /** Array of ledger entries. */
  entries: Array<LedgerEntryOutput>;
}

/** An entry in the ledger. */
export interface LedgerEntryOutput {
  /** Contents of the ledger entry. */
  contents: string;
  readonly collectionId?: string;
  /** A unique identifier for the state of the ledger. If returned as part of a LedgerEntry, it indicates the state from which the entry was read. */
  readonly transactionId?: string;
}

/** Returned as a result of a write to the Confidential Ledger, the transaction id in the response indicates when the write will become durable. */
export interface LedgerWriteResultOutput {
  collectionId: string;
}

/** The result of querying for a ledger entry from an older transaction id. The ledger entry is available in the response only if the returned state is Ready. */
export interface LedgerQueryResultOutput {
  /** State of a ledger query. */
  state: "Loading" | "Ready";
  /** The ledger entry found as a result of the query. This is only available if the query is in Ready state. */
  entry?: LedgerEntryOutput;
}

/** A receipt certifying the transaction at the specified id. */
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

/** Response returned to a query for the transaction status */
export interface TransactionStatusOutput {
  /** Represents the state of the transaction. */
  state: "Committed" | "Pending";
  /** A unique identifier for the state of the ledger. If returned as part of a LedgerEntry, it indicates the state from which the entry was read. */
  transactionId: string;
}

/** Details about a Confidential Ledger user. */
export interface LedgerUserOutput {
  /** Represents an assignable role. */
  assignedRole: "Administrator" | "Contributor" | "Reader";
  /** Identifier for the user. This must either be an AAD object id or a certificate fingerprint. */
  readonly userId?: string;
}
