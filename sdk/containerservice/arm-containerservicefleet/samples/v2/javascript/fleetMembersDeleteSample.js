// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceFleetClient } = require("@azure/arm-containerservicefleet");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a FleetMember
 *
 * @summary delete a FleetMember
 * x-ms-original-file: 2025-03-01/FleetMembers_Delete.json
 */
async function deletesAFleetMemberResourceAsynchronouslyWithALongRunningOperation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  await client.fleetMembers.delete("rg1", "fleet1", "member-1");
}

/**
 * This sample demonstrates how to delete a FleetMember
 *
 * @summary delete a FleetMember
 * x-ms-original-file: 2025-03-01/FleetMembers_Delete_MaximumSet_Gen.json
 */
async function deletesAFleetMemberResourceAsynchronouslyWithALongRunningOperationGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  await client.fleetMembers.delete("rgfleets", "fleet1", "fleet1", {
    ifMatch: "klroqfozx",
  });
}

async function main() {
  await deletesAFleetMemberResourceAsynchronouslyWithALongRunningOperation();
  await deletesAFleetMemberResourceAsynchronouslyWithALongRunningOperationGeneratedByMaximumSetRule();
}

main().catch(console.error);
