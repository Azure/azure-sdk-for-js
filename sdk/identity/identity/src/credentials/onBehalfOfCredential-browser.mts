// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import type { OnBehalfOfCredentialOptions } from "./onBehalfOfCredentialOptions.js";
import { credentialLogger, formatError } from "../util/logging.js";

const credentialName = "OnBehalfOfCredential";
const BrowserNotSupportedError = new Error(`${credentialName}: Not supported in the browser.`);
const logger = credentialLogger(credentialName);

/**
 * Enables authentication to Microsoft Entra ID using the [On Behalf Of flow](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-on-behalf-of-flow).
 */
export class OnBehalfOfCredential implements TokenCredential {
  /**
   * Only available in Node.js
   */
  constructor(_options: OnBehalfOfCredentialOptions) {
    logger.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }

  public getToken(_scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken | null> {
    logger.getToken.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }
}
