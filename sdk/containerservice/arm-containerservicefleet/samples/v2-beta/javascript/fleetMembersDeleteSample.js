// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceFleetClient } = require("@azure/arm-containerservicefleet");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a FleetMember
 *
 * @summary delete a FleetMember
 * x-ms-original-file: 2026-02-01-preview/FleetMembers_Delete.json
 */
async function deletesAFleetMemberResourceAsynchronouslyWithALongRunningOperation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  await client.fleetMembers.delete("rg1", "fleet1", "member-1");
}

async function main() {
  await deletesAFleetMemberResourceAsynchronouslyWithALongRunningOperation();
}

main().catch(console.error);
