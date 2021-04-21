// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, AccessToken } from "@azure/core-http";
import { credentialLogger, formatError } from "../util/logging";

const BrowserNotSupportedError = new Error(
  "AzurePowerShellCredential is not supported in the browser."
);
const logger = credentialLogger("AzurePowerShellCredential");

/**
 * This credential will use the currently logged-in user login information via the Azure Power Shell command line tool.
 * This credential is not supported in browsers.
 */
export class AzurePowerShellCredential implements TokenCredential {
  constructor() {
    logger.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }

  getToken(): Promise<AccessToken | null> {
    logger.getToken.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }
}
