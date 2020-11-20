// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, AccessToken } from "@azure/core-http";
import { credentialLogger, formatError } from "../util/logging";

const BrowserNotSupportedError = new Error(
  "ClientCertificateCredential is not supported in the browser."
);
const logger = credentialLogger("ClientCertificateCredential");

export class ClientCertificateCredential implements TokenCredential {
  constructor() {
    logger.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }

  public getToken(): Promise<AccessToken | null> {
    logger.getToken.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }
}
