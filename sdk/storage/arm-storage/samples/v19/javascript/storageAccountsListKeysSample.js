// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists the access keys or Kerberos keys (if active directory enabled) for the specified storage account.
 *
 * @summary Lists the access keys or Kerberos keys (if active directory enabled) for the specified storage account.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/StorageAccountListKeys.json
 */
async function storageAccountListKeys() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res418";
  const accountName = "sto2220";
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.listKeys(resourceGroupName, accountName);
  console.log(result);
}

async function main() {
  await storageAccountListKeys();
}

main().catch(console.error);
