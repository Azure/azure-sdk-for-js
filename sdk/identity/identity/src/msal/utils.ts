// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthenticationRecord, MsalAccountInfo, MsalToken, ValidMsalToken } from "./types";
import { AuthenticationRequiredError, CredentialUnavailableError } from "../errors";
import type { CredentialLogger } from "../util/logging";
import { credentialLogger, formatError } from "../util/logging";
import { DefaultAuthorityHost, DefaultTenantId } from "../constants";
import { randomUUID as coreRandomUUID, isNode, isNodeLike } from "@azure/core-util";

import { AbortError } from "@azure/abort-controller";
import type { AzureLogLevel } from "@azure/logger";
import type { GetTokenOptions } from "@azure/core-auth";
import { msalCommon } from "./msal";

export interface ILoggerCallback {
  (level: msalCommon.LogLevel, message: string, containsPii: boolean): void;
}

/**
 * @internal
 */
const logger = credentialLogger("IdentityUtils");

/**
 * Latest AuthenticationRecord version
 * @internal
 */
const LatestAuthenticationRecordVersion = "1.0";

/**
 * Ensures the validity of the MSAL token
 * @internal
 */
export function ensureValidMsalToken(
  scopes: string | string[],
  msalToken?: MsalToken | null,
  getTokenOptions?: GetTokenOptions,
): asserts msalToken is ValidMsalToken {
  const error = (message: string): Error => {
    logger.getToken.info(message);
    return new AuthenticationRequiredError({
      scopes: Array.isArray(scopes) ? scopes : [scopes],
      getTokenOptions,
      message,
    });
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
 * Returns the authority host from either the options bag or the AZURE_AUTHORITY_HOST environment variable.
 *
 * Defaults to {@link DefaultAuthorityHost}.
 * @internal
 */
export function getAuthorityHost(options?: { authorityHost?: string }): string {
  let authorityHost = options?.authorityHost;

  if (!authorityHost && isNodeLike) {
    authorityHost = process.env.AZURE_AUTHORITY_HOST;
  }

  return authorityHost ?? DefaultAuthorityHost;
}

/**
 * Generates a valid authority by combining a host with a tenantId.
 * @internal
 */
export function getAuthority(tenantId: string, host?: string): string {
  if (!host) {
    host = DefaultAuthorityHost;
  }
  if (new RegExp(`${tenantId}/?$`).test(host)) {
    return host;
  }
  if (host.endsWith("/")) {
    return host + tenantId;
  } else {
    return `${host}/${tenantId}`;
  }
}

/**
 * Generates the known authorities.
 * If the Tenant Id is `adfs`, the authority can't be validated since the format won't match the expected one.
 * For that reason, we have to force MSAL to disable validating the authority
 * by sending it within the known authorities in the MSAL configuration.
 * @internal
 */
export function getKnownAuthorities(
  tenantId: string,
  authorityHost: string,
  disableInstanceDiscovery?: boolean,
): string[] {
  if ((tenantId === "adfs" && authorityHost) || disableInstanceDiscovery) {
    return [authorityHost];
  }
  return [];
}

/**
 * Generates a logger that can be passed to the MSAL clients.
 * @param credLogger - The logger of the credential.
 * @internal
 */
export const defaultLoggerCallback: (
  logger: CredentialLogger,
  platform?: "Node" | "Browser",
) => ILoggerCallback =
  (credLogger: CredentialLogger, platform: "Node" | "Browser" = isNode ? "Node" : "Browser") =>
  (level, message, containsPii): void => {
    if (containsPii) {
      return;
    }
    switch (level) {
      case msalCommon.LogLevel.Error:
        credLogger.info(`MSAL ${platform} V2 error: ${message}`);
        return;
      case msalCommon.LogLevel.Info:
        credLogger.info(`MSAL ${platform} V2 info message: ${message}`);
        return;
      case msalCommon.LogLevel.Verbose:
        credLogger.info(`MSAL ${platform} V2 verbose message: ${message}`);
        return;
      case msalCommon.LogLevel.Warning:
        credLogger.info(`MSAL ${platform} V2 warning: ${message}`);
        return;
    }
  };

/**
 * @internal
 */
export function getMSALLogLevel(logLevel: AzureLogLevel | undefined): msalCommon.LogLevel {
  switch (logLevel) {
    case "error":
      return msalCommon.LogLevel.Error;
    case "info":
      return msalCommon.LogLevel.Info;
    case "verbose":
      return msalCommon.LogLevel.Verbose;
    case "warning":
      return msalCommon.LogLevel.Warning;
    default:
      // default msal logging level should be Info
      return msalCommon.LogLevel.Info;
  }
}

/**
 * Wraps core-util's randomUUID in order to allow for mocking in tests.
 * This prepares the library for the upcoming core-util update to ESM.
 *
 * @internal
 * @returns A string containing a random UUID
 */
export function randomUUID(): string {
  return coreRandomUUID();
}

/**
 * Handles MSAL errors.
 */
export function handleMsalError(
  scopes: string[],
  error: Error,
  getTokenOptions?: GetTokenOptions,
): Error {
  if (
    error.name === "AuthError" ||
    error.name === "ClientAuthError" ||
    error.name === "BrowserAuthError"
  ) {
    const msalError = error as msalCommon.AuthError;
    switch (msalError.errorCode) {
      case "endpoints_resolution_error":
        logger.info(formatError(scopes, error.message));
        return new CredentialUnavailableError(error.message);
      case "device_code_polling_cancelled":
        return new AbortError("The authentication has been aborted by the caller.");
      case "consent_required":
      case "interaction_required":
      case "login_required":
        logger.info(
          formatError(scopes, `Authentication returned errorCode ${msalError.errorCode}`),
        );
        break;
      default:
        logger.info(formatError(scopes, `Failed to acquire token: ${error.message}`));
        break;
    }
  }
  if (
    error.name === "ClientConfigurationError" ||
    error.name === "BrowserConfigurationAuthError" ||
    error.name === "AbortError" ||
    error.name === "AuthenticationError"
  ) {
    return error;
  }
  if (error.name === "NativeAuthError") {
    logger.info(
      formatError(
        scopes,
        `Error from the native broker: ${error.message} with status code: ${
          (error as any).statusCode
        }`,
      ),
    );
    return error;
  }
  return new AuthenticationRequiredError({ scopes, getTokenOptions, message: error.message });
}

// transformations.ts

export function publicToMsal(account: AuthenticationRecord): msalCommon.AccountInfo {
  const [environment] = account.authority.match(/([a-z]*\.[a-z]*\.[a-z]*)/) || [""];
  return {
    ...account,
    localAccountId: account.homeAccountId,
    environment,
  };
}

export function msalToPublic(clientId: string, account: MsalAccountInfo): AuthenticationRecord {
  const record = {
    authority: getAuthority(account.tenantId, account.environment),
    homeAccountId: account.homeAccountId,
    tenantId: account.tenantId || DefaultTenantId,
    username: account.username,
    clientId,
    version: LatestAuthenticationRecordVersion,
  };
  return record;
}

/**
 * Serializes an `AuthenticationRecord` into a string.
 *
 * The output of a serialized authentication record will contain the following properties:
 *
 * - "authority"
 * - "homeAccountId"
 * - "clientId"
 * - "tenantId"
 * - "username"
 * - "version"
 *
 * To later convert this string to a serialized `AuthenticationRecord`, please use the exported function `deserializeAuthenticationRecord()`.
 */
export function serializeAuthenticationRecord(record: AuthenticationRecord): string {
  return JSON.stringify(record);
}

/**
 * Deserializes a previously serialized authentication record from a string into an object.
 *
 * The input string must contain the following properties:
 *
 * - "authority"
 * - "homeAccountId"
 * - "clientId"
 * - "tenantId"
 * - "username"
 * - "version"
 *
 * If the version we receive is unsupported, an error will be thrown.
 *
 * At the moment, the only available version is: "1.0", which is always set when the authentication record is serialized.
 *
 * @param serializedRecord - Authentication record previously serialized into string.
 * @returns AuthenticationRecord.
 */
export function deserializeAuthenticationRecord(serializedRecord: string): AuthenticationRecord {
  const parsed: AuthenticationRecord & { version?: string } = JSON.parse(serializedRecord);

  if (parsed.version && parsed.version !== LatestAuthenticationRecordVersion) {
    throw Error("Unsupported AuthenticationRecord version");
  }

  return parsed;
}
