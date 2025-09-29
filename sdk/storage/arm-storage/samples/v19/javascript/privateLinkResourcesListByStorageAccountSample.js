// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets the private link resources that need to be created for a storage account.
 *
 * @summary Gets the private link resources that need to be created for a storage account.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/StorageAccountListPrivateLinkResources.json
 */
async function storageAccountListPrivateLinkResources() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res6977";
  const accountName = "sto2527";
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.privateLinkResources.listByStorageAccount(
    resourceGroupName,
    accountName,
  );
  console.log(result);
}

async function main() {
  await storageAccountListPrivateLinkResources();
}

main().catch(console.error);
