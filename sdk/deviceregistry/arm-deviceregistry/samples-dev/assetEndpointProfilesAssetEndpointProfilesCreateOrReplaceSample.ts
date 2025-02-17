// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a AssetEndpointProfile
 *
 * @summary create a AssetEndpointProfile
 * x-ms-original-file: 2024-11-01/Create_AssetEndpointProfile.json
 */
async function createAssetEndpointProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.assetEndpointProfiles.AssetEndpointProfiles_createOrReplace(
    "myResourceGroup",
    "my-assetendpointprofile",
    {
      location: "West Europe",
      extendedLocation: {
        type: "CustomLocation",
        name: "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/myResourceGroup/providers/microsoft.extendedlocation/customlocations/location1",
      },
      tags: { site: "building-1" },
      properties: {
        targetAddress: "https://www.example.com/myTargetAddress",
        endpointProfileType: "myEndpointProfileType",
        authentication: { method: "Anonymous" },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a AssetEndpointProfile
 *
 * @summary create a AssetEndpointProfile
 * x-ms-original-file: 2024-11-01/Create_AssetEndpointProfile_With_DiscoveredAepRef.json
 */
async function createAssetEndpointProfileWithDiscoveredAepRef(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.assetEndpointProfiles.AssetEndpointProfiles_createOrReplace(
    "myResourceGroup",
    "my-assetendpointprofile",
    {
      location: "West Europe",
      extendedLocation: {
        type: "CustomLocation",
        name: "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/myResourceGroup/providers/microsoft.extendedlocation/customlocations/location1",
      },
      tags: { site: "building-1" },
      properties: {
        targetAddress: "https://www.example.com/myTargetAddress",
        endpointProfileType: "myEndpointProfileType",
        discoveredAssetEndpointProfileRef: "discoveredAssetEndpointProfile1",
        authentication: { method: "Anonymous" },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createAssetEndpointProfile();
  createAssetEndpointProfileWithDiscoveredAepRef();
}

main().catch(console.error);
