// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** An entry in the ledger. */
export interface LedgerEntry {
  /** Contents of the ledger entry. */
  contents: string;
}

/** Details about a Confidential Ledger user. */
export interface LedgerUser {
  /** Represents an assignable role. */
  assignedRole: "Administrator" | "Contributor" | "Reader";
}
