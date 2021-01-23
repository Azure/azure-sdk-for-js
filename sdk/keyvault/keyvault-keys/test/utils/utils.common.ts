// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env } from "@azure/test-utils-recorder";
import * as assert from "assert";

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

export async function assertThrowsAbortError(cb: () => Promise<any>): Promise<void> {
  let passed = false;
  try {
    await cb();
    passed = true;
  } catch (e) {
    console.log(`name: ${e.name}, message: ${e.message}`);
    assert.equal(e.name, "AbortError");
    assert.equal(e.message, "The operation was aborted.");
  }
  if (passed) {
    throw new Error("Expected cb to throw an AbortError");
  }
}

/**
/**
 * Assert that the provided asyncFunction throws an Error. If the expectedError is undefined, then
 * this function will just assert that an Error was thrown. If the expectedError is defined, then
 * this function will assert that the Error that was thrown is equal to the provided expectedError.
 * @param asyncFunction - The asynchronous function that is expected to thrown an Error.
 * @param expectedError - The Error that is expected to be thrown.
 */
export async function throwsAsync<T>(
  asyncFunction: (() => Promise<T>) | Promise<T>,
  expectedError?: ((error: Error) => void) | Error
): Promise<Error> {
  let thrownError: Error | undefined;

  try {
    await (typeof asyncFunction === "function" ? asyncFunction() : asyncFunction);
  } catch (error) {
    thrownError = error;
  }

  if (!thrownError) {
    assert.throws(() => {
      // Nothing to do here.
    });
  } else if (expectedError instanceof Error) {
    assert.deepEqual(thrownError, expectedError);
  } else if (expectedError) {
    expectedError(thrownError);
  }

  return thrownError!;
}
