// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import { credentialLogger, formatError } from "../util/logging.js";
import type { AuthorizationCodeCredentialOptions } from "./authorizationCodeCredentialOptions.js";

const BrowserNotSupportedError = new Error(
  "AuthorizationCodeCredential is not supported in the browser. InteractiveBrowserCredential is more appropriate for this use case.",
);
const logger = credentialLogger("AuthorizationCodeCredential");

export class AuthorizationCodeCredential implements TokenCredential {
  /**
   * Only available in Node.js
   */
  constructor(
    tenantId: string | "common",
    clientId: string,
    clientSecret: string,
    authorizationCode: string,
    redirectUri: string,
    options?: AuthorizationCodeCredentialOptions,
  );
  constructor(
    tenantId: string | "common",
    clientId: string,
    authorizationCode: string,
    redirectUri: string,
    options?: AuthorizationCodeCredentialOptions,
  );
  constructor() {
    logger.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }

  public getToken(_scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken | null> {
    logger.getToken.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }
}
