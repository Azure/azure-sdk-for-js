// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to API to update certain properties of the IP Extended Community resource.
 *
 * @summary API to update certain properties of the IP Extended Community resource.
 * x-ms-original-file: specification/managednetworkfabric/resource-manager/Microsoft.ManagedNetworkFabric/stable/2023-06-15/examples/IpExtendedCommunities_Update_MaximumSet_Gen.json
 */

import type { IpExtendedCommunityPatch } from "@azure/arm-managednetworkfabric";
import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function ipExtendedCommunitiesUpdateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MANAGEDNETWORKFABRIC_SUBSCRIPTION_ID"] || "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const resourceGroupName = process.env["MANAGEDNETWORKFABRIC_RESOURCE_GROUP"] || "example-rg";
  const ipExtendedCommunityName = "example-ipExtendedCommunity";
  const body: IpExtendedCommunityPatch = {
    ipExtendedCommunityRules: [
      {
        action: "Permit",
        routeTargets: ["1234:2345"],
        sequenceNumber: 4155123341,
      },
    ],
    tags: { keyID: "KeyValue" },
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.ipExtendedCommunities.beginUpdateAndWait(
    resourceGroupName,
    ipExtendedCommunityName,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await ipExtendedCommunitiesUpdateMaximumSetGen();
}

main().catch(console.error);
