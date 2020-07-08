// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/no-unused-vars */

import { AccessToken, TokenCredential, GetTokenOptions } from "@azure/core-http";
import { TokenCredentialOptions } from "../client/identityClient";
import { credentialLogger, CredentialLogger } from '../util/logging';

const BrowserNotSupportedError = new Error(
  "EnvironmentCredential is not supported in the browser."
);

export class EnvironmentCredential implements TokenCredential {
  private logger: CredentialLogger;

  constructor(options?: TokenCredentialOptions) {
    this.logger = credentialLogger(this.constructor.name);
    this.logger.throwError(BrowserNotSupportedError);
  }

  getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken | null> {
    this.logger.throwError(BrowserNotSupportedError);
  }
}
