export interface LedgerEntry {
  /** Contents of the ledger entry. */
  contents: string;
  collectionId: string;
  /** A unique identifier for the state of the ledger. If returned as part of a LedgerEntry, it indicates the state from which the entry was read. */
  transactionId: string;
}

/** Details about a Confidential ledger user. */
export interface LedgerUser {
  /** The user id, either an AAD object ID or certificate fingerprint. */
  userId: string;
  /**
   * The user's assigned role.
   *
   * Possible values: Administrator, Contributor, Reader
   */
  assignedRole: string;
}
