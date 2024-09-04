// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AccessToken, TokenCredential } from "@azure/core-auth";
import { credentialLogger, formatError } from "../util/logging";

const BrowserNotSupportedError = new Error(
  "ClientAssertionCredential is not supported in the browser.",
);
const logger = credentialLogger("ClientAssertionCredential");

/**
 * Authenticates a service principal with a JWT assertion.
 */
export class ClientAssertionCredential implements TokenCredential {
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
