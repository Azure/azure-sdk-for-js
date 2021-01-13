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

// The property in the clients is called vaultUrl, but the environment variable is KEYVAULT_URI.
export function getKeyVaultUrl(): string {
  const keyVaultEnvVarName = "KEYVAULT_URI";
  const result: string | undefined = env[keyVaultEnvVarName];
  console.log("keyVaultEnvVarName", result);
  return result!;
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

export function formatName(name: string): string {
  return name.replace(/[^0-9a-zA-Z-]/g, "");
}

// Receives:
//   https://uri.blob.core.windows.net/backup/<id>
// Splits into:
//   ["https:", "", "uri.blob.core.windows.net", "backup", "<id>"]
// Returns:
//   "<id>"
export function getFolderName(uri: string): string {
  return uri.split("/")[4];
}
