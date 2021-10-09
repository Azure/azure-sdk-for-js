// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, AccessToken } from "@azure/core-auth";
import { credentialLogger, formatError } from "../util/logging";

const credentialName = "OnBehalfOfCredential";
const BrowserNotSupportedError = new Error(`${credentialName}: Not supported in the browser.`);
const logger = credentialLogger(credentialName);

/**
 * Enables authentication to Azure Active Directory using the [On Behalf Of flow](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-on-behalf-of-flow).
 */
export class OnBehalfOfCredential implements TokenCredential {
  /**
   * Only available in Node.js
   */
  constructor() {
    logger.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }

  public getToken(): Promise<AccessToken | null> {
    logger.getToken.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }
}
