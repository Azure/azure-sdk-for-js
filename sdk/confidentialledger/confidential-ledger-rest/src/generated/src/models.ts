// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface LedgerEntry {
  /** Contents of the ledger entry. */
  contents: string;
  collectionId?: string;
  /** A unique identifier for the state of the ledger. If returned as part of a LedgerEntry, it indicates the state from which the entry was read. */
  transactionId?: string;
}

export interface LedgerUser {
  /** Represents an assignable role. */
  assignedRole: "Administrator" | "Contributor" | "Reader";
  /** Identifier for the user. This must either be an AAD object id or a certificate fingerprint. */
  userId?: string;
}
