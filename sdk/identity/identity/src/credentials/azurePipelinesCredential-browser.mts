// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessToken, TokenCredential } from "@azure/core-auth";
import { credentialLogger, formatError } from "../util/logging.js";

const BrowserNotSupportedError = new Error(
  "AzurePipelinesCredential is not supported in the browser.",
);
const logger = credentialLogger("AzurePipelinesCredential");

/**
 * Enables authentication to Microsoft Entra ID using a PEM-encoded
 * certificate that is assigned to an App Registration.
 */
export class AzurePipelinesCredential implements TokenCredential {
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
