// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureNetworkFabricManagementServiceAPI } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to implements IP Extended Community PUT method.
 *
 * @summary implements IP Extended Community PUT method.
 * x-ms-original-file: 2025-07-15/IpExtendedCommunities_Create.json
 */
async function ipExtendedCommunitiesCreateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.ipExtendedCommunities.create(
    "example-rg",
    "example-ipExtendedCommunity",
    {
      annotation: "annotation",
      ipExtendedCommunityRules: [
        { action: "Permit", sequenceNumber: 4155123341, routeTargets: ["1234:2345"] },
      ],
      tags: { KeyId: "KeyValue" },
      location: "eastus",
    },
  );
  console.log(result);
}

async function main() {
  await ipExtendedCommunitiesCreateMaximumSetGen();
}

main().catch(console.error);
