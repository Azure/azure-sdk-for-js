// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/no-unused-vars */

import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-http";
import { TokenCredentialOptions } from "../client/identityClient";

const BrowserNotSupportedError = new Error(
  "ClientCertificateCredential is not supported in the browser."
);

export class ClientCertificateCredential implements TokenCredential {
  constructor(
    tenantId: string,
    clientId: string,
    certificatePath: string,
    options?: TokenCredentialOptions
  ) {
    throw BrowserNotSupportedError;
  }

  public getToken(
    scopes: string | string[],
    options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    throw BrowserNotSupportedError;
  }
}
