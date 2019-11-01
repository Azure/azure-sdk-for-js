// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/no-unused-vars */

import { AccessToken, TokenCredential, GetTokenOptions } from "@azure/core-http";
import { TokenCredentialOptions } from "../client/identityClient";

const BrowserNotSupportedError = new Error(
  "EnvironmentCredential is not supported in the browser."
);

export class EnvironmentCredential implements TokenCredential {
  constructor(options?: TokenCredentialOptions) {
    throw BrowserNotSupportedError;
  }

  getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken | null> {
    throw BrowserNotSupportedError;
  }
}
