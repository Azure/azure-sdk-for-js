// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface LedgerEntry {
  /** Contents of the ledger entry. */
  contents: string;
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
