// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloud } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a new layer 3 (L3) network or update the properties of the existing network.
 *
 * @summary create a new layer 3 (L3) network or update the properties of the existing network.
 * x-ms-original-file: 2026-05-01-preview/L3Networks_Create.json
 */
async function createOrUpdateL3Network(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.l3Networks.createOrUpdate("resourceGroupName", "l3NetworkName", {
    extendedLocation: {
      name: "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.ExtendedLocation/customLocations/clusterExtendedLocationName",
      type: "CustomLocation",
    },
    location: "location",
    interfaceName: "eth0",
    ipAllocationType: "DualStack",
    ipv4ConnectedPrefix: "198.51.100.0/24",
    ipv6ConnectedPrefix: "2001:db8::/64",
    l3IsolationDomainId:
      "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/l3IsolationDomainName",
    vlan: 12,
    tags: { key1: "myvalue1", key2: "myvalue2" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateL3Network();
}

main().catch(console.error);
