// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Asset
 *
 * @summary get a Asset
 * x-ms-original-file: 2024-11-01/Get_Asset.json
 */
async function getAsset(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.assets.Assets_get("myResourceGroup", "my-asset");
  console.log(result);
}

/**
 * This sample demonstrates how to get a Asset
 *
 * @summary get a Asset
 * x-ms-original-file: 2024-11-01/Get_Asset_With_SyncStatus.json
 */
async function getAssetWithSyncStatus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.assets.Assets_get("myResourceGroup", "my-asset");
  console.log(result);
}

async function main(): Promise<void> {
  await getAsset();
  getAssetWithSyncStatus();
}

main().catch(console.error);
