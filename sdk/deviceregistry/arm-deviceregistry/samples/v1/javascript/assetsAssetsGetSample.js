// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Asset
 *
 * @summary get a Asset
 * x-ms-original-file: 2024-11-01/Get_Asset.json
 */
async function getAsset() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.assets.get("myResourceGroup", "my-asset");
  console.log(result);
}

/**
 * This sample demonstrates how to get a Asset
 *
 * @summary get a Asset
 * x-ms-original-file: 2024-11-01/Get_Asset_With_SyncStatus.json
 */
async function getAssetWithSyncStatus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.assets.get("myResourceGroup", "my-asset");
  console.log(result);
}

async function main() {
  await getAsset();
  getAssetWithSyncStatus();
}

main().catch(console.error);
