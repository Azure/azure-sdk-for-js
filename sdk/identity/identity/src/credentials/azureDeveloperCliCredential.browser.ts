// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AccessToken, TokenCredential } from "@azure/core-auth";
import { credentialLogger, formatError } from "../util/logging";

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
  constructor() {
    logger.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }

  getToken(): Promise<AccessToken | null> {
    logger.getToken.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }
}
