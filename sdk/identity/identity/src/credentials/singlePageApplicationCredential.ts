// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, TokenCredential } from "@azure/core-http";
import { credentialLogger, formatError } from "../util/logging";
import { AuthenticationRecord } from "../msal/types";
import { SinglePageApplicationCredentialOptions } from "./singlePageApplicationCredentialOptions";

const NodeNotSupportedError = new Error(
  "SinglePageApplicationCredential is not supported in NodeJS."
);
const logger = credentialLogger("SinglePageApplicationCredential");

/**
 * Enables authentication to Azure Active Directory inside of the web browser
 * using the authorization code flow.
 *
 * This credential is not supported on NodeJS.
 */
export class SinglePageApplicationCredential implements TokenCredential {
  /**
   * This credential is not supported on NodeJS.
   */
  constructor(_options: SinglePageApplicationCredentialOptions) {
    logger.info(formatError("", NodeNotSupportedError));
    throw NodeNotSupportedError;
  }

  /**
   * This credential is not supported on NodeJS.
   */
  public getToken(): Promise<AccessToken> {
    logger.getToken.info(formatError("", NodeNotSupportedError));
    throw NodeNotSupportedError;
  }

  /**
   * This credential is not supported on NodeJS.
   */
  async authenticate(): Promise<AuthenticationRecord | undefined> {
    logger.getToken.info(formatError("", NodeNotSupportedError));
    throw NodeNotSupportedError;
  }
}
