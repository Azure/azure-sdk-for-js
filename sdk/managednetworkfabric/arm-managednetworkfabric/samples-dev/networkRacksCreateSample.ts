// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkRack } from "@azure/arm-managednetworkfabric";
import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create Network Rack resource.
 *
 * @summary Create Network Rack resource.
 * x-ms-original-file: specification/managednetworkfabric/resource-manager/Microsoft.ManagedNetworkFabric/stable/2023-06-15/examples/NetworkRacks_Create_MaximumSet_Gen.json
 */
async function networkRacksCreateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MANAGEDNETWORKFABRIC_SUBSCRIPTION_ID"] || "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const resourceGroupName = process.env["MANAGEDNETWORKFABRIC_RESOURCE_GROUP"] || "example-rg";
  const networkRackName = "example-rack";
  const body: NetworkRack = {
    annotation: "annotation",
    location: "eastuseuap",
    networkFabricId:
      "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourcegroups/example-rg/providers/Microsoft.ManagedNetworkFabric/networkFabrics/example-networkFabric",
    networkRackType: "Aggregate",
    tags: { keyID: "keyValue" },
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkRacks.beginCreateAndWait(
    resourceGroupName,
    networkRackName,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkRacksCreateMaximumSetGen();
}

main().catch(console.error);
