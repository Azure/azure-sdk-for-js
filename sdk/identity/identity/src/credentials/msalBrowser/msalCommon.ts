// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AuthenticationRecord } from "../../client/msalClient";
import {
  BrowserLoginStyle,
  InteractiveBrowserAuthenticateOptions
} from "../interactiveBrowserCredentialOptions";

/**
 * Union of the constructor parameters that all MSAL flow types take.
 * Some properties might not be used by some flow types.
 */
export interface MSALOptions {
  clientId?: string;
  tenantId?: string;
  authorityHost?: string;
  knownAuthorities?: string[];
  redirectUri?: string;
  correlationId?: string;
  postLogoutRedirectUri?: string;
  authenticationRecord?: AuthenticationRecord;
  loginStyle: BrowserLoginStyle;
}

/**
 * The shape we use return the token (and the expiration date).
 */
export interface IMSALToken {
  accessToken?: string;
  expiresOn: Date | null;
}

/**
 * The common methods we use to work with the MSAL flows.
 */
export interface IMSALBrowserFlow {
  handleRedirect(): Promise<AuthenticationRecord | undefined>;
  login(scopes: string | string[]): Promise<AuthenticationRecord | undefined>;
  getActiveAccount(): AuthenticationRecord | undefined;
  acquireToken(options: InteractiveBrowserAuthenticateOptions): Promise<IMSALToken | undefined>;
  authenticate(
    options: InteractiveBrowserAuthenticateOptions
  ): Promise<AuthenticationRecord | undefined>;
}
