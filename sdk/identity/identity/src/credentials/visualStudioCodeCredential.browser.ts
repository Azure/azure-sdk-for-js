// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, AccessToken } from "@azure/core-auth";

import { credentialLogger, formatError } from "../util/logging";

const BrowserNotSupportedError = new Error(
  "VisualStudioCodeCredential is not supported in the browser."
);
const logger = credentialLogger("VisualStudioCodeCredential");

export const vsCodeCredentialControl = {
  set vsCodeCredentialFinder(_finder: never) {
    throw new Error(
      "Attempted to register a VisualStudioCodeCredential provider extension in the browser. This environment is not supported by VisualStudioCodeCredential."
    );
  }
};

export class VisualStudioCodeCredential implements TokenCredential {
  constructor() {
    logger.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }

  public getToken(): Promise<AccessToken | null> {
    logger.getToken.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }
}
