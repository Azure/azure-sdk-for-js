// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/no-unused-vars */

import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-http";
import { TokenCredentialOptions } from '../client/identityClient';
import { credentialLogger, CredentialLogger } from '../util/logging';

const BrowserNotSupportedError = new Error("VSCodeCredential is not supported in the browser.");

export class VSCodeCredential implements TokenCredential {
  private logger: CredentialLogger;

  constructor(
    options?: TokenCredentialOptions
  ) {
    this.logger = credentialLogger(this.constructor.name);
    this.logger.throwError(BrowserNotSupportedError);
  }

  public getToken(
    scopes: string | string[],
    options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    this.logger.throwError(BrowserNotSupportedError);
  }
}
