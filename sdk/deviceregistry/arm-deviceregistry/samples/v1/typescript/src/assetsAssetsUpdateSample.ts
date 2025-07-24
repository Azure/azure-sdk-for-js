// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a Asset
 *
 * @summary update a Asset
 * x-ms-original-file: 2024-11-01/Update_Asset.json
 */
async function updateAsset(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.assets.update("myResourceGroup", "my-asset", {
    properties: { enabled: false, displayName: "NewAssetDisplayName" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateAsset();
}

main().catch(console.error);
