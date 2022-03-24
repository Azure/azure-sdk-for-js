// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, AccessToken } from "@azure/core-auth";

import { TokenCredentialOptions } from "../../identity/src/tokenCredentialOptions";
import { credentialLogger, formatError } from "../../identity/src/util/logging";
import { SPACredentialOptions } from "./options";

const BrowserNotSupportedError = new Error("PopupCredential is not supported in Node.js");
const logger = credentialLogger("PopupCredential");

export class PopupCredential implements TokenCredential {
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
