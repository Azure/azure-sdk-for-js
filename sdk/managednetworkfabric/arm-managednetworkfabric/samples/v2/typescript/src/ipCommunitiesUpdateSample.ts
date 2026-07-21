// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to aPI to update certain properties of the IP Community resource.
 *
 * @summary aPI to update certain properties of the IP Community resource.
 * x-ms-original-file: 2025-07-15/IpCommunities_Update.json
 */
async function ipCommunitiesUpdateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.ipCommunities.update("example-rg", "example-ipcommunity", {
    tags: { keyID: "KeyValue" },
    ipCommunityRules: [
      {
        action: "Permit",
        sequenceNumber: 4155123341,
        wellKnownCommunities: ["Internet"],
        communityMembers: ["1:1"],
      },
    ],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await ipCommunitiesUpdateMaximumSetGen();
}

main().catch(console.error);
