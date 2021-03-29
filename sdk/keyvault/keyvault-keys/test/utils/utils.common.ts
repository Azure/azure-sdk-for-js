// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SupportedVersions, supports } from "@azure/test-utils-multi-version";
import { env } from "@azure/test-utils-recorder";
import * as assert from "assert";
import { LATEST_API_VERSION } from "../../src/keysModels";

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

export function getServiceVersion(): string {
  if (!env.SERVICE_VERSION || env.SERVICE_VERSION === "latest") {
    return LATEST_API_VERSION;
  }

  return env.SERVICE_VERSION;
}

export function onVersions(supportedVersions: SupportedVersions) {
  return supports(getServiceVersion(), supportedVersions, supportedServiceVersions);
}

export const supportedServiceVersions = ["7.0", "7.1", "7.2"] as const;
