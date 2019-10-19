// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/no-unused-vars */

import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-http";
import { AuthorizationCodeCredentialOptions } from '..';

const BrowserNotSupportedError = new Error(
  "AuthorizationCodeCredential is not supported in the browser.  InteractiveBrowserCredential is more appropriate for this use case."
);

export class AuthorizationCodeCredential implements TokenCredential {
  constructor(
    clientId: string,
    clientSecret: string,
    authorizationCode: string,
    redirectUri: string,
    options?: AuthorizationCodeCredentialOptions
  );
  constructor(
    clientId: string,
    authorizationCode: string,
    redirectUri: string,
    options?: AuthorizationCodeCredentialOptions
  ); 
  constructor(
    clientId: string,
    clientSecretOrAuthorizationCode: string,
    authorizationCodeOrRedirectUri: string,
    redirectUriOrOptions: string | AuthorizationCodeCredentialOptions | undefined,
    options?: AuthorizationCodeCredentialOptions
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
