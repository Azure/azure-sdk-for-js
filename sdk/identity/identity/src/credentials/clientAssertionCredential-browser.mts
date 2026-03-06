// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import type { ClientAssertionCredentialOptions } from "./clientAssertionCredentialOptions.js";
import { credentialLogger, formatError } from "../util/logging.js";

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
  constructor(
    _tenantId: string,
    _clientId: string,
    _getAssertion: () => Promise<string>,
    _options?: ClientAssertionCredentialOptions,
  ) {
    logger.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }

  public getToken(_scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken | null> {
    logger.getToken.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }
}
