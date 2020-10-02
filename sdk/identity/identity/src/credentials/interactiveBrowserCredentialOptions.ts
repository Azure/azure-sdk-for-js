// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredentialOptions } from "../client/identityClient";

/**
 * The "login style" to use in the authentication flow:
 * - "redirect" redirects the user to the authentication page and then
 *   redirects them back to the page once authentication is completed.
 * - "popup" opens a new browser window through with the redirect flow
 *   is initiated.  The user's existing browser window does not leave
 *   the current page
 */
export type BrowserLoginStyle = "redirect" | "popup";

/**
 * The record to use to find the cached tokens in the cache
 */
export interface AuthenticationRecord {
  /**
   * The associated authority, if used
   */
  authority?: string;

  /**
   * The home account Id
   */
  homeAccountId: string;

  /**
   * The login environment, eg "login.windows.net"
   */
  environment: string;

  /**
   * The associated tenant ID
   */
  tenantId: string;

  /**
   * The username of the logged in account
   */
  username: string;
}

/**
 * Defines options for the InteractiveBrowserCredential class.
 */
export interface InteractiveBrowserCredentialOptions extends TokenCredentialOptions {
  /**
   * Specifies whether a redirect or a popup window should be used to
   * initiate the user authentication flow. Possible values are "redirect"
   * or "popup" (default) for browser and "popup" (default) for node.
   *
   */
  loginStyle?: BrowserLoginStyle;

  /**
   * Gets the redirect URI of the application. This should be same as the value
   * in the application registration portal.  Defaults to `window.location.href`.
   */
  redirectUri?: string | (() => string);

  /**
   * Gets the URI to which the user will be redirected when logging out.
   * Defaults to `window.location.href`.
   */
  postLogoutRedirectUri?: string | (() => string);

  /**
   * The Azure Active Directory tenant (directory) ID.
   */
  tenantId?: string;

  /**
   * The client (application) ID of an App Registration in the tenant.
   */
  clientId?: string;

  /**
   * The cache options to use when credentials are being checked.
   */
  cacheOptions?: {
    cachePlugin?: {
      readFromStorage: () => Promise<string>;
      writeToStorage: (getMergedState: (oldState: string) => string) => Promise<void>;
    };
  };

  /**
   * The authentication record to use to find existing tokens in the cache
   */
  authenticationRecord?: AuthenticationRecord;
}
