// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update certain properties of the Network Rack resource.
 *
 * @summary Update certain properties of the Network Rack resource.
 * x-ms-original-file: specification/managednetworkfabric/resource-manager/Microsoft.ManagedNetworkFabric/stable/2023-06-15/examples/NetworkRacks_Update_MaximumSet_Gen.json
 */

import type { TagsUpdate } from "@azure/arm-managednetworkfabric";
import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function networkRacksUpdateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MANAGEDNETWORKFABRIC_SUBSCRIPTION_ID"] || "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const resourceGroupName = process.env["MANAGEDNETWORKFABRIC_RESOURCE_GROUP"] || "example-rg";
  const networkRackName = "example-rack";
  const body: TagsUpdate = { tags: { keyID: "keyValue" } };
  const credential = new DefaultAzureCredential();
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkRacks.beginUpdateAndWait(
    resourceGroupName,
    networkRackName,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkRacksUpdateMaximumSetGen();
}

main().catch(console.error);
