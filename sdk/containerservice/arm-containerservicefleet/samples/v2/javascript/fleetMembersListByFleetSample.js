// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceFleetClient } = require("@azure/arm-containerservicefleet");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list FleetMember resources by Fleet
 *
 * @summary list FleetMember resources by Fleet
 * x-ms-original-file: 2025-03-01/FleetMembers_ListByFleet.json
 */
async function listsTheMembersOfAFleet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fleetMembers.listByFleet("rg1", "fleet1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list FleetMember resources by Fleet
 *
 * @summary list FleetMember resources by Fleet
 * x-ms-original-file: 2025-03-01/FleetMembers_ListByFleet_MaximumSet_Gen.json
 */
async function listsTheMembersOfAFleetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fleetMembers.listByFleet("rgfleets", "fleet1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listsTheMembersOfAFleet();
  await listsTheMembersOfAFleetGeneratedByMaximumSetRule();
}

main().catch(console.error);
