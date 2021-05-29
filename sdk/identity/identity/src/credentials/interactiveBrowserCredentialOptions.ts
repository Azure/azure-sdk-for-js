// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { InteractiveCredentialOptions } from "./interactiveCredentialOptions";
import { CacheableCredentialOptions } from "./cacheableCredentialOptions";

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
export interface InteractiveBrowserCredentialOptions
  extends InteractiveCredentialOptions,
    CacheableCredentialOptions {
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
}

/**
 * Defines the common options for the InteractiveBrowserCredential class.
 */
export interface InteractiveBrowserCredentialBrowserOptions extends InteractiveCredentialOptions {
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
}
