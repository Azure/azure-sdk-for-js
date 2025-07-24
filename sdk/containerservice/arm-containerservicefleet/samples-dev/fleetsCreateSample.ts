// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceFleetClient } from "@azure/arm-containerservicefleet";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a Fleet.
 *
 * @summary creates or updates a Fleet.
 * x-ms-original-file: 2025-03-01/Fleets_CreateOrUpdate.json
 */
async function createsAFleetResourceWithALongRunningOperation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.fleets.create("rg1", "fleet1", {
    tags: { tier: "production", archv2: "" },
    location: "East US",
    properties: {
      hubProfile: {
        dnsPrefix: "dnsprefix1",
        agentProfile: { vmSize: "Standard_DS1" },
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a Fleet.
 *
 * @summary creates or updates a Fleet.
 * x-ms-original-file: 2025-03-01/Fleets_CreateOrUpdate_MaximumSet_Gen.json
 */
async function createsAFleetResourceWithALongRunningOperationGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.fleets.create(
    "rgfleets",
    "fleet1",
    {
      tags: {},
      location: "East US",
      properties: {
        hubProfile: {
          dnsPrefix: "dnsprefix1",
          agentProfile: {
            vmSize: "Standard_DS1",
            subnetId:
              "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rgfleets/providers/Microsoft.Network/virtualNetwork/myvnet/subnets/mysubnet1",
          },
          apiServerAccessProfile: {
            enablePrivateCluster: true,
            enableVnetIntegration: true,
            subnetId:
              "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rgfleets/providers/Microsoft.Network/virtualNetwork/myvnet/subnets/mysubnet1",
          },
        },
      },
      identity: { type: "None", userAssignedIdentities: { key126: {} } },
    },
    { ifMatch: "jzlrwaylijhsnzp", ifNoneMatch: "cqpzdjshmggwolagomzxfy" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createsAFleetResourceWithALongRunningOperation();
  await createsAFleetResourceWithALongRunningOperationGeneratedByMaximumSetRule();
}

main().catch(console.error);
