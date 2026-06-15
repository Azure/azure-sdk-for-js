// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureNetworkFabricManagementServiceAPI } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to resync the Neighbor Group after a configuration change.
 *
 * @summary resync the Neighbor Group after a configuration change.
 * x-ms-original-file: 2025-07-15/NeighborGroups_Resync.json
 */
async function neighborGroupsResync() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.neighborGroups.resync("example-rg", "example-neighborgroup");
  console.log(result);
}

async function main() {
  await neighborGroupsResync();
}

main().catch(console.error);
