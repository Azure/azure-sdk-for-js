// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IdentityClientOptions } from "../client/identityClient";

export type BrowserLoginStyle = "redirect" | "popup";

/**
 * Defines options for the InteractiveBrowserCredential class.
 */
export interface InteractiveBrowserCredentialOptions extends IdentityClientOptions {
  /**
   * Specifies whether a redirect or a popup window should be used to
   * initiate the user authentication flow. Possible values are "redirect"
   * or "popup" (default).
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
}
