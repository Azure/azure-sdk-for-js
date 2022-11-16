/** Identifier for collections. */
export interface CollectionModelOutput {
  collectionId: string;
}

/** A response containing error details. */
export interface ErrorResponseOutput {
  /** The error object. */
  error: ErrorModelOutput;
}

/** The error object. */
export interface ErrorModelOutput {
  /** One of a server-defined set of error codes. */
  code: string;
  /** A human-readable representation of the error. */
  message: string;
  /** The target of the error. */
  target?: string;
  /** An array of details about specific errors that led to this reported error. */
  details: Array<ErrorModelOutput>;
  /** An object containing more specific information than the current object about the error. */
  innererror?: InnerErrorOutput;
}

/** An object containing more specific information about the error. As per Microsoft One API guidelines - https://github.com/Microsoft/api-guidelines/blob/vNext/Guidelines.md#7102-error-condition-responses. */
export interface InnerErrorOutput {
  /** One of a server-defined set of error codes. */
  code: string;
  /** Inner error. */
  innererror?: InnerErrorOutput;
}

/** Paginated ledger entries returned in response to a query. */
export interface PagedLedgerEntriesOutput {
  /** Array of ledger entries. */
  entries: Array<LedgerEntryOutput>;
  /**
   * State of the ledger query.
   *
   * Possible values: Loading, Ready
   */
  state: string;
  /** Path from which to retrieve the next page of results. */
  nextLink?: string;
}

export interface LedgerEntryOutput {
  /** Contents of the ledger entry. */
  contents: string;
  collectionId: string;
  /** A unique identifier for the state of the ledger. If returned as part of a LedgerEntry, it indicates the state from which the entry was read. */
  transactionId: string;
}

/** A receipt certifying the transaction at the specified id. */
export interface TransactionReceiptOutput {
  receipt: ReceiptContentsOutput;
  /** Possible values: Loading, Ready */
  state: string;
  /** A unique identifier for the state of the ledger. If returned as part of a LedgerEntry, it indicates the state from which the entry was read. */
  transactionId: string;
}

export interface ReceiptContentsOutput {}

/** Response returned to a query for the transaction status. */
export interface TransactionStatusOutput {
  /** Possible values: Committed, Pending */
  state: string;
  /** A unique identifier for the state of the ledger. If returned as part of a LedgerEntry, it indicates the state from which the entry was read. */
  transactionId: string;
}

/** Details about a Confidential ledger user. */
export interface LedgerUserOutput {
  /** The user id, either an AAD object ID or certificate fingerprint. */
  userId: string;
  /**
   * The user's assigned role.
   *
   * Possible values: Administrator, Contributor, Reader
   */
  assignedRole: string;
}
