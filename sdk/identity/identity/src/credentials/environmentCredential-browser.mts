// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import type { EnvironmentCredentialOptions } from "./environmentCredentialOptions.js";
import { credentialLogger, formatError } from "../util/logging.js";

const BrowserNotSupportedError = new Error(
  "EnvironmentCredential is not supported in the browser.",
);
const logger = credentialLogger("EnvironmentCredential");

/**
 * Enables authentication to Microsoft Entra ID using client secret
 * details configured in environment variables
 */
export class EnvironmentCredential implements TokenCredential {
  /**
   * Only available in Node.js
   */
  constructor(_options?: EnvironmentCredentialOptions) {
    logger.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }

  getToken(_scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken | null> {
    logger.getToken.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }
}
