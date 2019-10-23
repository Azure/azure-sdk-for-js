// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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

export async function assertThrowsAbortError(cb: () => Promise<any>) {
  try {
    await cb();
    assert.fail("Expected cb to throw an AbortError");
  } catch (e) {
    assert.equal(e.name, "AbortError");
    assert.equal(e.message, "The operation was aborted.");
  }
}
