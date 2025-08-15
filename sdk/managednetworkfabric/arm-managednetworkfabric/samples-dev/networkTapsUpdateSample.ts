// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkTapPatch } from "@azure/arm-managednetworkfabric";
import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to API to update certain properties of the Network Tap resource.
 *
 * @summary API to update certain properties of the Network Tap resource.
 * x-ms-original-file: specification/managednetworkfabric/resource-manager/Microsoft.ManagedNetworkFabric/stable/2023-06-15/examples/NetworkTaps_Update_MaximumSet_Gen.json
 */
async function networkTapsUpdateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MANAGEDNETWORKFABRIC_SUBSCRIPTION_ID"] || "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const resourceGroupName = process.env["MANAGEDNETWORKFABRIC_RESOURCE_GROUP"] || "example-rg";
  const networkTapName = "example-networkTap";
  const body: NetworkTapPatch = {
    annotation: "annotation1",
    destinations: [
      {
        name: "example-destinaionName",
        destinationId:
          "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourcegroups/example-rg/providers/Microsoft.ManagedNetworkFabric/l3IsloationDomains/example-l3Domain/internalNetworks/example-internalNetwork",
        destinationTapRuleId:
          "/subscriptions/xxxx-xxxx-xxxx-xxxx/resourcegroups/example-rg/providers/Microsoft.ManagedNetworkFabric/networkTapRules/example-destinationTapRule",
        destinationType: "IsolationDomain",
        isolationDomainProperties: {
          encapsulation: "None",
          neighborGroupIds: [
            "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourcegroups/example-rg/providers/Microsoft.ManagedNetworkFabric/neighborGroups/example-neighborGroup",
          ],
        },
      },
    ],
    pollingType: "Pull",
    tags: { key6024: "1234" },
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkTaps.beginUpdateAndWait(
    resourceGroupName,
    networkTapName,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkTapsUpdateMaximumSetGen();
}

main().catch(console.error);
