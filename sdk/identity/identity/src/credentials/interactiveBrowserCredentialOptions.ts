// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/core-http";
import { TokenCredentialOptions } from "../client/identityClient";
import { AuthenticationRecord } from "../client/msalClient";

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
 * The Azure authentication flow.
 * - Implicit Grant Flow: https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-implicit-grant-flow
 * - Auth Code Flow: https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow
 */
export type InteractiveBrowserAuthenticationFlow = "implicit-grant" | "auth-code";

/**
 * Defines options for the InteractiveBrowserCredential class.
 */
export interface InteractiveBrowserCredentialOptions extends TokenCredentialOptions {
  /**
   * (Only available if used from a browser)
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
   * Correlation ID that can be customized to keep track of the browser authentication requests.
   */
  correlationId?: string;

  /**
   * (Only available if used from a browser)
   * Result of a previous authentication that can be used to retrieve the cached credentials of each individual account.
   * This is necessary to provide in case the application wants to work with more than one account per
   * Client ID and Tenant ID pair.
   *
   * This record can be retrieved by calling to the InteractiveBrowserCredential's `authenticate()` method, as follows:
   *
   *     const authenticationRecord = await credential.authenticate();
   *
   */
  authenticationRecord?: AuthenticationRecord;

  /**
   * (Only available if used from a browser)
   * Authentication flow to use.
   * If the user specifies the implicit-grant flow, we will use MSAL 1.
   * Otherwise, auth-code will be assumed, which uses PKCE and MSAL 2.
   */
  flow?: InteractiveBrowserAuthenticationFlow;
}

/**
 * Optional parameters to the InteractiveBrowserCredential authenticate() method.
 */
export interface InteractiveBrowserAuthenticateOptions {
  /**
   * The signal which can be used to abort requests.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Scopes to authenticate with.
   */
  scopes?: string | string[];
}
