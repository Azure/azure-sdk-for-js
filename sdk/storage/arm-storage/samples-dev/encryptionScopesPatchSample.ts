// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update encryption scope properties as specified in the request body. Update fails if the specified encryption scope does not already exist.
 *
 * @summary update encryption scope properties as specified in the request body. Update fails if the specified encryption scope does not already exist.
 * x-ms-original-file: 2026-04-01/StorageAccountPatchEncryptionScope.json
 */
async function storageAccountPatchEncryptionScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.encryptionScopes.patch(
    "resource-group-name",
    "accountname",
    "{encryption-scope-name}",
    {
      keyVaultProperties: {
        keyUri: "https://testvault.vault.core.windows.net/keys/key1/863425f1358359c",
      },
      source: "Microsoft.KeyVault",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await storageAccountPatchEncryptionScope();
}

main().catch(console.error);
