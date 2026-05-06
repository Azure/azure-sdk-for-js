// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudClient } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a new layer 2 (L2) network or update the properties of the existing network.
 *
 * @summary create a new layer 2 (L2) network or update the properties of the existing network.
 * x-ms-original-file: 2026-05-01-preview/L2Networks_Create.json
 */
async function createOrUpdateL2Network(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.l2Networks.createOrUpdate("resourceGroupName", "l2NetworkName", {
    extendedLocation: {
      name: "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.ExtendedLocation/customLocations/clusterExtendedLocationName",
      type: "CustomLocation",
    },
    location: "location",
    hybridAksPluginType: "DPDK",
    interfaceName: "eth0",
    l2IsolationDomainId:
      "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.ManagedNetworkFabric/l2IsolationDomains/l2IsolationDomainName",
    tags: { key1: "myvalue1", key2: "myvalue2" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateL2Network();
}

main().catch(console.error);
