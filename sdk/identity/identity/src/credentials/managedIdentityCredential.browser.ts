// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/no-unused-vars */

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-http";
import { TokenCredentialOptions } from "../client/identityClient";

const BrowserNotSupportedError = new Error(
  "ManagedIdentityCredential is not supported in the browser."
);

export class ManagedIdentityCredential implements TokenCredential {
  constructor(clientId: string, options?: TokenCredentialOptions);
  constructor(options?: TokenCredentialOptions);  
  constructor(clientIdOrOptions: string | TokenCredentialOptions | undefined, options?: TokenCredentialOptions) {
    throw BrowserNotSupportedError;
  }

  public async getToken(
    scopes: string | string[],
    options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    throw BrowserNotSupportedError;
  }
}
