// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, AccessToken } from "@azure/core-http";
import { TokenCredentialOptions } from "../client/identityClient";
import { credentialLogger, formatError } from "../util/logging";

const BrowserNotSupportedError = new Error(
  "AuthorizationCodeCredential is not supported in the browser.  InteractiveBrowserCredential is more appropriate for this use case."
);
const logger = credentialLogger("AuthorizationCodeCredential");

export class AuthorizationCodeCredential implements TokenCredential {
  constructor(
    tenantId: string | "common",
    clientId: string,
    clientSecret: string,
    authorizationCode: string,
    redirectUri: string,
    options?: TokenCredentialOptions
  );
  constructor(
    tenantId: string | "common",
    clientId: string,
    authorizationCode: string,
    redirectUri: string,
    options?: TokenCredentialOptions
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
