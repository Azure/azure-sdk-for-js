// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Returns the properties for the specified storage account including but not limited to name, SKU name, location, and account status. The ListKeys operation should be used to retrieve storage keys.
 *
 * @summary Returns the properties for the specified storage account including but not limited to name, SKU name, location, and account status. The ListKeys operation should be used to retrieve storage keys.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/StorageAccountGetAsyncSkuConversionStatus.json
 */
async function storageAccountGetAsyncSkuConversionStatus() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res9407";
  const accountName = "sto8596";
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.getProperties(resourceGroupName, accountName);
  console.log(result);
}

/**
 * This sample demonstrates how to Returns the properties for the specified storage account including but not limited to name, SKU name, location, and account status. The ListKeys operation should be used to retrieve storage keys.
 *
 * @summary Returns the properties for the specified storage account including but not limited to name, SKU name, location, and account status. The ListKeys operation should be used to retrieve storage keys.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/StorageAccountGetProperties.json
 */
async function storageAccountGetProperties() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res9407";
  const accountName = "sto8596";
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.getProperties(resourceGroupName, accountName);
  console.log(result);
}

/**
 * This sample demonstrates how to Returns the properties for the specified storage account including but not limited to name, SKU name, location, and account status. The ListKeys operation should be used to retrieve storage keys.
 *
 * @summary Returns the properties for the specified storage account including but not limited to name, SKU name, location, and account status. The ListKeys operation should be used to retrieve storage keys.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/StorageAccountGetPropertiesCMKEnabled.json
 */
async function storageAccountGetPropertiesCmkEnabled() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res9407";
  const accountName = "sto8596";
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.getProperties(resourceGroupName, accountName);
  console.log(result);
}

/**
 * This sample demonstrates how to Returns the properties for the specified storage account including but not limited to name, SKU name, location, and account status. The ListKeys operation should be used to retrieve storage keys.
 *
 * @summary Returns the properties for the specified storage account including but not limited to name, SKU name, location, and account status. The ListKeys operation should be used to retrieve storage keys.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/StorageAccountGetPropertiesCMKVersionExpirationTime.json
 */
async function storageAccountGetPropertiesCmkVersionExpirationTime() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res9407";
  const accountName = "sto8596";
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.getProperties(resourceGroupName, accountName);
  console.log(result);
}

/**
 * This sample demonstrates how to Returns the properties for the specified storage account including but not limited to name, SKU name, location, and account status. The ListKeys operation should be used to retrieve storage keys.
 *
 * @summary Returns the properties for the specified storage account including but not limited to name, SKU name, location, and account status. The ListKeys operation should be used to retrieve storage keys.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/StorageAccountGetPropertiesGeoReplicationStatscanFailoverFalse.json
 */
async function storageAccountGetPropertiesGeoReplicationStatscanFailoverFalse() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res9407";
  const accountName = "sto8596";
  const expand = "geoReplicationStats";
  const options = { expand };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.getProperties(
    resourceGroupName,
    accountName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Returns the properties for the specified storage account including but not limited to name, SKU name, location, and account status. The ListKeys operation should be used to retrieve storage keys.
 *
 * @summary Returns the properties for the specified storage account including but not limited to name, SKU name, location, and account status. The ListKeys operation should be used to retrieve storage keys.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/StorageAccountGetPropertiesGeoReplicationStatscanFailoverTrue.json
 */
async function storageAccountGetPropertiesGeoReplicationStatscanFailoverTrue() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res9407";
  const accountName = "sto8596";
  const expand = "geoReplicationStats";
  const options = { expand };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.getProperties(
    resourceGroupName,
    accountName,
    options,
  );
  console.log(result);
}

async function main() {
  await storageAccountGetAsyncSkuConversionStatus();
  await storageAccountGetProperties();
  await storageAccountGetPropertiesCmkEnabled();
  await storageAccountGetPropertiesCmkVersionExpirationTime();
  await storageAccountGetPropertiesGeoReplicationStatscanFailoverFalse();
  await storageAccountGetPropertiesGeoReplicationStatscanFailoverTrue();
}

main().catch(console.error);
