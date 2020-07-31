// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-unused-vars */

import { AccessToken, TokenCredential, GetTokenOptions } from "@azure/core-http";
import { TokenCredentialOptions } from "../client/identityClient";
import { credentialLogger, formatError } from "../util/logging";

const BrowserNotSupportedError = new Error(
  "EnvironmentCredential is not supported in the browser."
);
const logger = credentialLogger("EnvironmentCredential");

export class EnvironmentCredential implements TokenCredential {
  constructor(options?: TokenCredentialOptions) {
    logger.info(formatError(BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }

  getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken | null> {
    logger.getToken.info(formatError(BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }
}
