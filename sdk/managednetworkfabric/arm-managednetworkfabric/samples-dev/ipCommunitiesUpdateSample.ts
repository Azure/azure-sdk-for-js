// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IpCommunityPatch } from "@azure/arm-managednetworkfabric";
import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to API to update certain properties of the IP Community resource.
 *
 * @summary API to update certain properties of the IP Community resource.
 * x-ms-original-file: specification/managednetworkfabric/resource-manager/Microsoft.ManagedNetworkFabric/stable/2023-06-15/examples/IpCommunities_Update_MaximumSet_Gen.json
 */
async function ipCommunitiesUpdateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MANAGEDNETWORKFABRIC_SUBSCRIPTION_ID"] || "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const resourceGroupName = process.env["MANAGEDNETWORKFABRIC_RESOURCE_GROUP"] || "example-rg";
  const ipCommunityName = "example-ipcommunity";
  const body: IpCommunityPatch = {
    ipCommunityRules: [
      {
        action: "Permit",
        communityMembers: ["1:1"],
        sequenceNumber: 4155123341,
        wellKnownCommunities: ["Internet"],
      },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.ipCommunities.beginUpdateAndWait(
    resourceGroupName,
    ipCommunityName,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await ipCommunitiesUpdateMaximumSetGen();
}

main().catch(console.error);
