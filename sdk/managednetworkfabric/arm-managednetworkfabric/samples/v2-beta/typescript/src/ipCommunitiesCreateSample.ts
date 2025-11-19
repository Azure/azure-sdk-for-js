// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to implements an IP Community PUT method.
 *
 * @summary implements an IP Community PUT method.
 * x-ms-original-file: 2024-06-15-preview/IpCommunities_Create.json
 */
async function ipCommunitiesCreateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.ipCommunities.create("example-rg", "example-ipcommunity", {
    properties: {
      annotation: "annotation",
      ipCommunityRules: [
        {
          action: "Permit",
          sequenceNumber: 4155123341,
          wellKnownCommunities: ["Internet"],
          communityMembers: ["1:1"],
        },
      ],
      administrativeState: "Enabled",
    },
    tags: { KeyId: "KeyValue" },
    location: "eastus",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await ipCommunitiesCreateMaximumSetGen();
}

main().catch(console.error);
