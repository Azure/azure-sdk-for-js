// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { env } from "./recorder";
import { delay } from "@azure/core-http";

// Async iterator's polyfill for Node 8
if (!Symbol || !(Symbol as any).asyncIterator) {
  (Symbol as any).asyncIterator = Symbol.for("Symbol.asyncIterator");
}

export function getKeyvaultName(): string {
  const keyVaultEnvVarName = "KEYVAULT_NAME";
  const keyVaultName: string | undefined = env[keyVaultEnvVarName];

  if (!keyVaultName) {
    throw new Error(`${keyVaultEnvVarName} environment variable not specified.`);
  }

  return keyVaultName;
}

export type RetryFunction = () => Promise<any>;
export interface RetryOptions {
  retries: number;
  factor: number;
  minTimeout: number;
  maxTimeout: number;
}

/**
 * A simple abstraction to retry, and exponentially de-escalate retrying, a
 * given async function until it is fulfileld.
 * @param {RetryFunction} target The async function you want to retry.
 * @param {RetryOptions} options An object with configuration values.
 * @returns {Promise<any>} Resolved promise
 */
export async function retry(
  target: RetryFunction,
  { retries = 10, factor = 2, minTimeout = 1000, maxTimeout = Infinity }: RetryOptions
): Promise<any> {
  let timeout = minTimeout;
  let error: any;

  while (retries > 0 && timeout < maxTimeout) {
    try {
      return await target();
    } catch (e) {
      error = e;
    }
    if (retries) await delay(timeout);
    retries--;
    timeout *= factor;
  }

  if (error) throw error;
}
