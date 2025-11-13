// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to implements Neighbor Group DELETE method.
 *
 * @summary implements Neighbor Group DELETE method.
 * x-ms-original-file: 2024-06-15-preview/NeighborGroups_Delete.json
 */
async function neighborGroupsDeleteMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  await client.neighborGroups.delete("example-rg", "example-neighborGroup");
}

async function main() {
  await neighborGroupsDeleteMaximumSetGen();
}

main().catch(console.error);
