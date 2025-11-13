// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to aPI to update certain properties of the Network Tap resource.
 *
 * @summary aPI to update certain properties of the Network Tap resource.
 * x-ms-original-file: 2024-06-15-preview/NetworkTaps_Update.json
 */
async function networkTapsUpdateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.networkTaps.update("example-rg", "example-networkTap", {
    tags: { keyId: "keyValue" },
    properties: {
      annotation: "annotation1",
      pollingType: "Pull",
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
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await networkTapsUpdateMaximumSetGen();
}

main().catch(console.error);
