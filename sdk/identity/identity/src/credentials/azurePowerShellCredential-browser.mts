// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import type { AzurePowerShellCredentialOptions } from "./azurePowerShellCredentialOptions.js";
import { credentialLogger, formatError } from "../util/logging.js";

const BrowserNotSupportedError = new Error(
  "AzurePowerShellCredential is not supported in the browser.",
);
const logger = credentialLogger("AzurePowerShellCredential");

/**
 * This credential will use the currently-logged-in user's login information via the Azure Power Shell command line tool.
 */
export class AzurePowerShellCredential implements TokenCredential {
  /**
   * Only available in Node.js
   */
  constructor(_options?: AzurePowerShellCredentialOptions) {
    logger.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }

  getToken(_scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken | null> {
    logger.getToken.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }
}
