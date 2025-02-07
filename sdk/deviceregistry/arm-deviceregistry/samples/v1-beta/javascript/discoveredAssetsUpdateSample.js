// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a DiscoveredAsset
 *
 * @summary update a DiscoveredAsset
 * x-ms-original-file: 2024-09-01-preview/Update_DiscoveredAsset.json
 */
async function updateDiscoveredAsset() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.discoveredAssets.update("myResourceGroup", "my-discoveredasset", {
    properties: {
      documentationUri: "https://www.example.com/manual-2",
      defaultTopic: { path: "/path/defaultTopic", retain: "Never" },
    },
  });
  console.log(result);
}

async function main() {
  updateDiscoveredAsset();
}

main().catch(console.error);
