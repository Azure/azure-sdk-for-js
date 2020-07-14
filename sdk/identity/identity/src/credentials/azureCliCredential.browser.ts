// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/no-unused-vars */

import { AccessToken, TokenCredential, GetTokenOptions } from "@azure/core-http";
import { TokenCredentialOptions } from "../client/identityClient";
import { credentialLogger, CredentialLogger } from "../util/logging";

const BrowserNotSupportedError = new Error("AzureCliCredential is not supported in the browser.");
const logger = credentialLogger("AzureCliCredential");

export class AzureCliCredential implements TokenCredential {
  constructor(options?: TokenCredentialOptions) {
    logger.error(BrowserNotSupportedError);
    throw BrowserNotSupportedError;
  }

  getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken | null> {
    logger.getToken.error(BrowserNotSupportedError);
    throw BrowserNotSupportedError;
  }
}
