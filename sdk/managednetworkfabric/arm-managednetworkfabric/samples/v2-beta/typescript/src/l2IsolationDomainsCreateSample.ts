// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates layer 2 network connectivity between compute nodes within a rack and across racks.The configuration is applied on the devices only after the isolation domain is enabled.
 *
 * @summary creates layer 2 network connectivity between compute nodes within a rack and across racks.The configuration is applied on the devices only after the isolation domain is enabled.
 * x-ms-original-file: 2024-06-15-preview/L2IsolationDomains_Create.json
 */
async function l2IsolationDomainsCreateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.l2IsolationDomains.create("example-rg", "example-l2domain", {
    properties: {
      annotation: "annotation",
      networkFabricId:
        "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/networkFabrics/example-fabric",
      vlanId: 501,
      mtu: 1500,
      extendedVlan: "Enabled",
      networkToNetworkInterconnectId:
        "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/networkFabrics/example-fabric/networkToNetworkInterconnects/example-nni",
      administrativeState: "Enabled",
    },
    tags: { KeyId: "KeyValue" },
    location: "eastus",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await l2IsolationDomainsCreateMaximumSetGen();
}

main().catch(console.error);
