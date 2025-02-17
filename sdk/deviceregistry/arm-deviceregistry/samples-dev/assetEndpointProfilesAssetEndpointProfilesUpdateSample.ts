// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a AssetEndpointProfile
 *
 * @summary update a AssetEndpointProfile
 * x-ms-original-file: 2024-11-01/Update_AssetEndpointProfile.json
 */
async function updateAssetEndpointProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.assetEndpointProfiles.AssetEndpointProfiles_update(
    "myResourceGroup",
    "my-assetendpointprofile",
    {
      properties: {
        targetAddress: "https://www.example.com/myTargetAddress",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateAssetEndpointProfile();
}

main().catch(console.error);
