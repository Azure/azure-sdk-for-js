// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureNetworkFabricManagementServiceAPI } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to implements IP Extended Community GET method.
 *
 * @summary implements IP Extended Community GET method.
 * x-ms-original-file: 2025-07-15/IpExtendedCommunities_Get.json
 */
async function ipExtendedCommunitiesGetMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.ipExtendedCommunities.get(
    "example-rg",
    "example-ipExtendedCommunity",
  );
  console.log(result);
}

async function main() {
  await ipExtendedCommunitiesGetMaximumSetGen();
}

main().catch(console.error);
