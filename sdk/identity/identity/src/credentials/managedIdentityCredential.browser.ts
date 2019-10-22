// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/no-unused-vars */

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-http";
import { IdentityClientOptions } from "../client/identityClient";

const BrowserNotSupportedError = new Error(
  "ManagedIdentityCredential is not supported in the browser."
);

export class ManagedIdentityCredential implements TokenCredential {
  constructor(clientId: string, options?: IdentityClientOptions);
  constructor(options?: IdentityClientOptions);  
  constructor(clientIdOrOptions: string | IdentityClientOptions | undefined, options?: IdentityClientOptions) {
    throw BrowserNotSupportedError;
  }

  public async getToken(
    scopes: string | string[],
    options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    throw BrowserNotSupportedError;
  }
}
