// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { env } from "@azure-tools/test-recorder";

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
  } catch (e: any) {
    console.log(`name: ${e.name}, message: ${e.message}`);
    if (e.name !== "AbortError") {
      throw e;
    }
  }
  if (passed) {
    throw new Error("Expected cb to throw an AbortError");
  }
}
