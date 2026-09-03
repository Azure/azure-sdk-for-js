// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all the encryption scopes available under the specified storage account.
 *
 * @summary lists all the encryption scopes available under the specified storage account.
 * x-ms-original-file: 2026-04-01/StorageAccountEncryptionScopeList.json
 */
async function storageAccountEncryptionScopeList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.encryptionScopes.list("resource-group-name", "accountname")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await storageAccountEncryptionScopeList();
}

main().catch(console.error);
