// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceFleetClient } from "@azure/arm-containerservicefleet";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list FleetUpdateStrategy resources by Fleet
 *
 * @summary list FleetUpdateStrategy resources by Fleet
 * x-ms-original-file: 2025-03-01/FleetUpdateStrategies_ListByFleet_MaximumSet_Gen.json
 */
async function listTheFleetUpdateStrategyResourcesByFleetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fleetUpdateStrategies.listByFleet(
    "rgfleets",
    "fleet1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list FleetUpdateStrategy resources by Fleet
 *
 * @summary list FleetUpdateStrategy resources by Fleet
 * x-ms-original-file: 2025-03-01/UpdateStrategies_ListByFleet.json
 */
async function listTheFleetUpdateStrategyResourcesByFleet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fleetUpdateStrategies.listByFleet(
    "rg1",
    "fleet1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listTheFleetUpdateStrategyResourcesByFleetGeneratedByMaximumSetRule();
  await listTheFleetUpdateStrategyResourcesByFleet();
}

main().catch(console.error);
