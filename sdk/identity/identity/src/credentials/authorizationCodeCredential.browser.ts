// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/no-unused-vars */

import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-http";
import { TokenCredentialOptions } from '../client/identityClient';

const BrowserNotSupportedError = new Error(
  "AuthorizationCodeCredential is not supported in the browser.  InteractiveBrowserCredential is more appropriate for this use case."
);

export class AuthorizationCodeCredential implements TokenCredential {
  constructor(
    tenantId: string | "common",
    clientId: string,
    clientSecret: string,
    authorizationCode: string,
    redirectUri: string,
    options?: TokenCredentialOptions
  );
  constructor(
    tenantId: string | "common",
    clientId: string,
    authorizationCode: string,
    redirectUri: string,
    options?: TokenCredentialOptions
  ); 
  constructor(
    tenantId: string | "common",
    clientId: string,
    clientSecretOrAuthorizationCode: string,
    authorizationCodeOrRedirectUri: string,
    redirectUriOrOptions: string | TokenCredentialOptions | undefined,
    options?: TokenCredentialOptions
  ) {
    throw BrowserNotSupportedError;
  }

  public getToken(
    scopes: string | string[],
    options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    throw BrowserNotSupportedError;
  }
}
