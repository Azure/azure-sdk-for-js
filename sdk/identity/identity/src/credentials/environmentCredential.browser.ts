// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, TokenCredential } from "@azure/core-auth";

import { credentialLogger, formatError } from "../util/logging";

const BrowserNotSupportedError = new Error(
  "EnvironmentCredential is not supported in the browser."
);
const logger = credentialLogger("EnvironmentCredential");

/**
 * Enables authentication to Azure Active Directory using client secret
 * details configured in environment variables
 */
export class EnvironmentCredential implements TokenCredential {
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
