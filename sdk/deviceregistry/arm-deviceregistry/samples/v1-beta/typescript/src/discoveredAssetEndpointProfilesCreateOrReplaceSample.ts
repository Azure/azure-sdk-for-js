// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a DiscoveredAssetEndpointProfile
 *
 * @summary create a DiscoveredAssetEndpointProfile
 * x-ms-original-file: 2024-09-01-preview/Create_DiscoveredAssetEndpointProfile.json
 */
async function createDiscoveredAssetEndpointProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.discoveredAssetEndpointProfiles.createOrReplace(
    "myResourceGroup",
    "my-discoveredassetendpointprofile",
    {
      location: "West Europe",
      extendedLocation: {
        type: "CustomLocation",
        name: "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/myResourceGroup/providers/microsoft.extendedlocation/customlocations/location1",
      },
      tags: { site: "building-1" },
      properties: {
        targetAddress: "https://www.example.com/myTargetAddress",
        additionalConfiguration: '{"foo": "bar"}',
        discoveryId: "11111111-1111-1111-1111-111111111111",
        version: 73766,
        endpointProfileType: "myEndpointProfileType",
        supportedAuthenticationMethods: ["Anonymous", "Certificate", "UsernamePassword"],
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  createDiscoveredAssetEndpointProfile();
}

main().catch(console.error);
