// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to displays NeighborGroups list by resource group GET method.
 *
 * @summary displays NeighborGroups list by resource group GET method.
 * x-ms-original-file: 2025-07-15/NeighborGroups_ListByResourceGroup.json
 */
async function neighborGroupsListByResourceGroupMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.neighborGroups.listByResourceGroup("example-rg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await neighborGroupsListByResourceGroupMaximumSetGen();
}

main().catch(console.error);
