// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AuthenticationRecord } from "../msal/types";
import { AuthorityValidationOptions } from "./authorityValidationOptions";
import { MultiTenantTokenCredentialOptions } from "./multiTenantTokenCredentialOptions";

/**
 * Common constructor options for the Identity credentials that requires user interaction.
 */
export interface InteractiveCredentialOptions
  extends MultiTenantTokenCredentialOptions,
    AuthorityValidationOptions {
  /**
   * Result of a previous authentication that can be used to retrieve the cached credentials of each individual account.
   * This is necessary to provide in case the application wants to work with more than one account per
   * Client ID and Tenant ID pair.
   *
   * This record can be retrieved by calling to the credential's `authenticate()` method, as follows:
   *
   *     const authenticationRecord = await credential.authenticate();
   *
   */
  authenticationRecord?: AuthenticationRecord;

  /**
   * Makes getToken throw if a manual authentication is necessary.
   * Developers will need to call to `authenticate()` to control when to manually authenticate.
   */
  disableAutomaticAuthentication?: boolean;
}
