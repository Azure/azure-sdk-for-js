// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/no-unused-vars */

import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-http";
import { IdentityClientOptions } from "../client/identityClient";

const BrowserNotSupportedError = new Error("AuthorizationCodeCredential is not supported in the browser.  InteractiveBrowserCredential is more appropriate for this use case.");

export class AuthorizationCodeCredential implements TokenCredential {
  constructor(
    tenantId: string,
    clientId: string,
    clientSecret: string | undefined,
    authorizationCode: string,
    redirectUri: string,
    options?: IdentityClientOptions
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
