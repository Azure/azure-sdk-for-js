// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AccessToken, TokenCredential } from "@azure/core-auth";
import { credentialLogger, formatError } from "../util/logging";
import { AuthorizationCodeCredentialOptions } from "./authorizationCodeCredentialOptions";

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

  public getToken(): Promise<AccessToken | null> {
    logger.getToken.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }
}
