// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceFleetClient } from "@azure/arm-containerservicefleet";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a FleetMember
 *
 * @summary get a FleetMember
 * x-ms-original-file: 2026-02-01-preview/FleetMembers_Get.json
 */
async function getsAFleetMemberResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.fleetMembers.get("rgfleets", "fleet1", "fleet1");
  console.log(result);
}

async function main(): Promise<void> {
  await getsAFleetMemberResource();
}

main().catch(console.error);
