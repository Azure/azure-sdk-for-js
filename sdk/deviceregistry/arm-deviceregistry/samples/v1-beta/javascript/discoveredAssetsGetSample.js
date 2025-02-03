// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a DiscoveredAsset
 *
 * @summary get a DiscoveredAsset
 * x-ms-original-file: 2024-09-01-preview/Get_DiscoveredAsset.json
 */
async function getDiscoveredAsset() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.discoveredAssets.get("myResourceGroup", "my-discoveredasset");
  console.log(result);
}

async function main() {
  getDiscoveredAsset();
}

main().catch(console.error);
