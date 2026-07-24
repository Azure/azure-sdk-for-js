// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import type { GitHubActionsCredentialOptions } from "./gitHubActionsCredentialOptions.js";
import { credentialLogger, formatError } from "../util/logging.js";

const BrowserNotSupportedError = new Error(
  "GitHubActionsCredential is not supported in the browser.",
);
const logger = credentialLogger("GitHubActionsCredential");

/**
 * Enables authentication to Microsoft Entra ID using GitHub Actions
 * OIDC federated identity credentials.
 */
export class GitHubActionsCredential implements TokenCredential {
  /**
   * Only available in Node.js
   */
  constructor(_options?: GitHubActionsCredentialOptions) {
    logger.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }

  public getToken(
    _scopes: string | string[],
    _options?: GetTokenOptions,
  ): Promise<AccessToken | null> {
    logger.getToken.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }
}
