// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken } from "@azure/core-auth";

import { TokenCredentialOptions } from "../tokenCredentialOptions";
import { credentialLogger, formatError } from "../util/logging";
import { ChainedTokenCredential } from "./chainedTokenCredential";

const BrowserNotSupportedError = new Error(
  "DefaultAzureCredential is not supported in the browser. Use InteractiveBrowserCredential instead."
);
const logger = credentialLogger("DefaultAzureCredential");

/**
 * Provides a default {@link ChainedTokenCredential} configuration for
 * applications that will be deployed to Azure.
 *
 * Only available in Node.js.
 */
export class DefaultAzureCredential extends ChainedTokenCredential {
  /**
   * Creates an instance of the DefaultAzureCredential class.
   *
   * @param options - Options for configuring the client which makes the authentication request.
   */
  constructor(_tokenCredentialOptions?: TokenCredentialOptions) {
    super();
    logger.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }

  public getToken(): Promise<AccessToken> {
    logger.getToken.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }
}
