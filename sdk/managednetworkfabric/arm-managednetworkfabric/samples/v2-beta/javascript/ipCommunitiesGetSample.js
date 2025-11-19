// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to implements an IP Community GET method.
 *
 * @summary implements an IP Community GET method.
 * x-ms-original-file: 2024-06-15-preview/IpCommunities_Get.json
 */
async function ipCommunitiesGetMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.ipCommunities.get("example-rg", "example-ipcommunity");
  console.log(result);
}

async function main() {
  await ipCommunitiesGetMaximumSetGen();
}

main().catch(console.error);
