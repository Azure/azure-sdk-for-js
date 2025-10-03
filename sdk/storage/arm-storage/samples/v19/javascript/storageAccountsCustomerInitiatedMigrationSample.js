// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Account Migration request can be triggered for a storage account to change its redundancy level. The migration updates the non-zonal redundant storage account to a zonal redundant account or vice-versa in order to have better reliability and availability. Zone-redundant storage (ZRS) replicates your storage account synchronously across three Azure availability zones in the primary region.
 *
 * @summary Account Migration request can be triggered for a storage account to change its redundancy level. The migration updates the non-zonal redundant storage account to a zonal redundant account or vice-versa in order to have better reliability and availability. Zone-redundant storage (ZRS) replicates your storage account synchronously across three Azure availability zones in the primary region.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/StorageAccountPostMigration.json
 */
async function storageAccountPostMigration() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "resource-group-name";
  const accountName = "accountname";
  const parameters = { targetSkuName: "Standard_ZRS" };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.beginCustomerInitiatedMigrationAndWait(
    resourceGroupName,
    accountName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await storageAccountPostMigration();
}

main().catch(console.error);
