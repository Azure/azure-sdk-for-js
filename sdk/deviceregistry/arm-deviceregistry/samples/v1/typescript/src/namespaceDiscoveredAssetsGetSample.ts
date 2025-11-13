// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a NamespaceDiscoveredAsset
 *
 * @summary get a NamespaceDiscoveredAsset
 * x-ms-original-file: 2025-10-01/Get_NamespaceDiscoveredAsset.json
 */
async function getNamespaceDiscoveredAsset(): Promise<void> {
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

async function main(): Promise<void> {
  await getNamespaceDiscoveredAsset();
}

main().catch(console.error);
