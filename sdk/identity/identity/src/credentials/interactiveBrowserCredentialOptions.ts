// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AuthorityValidationOptions } from "./authorityValidationOptions";
import { CredentialPersistenceOptions } from "./credentialPersistenceOptions";
import { InteractiveCredentialOptions } from "./interactiveCredentialOptions";

/**
 * (Browser-only feature)
 * The "login style" to use in the authentication flow:
 * - "redirect" redirects the user to the authentication page and then
 *   redirects them back to the page once authentication is completed.
 * - "popup" opens a new browser window through with the redirect flow
 *   is initiated.  The user's existing browser window does not leave
 *   the current page
 */
export type BrowserLoginStyle = "redirect" | "popup";

/**
 * Defines the common options for the InteractiveBrowserCredential class.
 */
export interface InteractiveBrowserCredentialNodeOptions
  extends InteractiveCredentialOptions,
    CredentialPersistenceOptions,
    AuthorityValidationOptions {
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

/**
 * Defines the common options for the InteractiveBrowserCredential class.
 */
export interface InteractiveBrowserCredentialInBrowserOptions extends InteractiveCredentialOptions {
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
   * This parameter is required on the browser.
   */
  clientId: string;

  /**
   * Specifies whether a redirect or a popup window should be used to
   * initiate the user authentication flow. Possible values are "redirect"
   * or "popup" (default) for browser and "popup" (default) for node.
   *
   */
  loginStyle?: BrowserLoginStyle;

  /**
   * loginHint allows a user name to be pre-selected for interactive logins.
   * Setting this option skips the account selection prompt and immediately attempts to login with the specified account.
   */
  loginHint?: string;
}
