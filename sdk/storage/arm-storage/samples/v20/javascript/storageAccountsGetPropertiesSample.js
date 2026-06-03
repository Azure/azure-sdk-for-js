// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns the properties for the specified storage account including but not limited to name, SKU name, location, and account status. The ListKeys operation should be used to retrieve storage keys.
 *
 * @summary returns the properties for the specified storage account including but not limited to name, SKU name, location, and account status. The ListKeys operation should be used to retrieve storage keys.
 * x-ms-original-file: 2025-08-01/StorageAccountGetAsyncSkuConversionStatus.json
 */
async function storageAccountGetAsyncSkuConversionStatus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.getProperties("res9407", "sto8596");
  console.log(result);
}

/**
 * This sample demonstrates how to returns the properties for the specified storage account including but not limited to name, SKU name, location, and account status. The ListKeys operation should be used to retrieve storage keys.
 *
 * @summary returns the properties for the specified storage account including but not limited to name, SKU name, location, and account status. The ListKeys operation should be used to retrieve storage keys.
 * x-ms-original-file: 2025-08-01/StorageAccountGetProperties.json
 */
async function storageAccountGetProperties() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.getProperties("res9407", "sto8596");
  console.log(result);
}

/**
 * This sample demonstrates how to returns the properties for the specified storage account including but not limited to name, SKU name, location, and account status. The ListKeys operation should be used to retrieve storage keys.
 *
 * @summary returns the properties for the specified storage account including but not limited to name, SKU name, location, and account status. The ListKeys operation should be used to retrieve storage keys.
 * x-ms-original-file: 2025-08-01/StorageAccountGetPropertiesCMKEnabled.json
 */
async function storageAccountGetPropertiesCMKEnabled() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.getProperties("res9407", "sto8596");
  console.log(result);
}

/**
 * This sample demonstrates how to returns the properties for the specified storage account including but not limited to name, SKU name, location, and account status. The ListKeys operation should be used to retrieve storage keys.
 *
 * @summary returns the properties for the specified storage account including but not limited to name, SKU name, location, and account status. The ListKeys operation should be used to retrieve storage keys.
 * x-ms-original-file: 2025-08-01/StorageAccountGetPropertiesCMKVersionExpirationTime.json
 */
async function storageAccountGetPropertiesCMKVersionExpirationTime() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.getProperties("res9407", "sto8596");
  console.log(result);
}

/**
 * This sample demonstrates how to returns the properties for the specified storage account including but not limited to name, SKU name, location, and account status. The ListKeys operation should be used to retrieve storage keys.
 *
 * @summary returns the properties for the specified storage account including but not limited to name, SKU name, location, and account status. The ListKeys operation should be used to retrieve storage keys.
 * x-ms-original-file: 2025-08-01/StorageAccountGetPropertiesGeoReplicationStatscanFailoverFalse.json
 */
async function storageAccountGetPropertiesGeoReplicationStatscanFailoverFalse() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.getProperties("res9407", "sto8596", {
    expand: "geoReplicationStats",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to returns the properties for the specified storage account including but not limited to name, SKU name, location, and account status. The ListKeys operation should be used to retrieve storage keys.
 *
 * @summary returns the properties for the specified storage account including but not limited to name, SKU name, location, and account status. The ListKeys operation should be used to retrieve storage keys.
 * x-ms-original-file: 2025-08-01/StorageAccountGetPropertiesGeoReplicationStatscanFailoverTrue.json
 */
async function storageAccountGetPropertiesGeoReplicationStatscanFailoverTrue() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.getProperties("res9407", "sto8596", {
    expand: "geoReplicationStats",
  });
  console.log(result);
}

async function main() {
  await storageAccountGetAsyncSkuConversionStatus();
  await storageAccountGetProperties();
  await storageAccountGetPropertiesCMKEnabled();
  await storageAccountGetPropertiesCMKVersionExpirationTime();
  await storageAccountGetPropertiesGeoReplicationStatscanFailoverFalse();
  await storageAccountGetPropertiesGeoReplicationStatscanFailoverTrue();
}

main().catch(console.error);
