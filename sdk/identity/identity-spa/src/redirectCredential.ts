// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, AccessToken } from "@azure/core-auth";

import { TokenCredentialOptions } from "../../identity/src/tokenCredentialOptions";
import { credentialLogger, formatError } from "../../identity/src/util/logging";
import { SPACredentialOptions } from "./options";

const BrowserNotSupportedError = new Error("RedirectCredential is not supported in Node.js");
const logger = credentialLogger("RedirectCredential");

export class RedirectCredential implements TokenCredential {
  /**
   * Only available in Node.js
   */
  constructor(options: SPACredentialOptions);
  constructor() {
    logger.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }

  public getToken(): Promise<AccessToken | null> {
    logger.getToken.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }
}
