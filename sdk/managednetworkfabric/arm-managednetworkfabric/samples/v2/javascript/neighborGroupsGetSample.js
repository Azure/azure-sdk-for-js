// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureNetworkFabricManagementServiceAPI } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the Neighbor Group.
 *
 * @summary gets the Neighbor Group.
 * x-ms-original-file: 2025-07-15/NeighborGroups_Get.json
 */
async function neighborGroupsGetMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.neighborGroups.get("example-rg", "example-neighborGroup");
  console.log(result);
}

async function main() {
  await neighborGroupsGetMaximumSetGen();
}

main().catch(console.error);
