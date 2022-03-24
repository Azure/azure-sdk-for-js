// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  InteractiveCredentialOptions,
  CredentialPersistenceOptions,
} from "@azure/identity";

/**
 * Defines the common options for the RedirectCredential class.
 */
export interface SPACredentialOptions extends InteractiveCredentialOptions, CredentialPersistenceOptions {
  /**
   * Gets the redirect URI of the application. This should be same as the value
   * in the application registration portal.  Defaults to `window.location.href`.
   */
  redirectUri?: string | (() => string);

  /**
   * The Azure Active Directory tenant (directory) ID.
   */
  tenantId?: string;

  /**
   * The client (application) ID of an App Registration in the tenant.
   */
  clientId?: string;

  /**
   * loginHint allows a user name to be pre-selected for interactive logins.
   * Setting this option skips the account selection prompt and immediately attempts to login with the specified account.
   */
  loginHint?: string;
}
