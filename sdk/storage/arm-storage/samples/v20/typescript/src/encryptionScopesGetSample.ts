// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns the properties for the specified encryption scope.
 *
 * @summary returns the properties for the specified encryption scope.
 * x-ms-original-file: 2026-04-01/StorageAccountGetEncryptionScope.json
 */
async function storageAccountGetEncryptionScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.encryptionScopes.get(
    "resource-group-name",
    "accountname",
    "{encryption-scope-name}",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await storageAccountGetEncryptionScope();
}

main().catch(console.error);
