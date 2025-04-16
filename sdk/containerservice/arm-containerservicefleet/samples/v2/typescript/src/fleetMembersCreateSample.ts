// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceFleetClient } from "@azure/arm-containerservicefleet";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a FleetMember
 *
 * @summary create a FleetMember
 * x-ms-original-file: 2025-03-01/FleetMembers_Create.json
 */
async function createsAFleetMemberResourceWithALongRunningOperation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.fleetMembers.create("rg1", "fleet1", "member-1", {
    properties: {
      clusterResourceId:
        "/subscriptions/subid1/resourcegroups/rg1/providers/Microsoft.ContainerService/managedClusters/cluster-1",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create a FleetMember
 *
 * @summary create a FleetMember
 * x-ms-original-file: 2025-03-01/FleetMembers_Create_MaximumSet_Gen.json
 */
async function createsAFleetMemberResourceWithALongRunningOperationGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.fleetMembers.create(
    "rgfleets",
    "fleet1",
    "fleet1",
    {
      properties: {
        clusterResourceId:
          "/subscriptions/subid1/resourcegroups/rg1/providers/Microsoft.ContainerService/managedClusters/cluster-1",
        group: "fleet1",
      },
    },
    { ifMatch: "amkttadbw", ifNoneMatch: "zoljoccbcg" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createsAFleetMemberResourceWithALongRunningOperation();
  await createsAFleetMemberResourceWithALongRunningOperationGeneratedByMaximumSetRule();
}

main().catch(console.error);
