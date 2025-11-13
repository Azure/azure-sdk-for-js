// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to aPI to update certain properties of the IP Extended Community resource.
 *
 * @summary aPI to update certain properties of the IP Extended Community resource.
 * x-ms-original-file: 2024-06-15-preview/IpExtendedCommunities_Update.json
 */
async function ipExtendedCommunitiesUpdateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.ipExtendedCommunities.update(
    "example-rg",
    "example-ipExtendedCommunity",
    {
      tags: { KeyId: "KeyValue" },
      properties: {
        ipExtendedCommunityRules: [
          {
            action: "Permit",
            sequenceNumber: 4155123341,
            routeTargets: ["1234:2345"],
          },
        ],
        annotation: "annotation",
      },
    },
  );
  console.log(result);
}

async function main() {
  await ipExtendedCommunitiesUpdateMaximumSetGen();
}

main().catch(console.error);
