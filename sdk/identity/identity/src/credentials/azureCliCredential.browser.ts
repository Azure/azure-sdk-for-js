// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, TokenCredential } from "@azure/core-http";
import { credentialLogger, formatError } from "../util/logging";

const BrowserNotSupportedError = new Error("AzureCliCredential is not supported in the browser.");
const logger = credentialLogger("AzureCliCredential");

export class AzureCliCredential implements TokenCredential {
  constructor() {
    logger.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }

  getToken(): Promise<AccessToken | null> {
    logger.getToken.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }
}
