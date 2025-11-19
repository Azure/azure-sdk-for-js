// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to implements IP Extended Community DELETE method.
 *
 * @summary implements IP Extended Community DELETE method.
 * x-ms-original-file: 2024-06-15-preview/IpExtendedCommunities_Delete.json
 */
async function ipExtendedCommunitiesDeleteMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  await client.ipExtendedCommunities.delete("example-rg", "example-ipExtendedCommunity");
}

async function main() {
  await ipExtendedCommunitiesDeleteMaximumSetGen();
}

main().catch(console.error);
