// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, AccessToken } from "@azure/core-auth";

import { credentialLogger, formatError } from "../util/logging";

const BrowserNotSupportedError = new Error("DeviceCodeCredential is not supported in the browser.");
const logger = credentialLogger("DeviceCodeCredential");

/**
 * Enables authentication to Azure Active Directory using a device code
 * that the user can enter into https://microsoft.com/devicelogin.
 */
export class DeviceCodeCredential implements TokenCredential {
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
