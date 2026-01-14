// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a NamespaceDiscoveredAsset
 *
 * @summary get a NamespaceDiscoveredAsset
 * x-ms-original-file: 2025-10-01/Get_NamespaceDiscoveredAsset.json
 */
async function getNamespaceDiscoveredAsset() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.namespaceDiscoveredAssets.get(
    "myResourceGroup",
    "my-namespace-1",
    "my-discoveredasset-1",
  );
  console.log(result);
}

async function main() {
  await getNamespaceDiscoveredAsset();
}

main().catch(console.error);
