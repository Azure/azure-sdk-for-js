// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/no-unused-vars */

import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-http";
import { TokenCredentialOptions } from "../client/identityClient";
import { credentialLogger } from "../util/logging";

const BrowserNotSupportedError = new Error(
  "ClientCertificateCredential is not supported in the browser."
);
const logger = credentialLogger("ClientCertificateCredential");

export class ClientCertificateCredential implements TokenCredential {
  constructor(
    tenantId: string,
    clientId: string,
    certificatePath: string,
    options?: TokenCredentialOptions
  ) {
    logger.error(BrowserNotSupportedError);
    throw BrowserNotSupportedError;
  }

  public getToken(
    scopes: string | string[],
    options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    logger.getToken.error(BrowserNotSupportedError);
    throw BrowserNotSupportedError;
  }
}
