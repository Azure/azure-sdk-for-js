// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AuthenticationRecord } from "../../client/msalClient";
import {
  BrowserLoginStyle,
  InteractiveBrowserAuthenticateOptions
} from "../interactiveBrowserCredentialOptions";

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

export interface IMSALToken {
  accessToken?: string;
  expiresOn: Date | null;
}

export interface IMSALBrowserFlow {
  handleRedirect(): Promise<AuthenticationRecord | undefined>;
  login(scopes: string | string[]): Promise<AuthenticationRecord | undefined>;
  getActiveAccount(): AuthenticationRecord | undefined;
  acquireToken(options: InteractiveBrowserAuthenticateOptions): Promise<IMSALToken | undefined>;
  authenticate(
    options: InteractiveBrowserAuthenticateOptions
  ): Promise<AuthenticationRecord | undefined>;
}
