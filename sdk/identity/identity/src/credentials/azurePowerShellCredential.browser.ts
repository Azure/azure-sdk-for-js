// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, AccessToken } from "@azure/core-http";
import { credentialLogger, formatError } from "../util/logging";

const BrowserNotSupportedError = new Error(
  "AzurePowerShellCredential is not supported in the browser."
);
const logger = credentialLogger("AzurePowerShellCredential");

/**
 * This credential will use the currently logged-in user login information
 * via the Azure Power Shell commandline tool.
 * To do so, it will read the user access token and expire time
 * with Azure Power Shell command `Get-AzAccessToken -ResourceUrl {ResourceScope}`.
 * To be able to use this credential, ensure that you have already logged
 * in via the 'az' tool using the command "Connect-AzAccount" from the commandline.
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
