// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * The shape we use return the token (and the expiration date).
 * @internal
 */
export interface MsalToken {
  accessToken?: string;
  expiresOn: Date | null;
}

/**
 * Internal representation of MSAL's Account information.
 * Helps us to disambiguate the MSAL classes accross environments.
 * @internal
 */
export interface MsalAccountInfo {
  homeAccountId: string;
  environment?: string;
  tenantId: string;
  username: string;
  localAccountId: string;
  name?: string;
  // Leaving idTokenClaims as object since that's how MSAL has this assigned.
  /* eslint-disable-next-line @typescript-eslint/ban-types */
  idTokenClaims?: object;
}

/**
 * Represents the common properties of any of the MSAL responses.
 * @internal
 */
export interface MsalResult {
  authority?: string;
  account: MsalAccountInfo | null;
  accessToken: string;
  expiresOn: Date | null;
}

/**
 * The record to use to find the cached tokens in the cache.
 */
export interface AuthenticationRecord {
  /**
   * The associated authority, if used.
   */
  authority: string;
  /**
   * The home account Id.
   */
  homeAccountId: string;
  /**
   * The associated tenant ID.
   */
  tenantId: string;
  /**
   * The username of the logged in account.
   */
  username: string;
  /**
   * Function that returns a serialized version of the `AuthenticationRecord`.
   *
   * The output of a serialized authentication record will contain the following properties:
   *
   *   "authority",
   *   "home_account_id",
   *   "tenant_id",
   *   "username"
   *
   * To later use a serialized `AuthenticationRecord`, please use the exported function `deserializeAuthenticationRecord()`.
   */
  serialize: () => string;
}
