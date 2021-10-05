// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, TokenCredential } from "@azure/core-auth";

import { credentialLogger, formatError } from "../util/logging";

const BrowserNotSupportedError = new Error("AzureCliCredential is not supported in the browser.");
const logger = credentialLogger("AzureCliCredential");

/**
 * This credential will use the currently logged-in user login information
 * via the Azure CLI ('az') commandline tool.
 */
export class AzureCliCredential implements TokenCredential {
  /**
   * Only available in Node.js
   */
  constructor() {
    logger.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }

  getToken(): Promise<AccessToken | null> {
    logger.getToken.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }
}
