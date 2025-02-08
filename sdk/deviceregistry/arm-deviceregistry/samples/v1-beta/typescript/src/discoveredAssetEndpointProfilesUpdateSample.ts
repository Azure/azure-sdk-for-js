// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a DiscoveredAssetEndpointProfile
 *
 * @summary update a DiscoveredAssetEndpointProfile
 * x-ms-original-file: 2024-09-01-preview/Update_DiscoveredAssetEndpointProfile.json
 */
async function updateDiscoveredAssetEndpointProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.discoveredAssetEndpointProfiles.update(
    "myResourceGroup",
    "my-discoveredassetendpointprofile",
    {
      properties: {
        targetAddress: "https://www.example.com/myTargetAddress",
        additionalConfiguration: '{"foo": "bar"}',
        discoveryId: "11111111-1111-1111-1111-111111111111",
        version: 73766,
        endpointProfileType: "myEndpointProfileType",
        supportedAuthenticationMethods: ["Anonymous", "Certificate"],
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  updateDiscoveredAssetEndpointProfile();
}

main().catch(console.error);
