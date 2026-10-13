// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list NamespaceDiscoveredAsset resources by Namespace
 *
 * @summary list NamespaceDiscoveredAsset resources by Namespace
 * x-ms-original-file: 2026-11-01/List_NamespaceDiscoveredAssets_ByNamespace.json
 */
async function listNamespaceDiscoveredAssetsByNamespace() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.namespaceDiscoveredAssets.listByNamespace(
    "myResourceGroup",
    "my-namespace-1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listNamespaceDiscoveredAssetsByNamespace();
}

main().catch(console.error);
