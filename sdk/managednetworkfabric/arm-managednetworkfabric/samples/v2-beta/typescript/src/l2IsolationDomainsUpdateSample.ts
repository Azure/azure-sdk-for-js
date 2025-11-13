// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to aPI to update certain properties of the L2 Isolation Domain resource.
 *
 * @summary aPI to update certain properties of the L2 Isolation Domain resource.
 * x-ms-original-file: 2024-06-15-preview/L2IsolationDomains_Update.json
 */
async function l2IsolationDomainsUpdateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.l2IsolationDomains.update("example-rg", "example-l2domain", {
    tags: { KeyId: "KeyValue" },
    properties: {
      annotation: "annotation1",
      mtu: 6000,
      networkToNetworkInterconnectId:
        "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/networkFabrics/example-fabric/networkToNetworkInterconnects/example-nni",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await l2IsolationDomainsUpdateMaximumSetGen();
}

main().catch(console.error);
