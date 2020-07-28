// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-unused-vars */

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-http";
import { TokenCredentialOptions } from "../client/identityClient";
import { credentialLogger, formatError } from "../util/logging";

const BrowserNotSupportedError = new Error(
  "ManagedIdentityCredential is not supported in the browser."
);
const logger = credentialLogger("ManagedIdentityCredential");

export class ManagedIdentityCredential implements TokenCredential {
  constructor(clientId: string, options?: TokenCredentialOptions);
  constructor(options?: TokenCredentialOptions);
  constructor(
    clientIdOrOptions: string | TokenCredentialOptions | undefined,
    options?: TokenCredentialOptions
  ) {
    logger.info(formatError(BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }

  public async getToken(
    scopes: string | string[],
    options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    logger.getToken.info(formatError(BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }
}
