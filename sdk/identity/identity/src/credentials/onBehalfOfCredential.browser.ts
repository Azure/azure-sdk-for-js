// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, AccessToken } from "@azure/core-auth";
import { credentialLogger, formatError } from "../util/logging";

const credentialName = "OnBehalfOfCredential";
const BrowserNotSupportedError = new Error(`${credentialName}: Not supported in the browser.`);
const logger = credentialLogger(credentialName);

export class OnBehalfOfCredential implements TokenCredential {
  constructor() {
    logger.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }

  public getToken(): Promise<AccessToken | null> {
    logger.getToken.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }
}
