// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the access keys or Kerberos keys (if active directory enabled) for the specified storage account.
 *
 * @summary lists the access keys or Kerberos keys (if active directory enabled) for the specified storage account.
 * x-ms-original-file: 2026-04-01/StorageAccountListKeys.json
 */
async function storageAccountListKeys() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.listKeys("res418", "sto2220");
  console.log(result);
}

async function main() {
  await storageAccountListKeys();
}

main().catch(console.error);
