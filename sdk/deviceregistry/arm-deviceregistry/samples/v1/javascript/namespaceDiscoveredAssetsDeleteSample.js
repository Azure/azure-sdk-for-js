// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a NamespaceDiscoveredAsset
 *
 * @summary delete a NamespaceDiscoveredAsset
 * x-ms-original-file: 2025-10-01/Delete_NamespaceDiscoveredAsset.json
 */
async function deleteNamespaceDiscoveredAsset() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  await client.namespaceDiscoveredAssets.delete(
    "myResourceGroup",
    "my-namespace-1",
    "my-discoveredasset-1",
  );
}

async function main() {
  await deleteNamespaceDiscoveredAsset();
}

main().catch(console.error);
