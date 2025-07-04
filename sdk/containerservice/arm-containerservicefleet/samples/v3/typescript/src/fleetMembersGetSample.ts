// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceFleetClient } from "@azure/arm-containerservicefleet";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a FleetMember
 *
 * @summary get a FleetMember
 * x-ms-original-file: 2025-03-01/FleetMembers_Get.json
 */
async function getsAFleetMemberResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.fleetMembers.get("rg1", "fleet1", "member-1");
  console.log(result);
}

/**
 * This sample demonstrates how to get a FleetMember
 *
 * @summary get a FleetMember
 * x-ms-original-file: 2025-03-01/FleetMembers_Get_MaximumSet_Gen.json
 */
async function getsAFleetMemberResourceGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.fleetMembers.get("rgfleets", "fleet1", "fleet1");
  console.log(result);
}

async function main(): Promise<void> {
  await getsAFleetMemberResource();
  await getsAFleetMemberResourceGeneratedByMaximumSetRule();
}

main().catch(console.error);
