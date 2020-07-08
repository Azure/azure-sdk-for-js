// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createClientLogger } from "@azure/logger";
import { TokenCredentialOptions } from '../client/identityClient';
import { CredentialUnavailable } from '../client/errors';

/**
 * The AzureLogger used for all clients within the identity package
 */
export const logger = createClientLogger("Azure Identity");

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
  const logLevel = process.env.AZURE_LOG_LEVEL
  if (logLevel === "warning" || logLevel === "error") {
    return;
  }
  const { assigned } = processEnvVars(supportedEnvVars);
  logger.info(
    `${credentialName} => Found the following environment variables: ${assigned.join(
      ", "
    )}`
  );
}
export interface NestedLogger {
  title: string;
  fullTitle: string;
  info(message: string): void;
  warning(message: string): void;
  success(scopes: string | string[]): void;
  error(err: Error): void;
  throwError(err: Error): never;
}

export function nestedLogger(title: string, parent?: NestedLogger): NestedLogger {
  const fullTitle = parent ? `${parent.fullTitle} ${title}` : title;

  function info(message: string): void {
  	logger.info(`${fullTitle} =>`, message);
  }
  function warning(message: string): void {
  	logger.warning(`${fullTitle} =>`, message);
  }
  function success(message: string): void {
    // let arrayScopes = Array.isArray(scopes) ? scopes : [scopes];
    logger.info(`${fullTitle} => SUCCESS:`, message);
  }
  function error(err: Error): void {
    logger.error(`${fullTitle} => ERROR:`, err);
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
  }
}

export interface CredentialLogger extends NestedLogger {
  getToken: NestedLogger;
}

export function credentialLogger(title: string, parent?: CredentialLogger): CredentialLogger {
  const logger = nestedLogger(title);
  return {
    ...logger,
    getToken: nestedLogger("getToken", logger)
  };
}