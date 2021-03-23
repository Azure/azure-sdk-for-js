// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as msalNode from "@azure/msal-node";
import * as msalCommon from "@azure/msal-common";
import { AccessToken } from "@azure/core-http";
import { v4 as uuidv4 } from "uuid";
import { CredentialLogger, formatError, formatSuccess } from "../util/logging";
import { CredentialUnavailable } from "../client/errors";
import { DefaultAuthorityHost } from "../constants";
import { AuthenticationRecord, MsalResult, MsalToken } from "./types";
import { AuthenticationRequired } from "./errors";
import { MsalFlowOptions } from "./flows";
import { msalToPublic } from "./transformations";

/**
 * Ensures the validity of the MSAL token
 * @internal
 */
export function ensureValidMsalToken(logger: CredentialLogger, msalToken?: MsalToken): void {
  const error = (message: string): Error => {
    logger.getToken.info(message);
    return new AuthenticationRequired(message);
  };
  if (!msalToken) {
    throw error("No response");
  }
  if (!msalToken.expiresOn) {
    throw error(`Response had no "expiresOn" property.`);
  }
  if (!msalToken.accessToken) {
    throw error(`Response had no "accessToken" property.`);
  }
}

/**
 * Generates a valid authorityHost by combining a host with a tenantId.
 * @internal
 */
export function getAuthorityHost(tenantId: string, host: string = DefaultAuthorityHost): string {
  if (host.endsWith("/")) {
    return host + tenantId;
  } else {
    return `${host}/${tenantId}`;
  }
}

/**
 * Generates the known authorities.
 * If the tenantId is "adfs", we will return an array with the authorityHost as the only known authority.
 * Otherwise, it is safe to return an empty array.
 * @internal
 */
export function getKnownAuthorities(tenantId: string, authorityHost: string): string[] {
  if (tenantId === "adfs" && authorityHost) {
    return [authorityHost];
  }
  return [];
}

/**
 * Generates a logger that can be passed to the MSAL clients.
 * @param logger - The logger of the credential.
 * @internal
 */
export const defaultLoggerCallback: (logger: CredentialLogger) => msalCommon.ILoggerCallback = (
  logger: CredentialLogger
) => (level, message, containsPii): void => {
  if (containsPii) {
    return;
  }
  switch (level) {
    case msalNode.LogLevel.Error:
      logger.info(`MSAL Browser V2 error: ${message}`);
      return;
    case msalNode.LogLevel.Info:
      logger.info(`MSAL Browser V2 info message: ${message}`);
      return;
    case msalNode.LogLevel.Verbose:
      logger.info(`MSAL Browser V2 verbose message: ${message}`);
      return;
    case msalNode.LogLevel.Warning:
      logger.info(`MSAL Browser V2 warning: ${message}`);
      return;
  }
};

/**
 * The common utility functions for the MSAL clients.
 * Defined as a class so that the classes extending this one can have access to its methods and protected properties.
 *
 * It keeps track of a logger and an in-memory copy of the AuthenticationRecord.
 *
 * @internal
 */
export class MsalBaseUtilities {
  protected logger: CredentialLogger;
  protected account: AuthenticationRecord | undefined;

  constructor(options: MsalFlowOptions) {
    this.logger = options.logger;
    this.account = options.authenticationRecord;
  }

  /**
   * Generates a UUID
   */
  generateUuid(): string {
    return uuidv4();
  }

  /**
   * Handles the MSAL authentication result.
   * If the result has an account, we update the local account reference.
   * If the token received is invalid, an error will be thrown depending on what's missing.
   */
  protected handleResult(scopes: string | string[], result?: MsalResult): AccessToken {
    if (result?.account) {
      this.account = msalToPublic(result.account);
    }
    ensureValidMsalToken(this.logger, result);
    this.logger.getToken.info(formatSuccess(scopes));
    return {
      token: result!.accessToken!,
      expiresOnTimestamp: result!.expiresOn!.getTime()
    };
  }

  /**
   * Handles MSAL errors.
   */
  protected handleError(scopes: string[], error: Error): Error {
    if (error instanceof msalCommon.AuthError) {
      switch (error.errorCode) {
        case "endpoints_resolution_error":
          this.logger.info(formatError(scopes, error.message));
          return new CredentialUnavailable(error.message);
        case "consent_required":
        case "interaction_required":
        case "login_required":
          this.logger.info(
            formatError(scopes, `Authentication returned errorCode ${error.errorCode}`)
          );
          break;
        default:
          this.logger.info(formatError(scopes, `Failed to acquire token: ${error.message}`));
          break;
      }
    }
    if (error instanceof msalCommon.ClientConfigurationError) {
      return error;
    }
    if (error.name === "AbortError") {
      return error;
    }
    return new AuthenticationRequired(error.message);
  }
}
