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

/**
 * Common logs to emit when a credential has any form of error
 * @param credentialName Name of the credential
 * @param err Error
 */
export function logCredentialError(credentialName: string, err: Error): void {
	logger.error(`${credentialName} => ERROR:`, err);
}

/**
 * Common logs to emit when a getToken call fails
 * @param credentialName Name of the credential
 * @param err Error
 */
export function logGetTokenFailure(credentialName: string, err: Error): void {
	logger.error(`${credentialName} => ERROR in GetToken()`);
  logCredentialError(credentialName, err);
}

/**
 * Logs the common logs when a getToken call fails, and then throws the same received error.
 * TODO: Is it worth making a more abstract and curried version of this `logThrow` idea?
 * @param err Error
 */
export function logThrowGetTokenFailure(credentialName: string, error: Error | CredentialUnavailable) {
  logGetTokenFailure(credentialName, error);
  throw error;
}

/**
 * Logs the common logs when a credential fails, and then throws the same received error.
 * TODO: Is it worth making a more abstract and curried version of this `logThrow` idea?
 * @param err Error
 */
export function logThrowCredentialError(credentialName: string, error: Error | CredentialUnavailable) {
  logCredentialError(credentialName, error);
  throw error;
}

/**
 * Common logs to emit when a getToken succeeds
 * @param credentialName Name of the credential
 * @param scopes Authenticated scopes
 */
export function logGetTokenSuccess(credentialName: string, scopes: string[]): void {
  logger.info(`${credentialName} => GetToken() SUCCESS`);
  logger.info(`${credentialName} => Scopes: ${scopes.join(", ")}`);
}