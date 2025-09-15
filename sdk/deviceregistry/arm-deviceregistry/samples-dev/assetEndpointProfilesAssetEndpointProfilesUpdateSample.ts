// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to update a AssetEndpointProfile
 *
 * @summary update a AssetEndpointProfile
 * x-ms-original-file: 2024-11-01/Update_AssetEndpointProfile.json
 */

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

async function updateAssetEndpointProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.assetEndpointProfiles.update(
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
