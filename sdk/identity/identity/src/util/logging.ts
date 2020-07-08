// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createClientLogger, AzureLogger } from "@azure/logger";
import { TokenCredentialOptions } from "../client/identityClient";
import { CredentialUnavailable } from "../client/errors";

/**
 * The AzureLogger used for all clients within the identity package
 */
export const logger = createClientLogger("identity");

interface EnvironmentAccumulator {
  missing: string[];
  assigned: string[];
}

/**
 * Separates a list of environment variable names into a plain object with two arrays: an array of missing environment variables and another array with assigned environment variables.
 * @param supportedEnvVars List of environment variable names
 */
export function processEnvVars(supportedEnvVars: string[]): EnvironmentAccumulator {
  return supportedEnvVars.reduce(
    (acc: EnvironmentAccumulator, envVariable: string) => {
      if (process.env[envVariable]) {
        acc.assigned.push(envVariable);
      } else {
        acc.missing.push(envVariable);
      }
      return acc;
    },
    { missing: [], assigned: [] }
  );
}

/**
 * Based on a given list of environment variable names,
 * logs the environment variables currently assigned during the usage of a credential that goes by the given name.
 * Logs nothing if the log level is "warning" or "error".
 * @param credentialName Name of the credential in use
 * @param supportedEnvVars List of environment variables supported by that credential
 */
export function logEnvVars(credentialName: string, supportedEnvVars: string[]): void {
  // Logs nothing if the log level is "warning" or "error".
  const logLevel = process.env.AZURE_LOG_LEVEL;
  if (logLevel === "warning" || logLevel === "error") {
    return;
  }
  const { assigned } = processEnvVars(supportedEnvVars);
  logger.info(
    `${credentialName} => Found the following environment variables: ${assigned.join(", ")}`
  );
}

/**
 * A CredentialLoggerInstance represents a logger used either at a credentials' constructor, or at its methods.
 */
export interface CredentialLoggerInstance {
  title: string;
  fullTitle: string;
  info(message: string): void;
  warning(message: string): void;
  success(scopes: string | string[]): void;
  error(err: Error): void;
  throwError(err: Error): never;
}

/**
 * Generates a CredentialLoggerInstance, which represents a logger used either at a credentials' constructor, or at its methods.
 *
 * It logs with the formats:
 *
 *   [title] => [message]
 *   [title] => Success: [message]
 *   [title] => Error: [message]
 *
 */
export function credentialLoggerInstance(
  title: string,
  parent?: CredentialLoggerInstance,
  log: AzureLogger = logger
): CredentialLoggerInstance {
  const fullTitle = parent ? `${parent.fullTitle} ${title}` : title;

  function info(message: string): void {
    log.info(`${fullTitle} =>`, message);
  }
  function warning(message: string): void {
    log.warning(`${fullTitle} =>`, message);
  }
  function success(message: string): void {
    log.info(`${fullTitle} => Success:`, message);
  }
  function error(err: Error): void {
    log.error(`${fullTitle} =>`, err);
  }
  function throwError(err: Error | CredentialUnavailable): never {
    error(err);
    throw err;
  }

  return {
    title,
    fullTitle,
    info,
    warning,
    success,
    error,
    throwError
  };
}

/**
 * A CredentialLogger is a logger declared at the credential's constructor, and used at any point in the credential.
 * It has all the properties of a CredentialLoggerInstance, plus other logger instances, one per method.
 */
export interface CredentialLogger extends CredentialLoggerInstance {
  getToken: CredentialLoggerInstance;
}

/**
 * Generates a CredentialLogger, which is a logger declared at the credential's constructor, and used at any point in the credential.
 * It has all the properties of a CredentialLoggerInstance, plus other logger instances, one per method.
 *
 * At the getToken method level, it logs with the formats:
 *
 *   [title] => getToken => [message]
 *   [title] => getToken => Success: [message]
 *   [title] => getToken => Error: [message]
 *
 */
export function credentialLogger(title: string, log: AzureLogger = logger): CredentialLogger {
  const logger = credentialLoggerInstance(title, undefined, log);
  return {
    ...logger,
    getToken: credentialLoggerInstance("=> getToken()", logger, log)
  };
}
