// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a Network Tap.
 *
 * @summary creates a Network Tap.
 * x-ms-original-file: 2024-06-15-preview/NetworkTaps_Create.json
 */
async function networkTapsCreateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.networkTaps.create("example-rg", "example-networkTap", {
    properties: {
      annotation: "annotation",
      networkPacketBrokerId:
        "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourcegroups/example-rg/providers/Microsoft.ManagedNetworkFabric/networkPacketBrokers/example-networkPacketBroker",
      destinations: [
        {
          name: "example-destinaionName",
          destinationType: "IsolationDomain",
          destinationId:
            "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourcegroups/example-rg/providers/Microsoft.ManagedNetworkFabric/l3IsloationDomains/example-l3Domain/internalNetworks/example-internalNetwork",
          isolationDomainProperties: {
            encapsulation: "None",
            neighborGroupIds: [
              "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourcegroups/example-rg/providers/Microsoft.ManagedNetworkFabric/neighborGroups/example-neighborGroup",
            ],
          },
          destinationTapRuleId:
            "/subscriptions/xxxx-xxxx-xxxx-xxxx/resourcegroups/example-rg/providers/Microsoft.ManagedNetworkFabric/networkTapRules/example-destinationTapRule",
        },
      ],
      pollingType: "Pull",
      administrativeState: "Enabled",
    },
    tags: { keyId: "keyValue" },
    location: "eastuseuap",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await networkTapsCreateMaximumSetGen();
}

main().catch(console.error);
