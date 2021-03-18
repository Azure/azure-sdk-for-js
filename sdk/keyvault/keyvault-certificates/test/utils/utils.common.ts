// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env } from "@azure/test-utils-recorder";
import * as assert from "assert";
import { LATEST_API_VERSION } from "../../src/certificatesModels";

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
 * A helper method to set the service versions we want to test against.
 *
 * It will always return at least the version defined in {@link LATEST_API_VERSION}
 * but may return additional versions if they are set in a `SERVICE_VERSIONS` environment variable (comma separated).
 * @returns An array of service versions to test against.
 */
export function getVersionsToTest(): Array<string> {
  const serviceVersions: Array<string> = [];
  console.log("env.SERVICE_VERSIONS", env.SERVICE_VERSIONS);
  if (env.SERVICE_VERSIONS) {
    serviceVersions.concat(env.SERVICE_VERSIONS.split(","));
  }

  if (!serviceVersions.includes(LATEST_API_VERSION)) {
    serviceVersions.push(LATEST_API_VERSION);
  }
  console.log("Returning service versions: ", serviceVersions);
  return serviceVersions;
}
