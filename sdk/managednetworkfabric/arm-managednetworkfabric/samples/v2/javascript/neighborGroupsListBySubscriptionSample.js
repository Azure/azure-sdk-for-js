// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureNetworkFabricManagementServiceAPI } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to displays NeighborGroups list by subscription GET method.
 *
 * @summary displays NeighborGroups list by subscription GET method.
 * x-ms-original-file: 2025-07-15/NeighborGroups_ListBySubscription.json
 */
async function neighborGroupsListBySubscriptionMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.neighborGroups.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await neighborGroupsListBySubscriptionMaximumSetGen();
}

main().catch(console.error);
