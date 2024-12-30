// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a DiscoveredAssetEndpointProfile
 *
 * @summary get a DiscoveredAssetEndpointProfile
 * x-ms-original-file: 2024-09-01-preview/Get_DiscoveredAssetEndpointProfile.json
 */
async function getDiscoveredAssetEndpointProfile() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.discoveredAssetEndpointProfiles.get(
    "myResourceGroup",
    "my-discoveredassetendpointprofile",
  );
  console.log(result);
}

async function main() {
  getDiscoveredAssetEndpointProfile();
}

main().catch(console.error);
