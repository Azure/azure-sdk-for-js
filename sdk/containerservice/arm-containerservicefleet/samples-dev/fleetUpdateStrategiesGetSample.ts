// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to get a FleetUpdateStrategy
 *
 * @summary get a FleetUpdateStrategy
 * x-ms-original-file: 2025-04-01-preview/FleetUpdateStrategies_Get_MaximumSet_Gen.json
 */

import { ContainerServiceFleetClient } from "@azure/arm-containerservicefleet";
import { DefaultAzureCredential } from "@azure/identity";

async function getAFleetUpdateStrategyResourceGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.fleetUpdateStrategies.get("rgfleets", "fleet1", "fleet1");
  console.log(result);
}

/**
 * This sample demonstrates how to get a FleetUpdateStrategy
 *
 * @summary get a FleetUpdateStrategy
 * x-ms-original-file: 2025-04-01-preview/UpdateStrategies_Get.json
 */
async function getAFleetUpdateStrategyResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.fleetUpdateStrategies.get("rg1", "fleet1", "strategy1");
  console.log(result);
}

async function main(): Promise<void> {
  await getAFleetUpdateStrategyResourceGeneratedByMaximumSetRule();
  await getAFleetUpdateStrategyResource();
}

main().catch(console.error);
