// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to regenerates one of the access keys or Kerberos keys for the specified storage account.
 *
 * @summary regenerates one of the access keys or Kerberos keys for the specified storage account.
 * x-ms-original-file: 2025-08-01/StorageAccountRegenerateKerbKey.json
 */
async function storageAccountRegenerateKerbKey(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.regenerateKey("res4167", "sto3539", {
    keyName: "kerb1",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to regenerates one of the access keys or Kerberos keys for the specified storage account.
 *
 * @summary regenerates one of the access keys or Kerberos keys for the specified storage account.
 * x-ms-original-file: 2025-08-01/StorageAccountRegenerateKey.json
 */
async function storageAccountRegenerateKey(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.regenerateKey("res4167", "sto3539", {
    keyName: "key2",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await storageAccountRegenerateKerbKey();
  await storageAccountRegenerateKey();
}

main().catch(console.error);
