// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, AccessToken } from "@azure/core-auth";
import { credentialLogger, formatError } from "../util/logging";

const BrowserNotSupportedError = new Error(
  "ClientCertificateCredential is not supported in the browser."
);
const logger = credentialLogger("ClientCertificateCredential");

/**
 * Enables authentication to Azure Active Directory using a PEM-encoded
 * certificate that is assigned to an App Registration.
 */
export class ClientCertificateCredential implements TokenCredential {
  /**
   * Only available in Node.js
   */
  constructor() {
    logger.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }

  public getToken(): Promise<AccessToken | null> {
    logger.getToken.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }
}
