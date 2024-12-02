// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessToken, TokenCredential } from "@azure/core-auth";

import { credentialLogger, formatError } from "../../util/logging.js";

const BrowserNotSupportedError = new Error(
  "ManagedIdentityCredential is not supported in the browser.",
);
const logger = credentialLogger("ManagedIdentityCredential");

export class ManagedIdentityCredential implements TokenCredential {
  constructor() {
    logger.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }

  public async getToken(): Promise<AccessToken | null> {
    logger.getToken.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }
}
