// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a NamespaceDiscoveredAsset
 *
 * @summary update a NamespaceDiscoveredAsset
 * x-ms-original-file: 2025-10-01/Update_NamespaceDiscoveredAsset.json
 */
async function updateNamespaceDiscoveredAsset() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.namespaceDiscoveredAssets.update(
    "myResourceGroup",
    "my-namespace-1",
    "my-discoveredasset-1",
    { properties: { documentationUri: "https://www.example.com/manual-2" } },
  );
  console.log(result);
}

async function main() {
  await updateNamespaceDiscoveredAsset();
}

main().catch(console.error);
