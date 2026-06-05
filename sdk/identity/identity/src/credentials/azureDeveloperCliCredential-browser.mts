// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import type { AzureDeveloperCliCredentialOptions } from "./azureDeveloperCliCredentialOptions.js";
import { credentialLogger, formatError } from "../util/logging.js";

const BrowserNotSupportedError = new Error(
  "AzureDeveloperCliCredential is not supported in the browser.",
);
const logger = credentialLogger("AzureDeveloperCliCredential");

/**
 * This credential will use the currently logged-in user login information
 * via the Azure Developer CLI ('azd') commandline tool.
 */
export class AzureDeveloperCliCredential implements TokenCredential {
  /**
   * Only available in Node.js
   */
  constructor(_options?: AzureDeveloperCliCredentialOptions) {
    logger.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }

  getToken(_scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken | null> {
    logger.getToken.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }
}
