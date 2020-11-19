// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, TokenCredential } from "@azure/core-http";
import { credentialLogger, formatError } from "../util/logging";

const BrowserNotSupportedError = new Error(
  "EnvironmentCredential is not supported in the browser."
);
const logger = credentialLogger("EnvironmentCredential");

export class EnvironmentCredential implements TokenCredential {
  constructor() {
    logger.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }

  getToken(): Promise<AccessToken | null> {
    logger.getToken.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }
}
