// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, TokenCredential } from "@azure/core-auth";

import { TokenCredentialOptions } from "@azure/identity-common";
import { credentialLogger, formatError } from "@azure/identity-common";

const BrowserNotSupportedError = new Error(
  "ManagedIdentityCredential is not supported in the browser."
);
const logger = credentialLogger("ManagedIdentityCredential");

export class ManagedIdentityCredential implements TokenCredential {
  constructor(clientId: string, options?: TokenCredentialOptions);
  constructor(options?: TokenCredentialOptions);
  constructor() {
    logger.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }

  public async getToken(): Promise<AccessToken | null> {
    logger.getToken.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }
}
