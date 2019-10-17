// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/no-unused-vars */

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-http";
import { IdentityClientOptions } from "../client/identityClient";
import { TokenRequestContext } from "@azure/core-auth";

const BrowserNotSupportedError = new Error(
  "ManagedIdentityCredential is not supported in the browser."
);

export class ManagedIdentityCredential implements TokenCredential {
  constructor(clientId?: string, options?: IdentityClientOptions) {
    throw BrowserNotSupportedError;
  }

  public async getToken(
    requestContext: TokenRequestContext,
    options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    throw BrowserNotSupportedError;
  }
}
