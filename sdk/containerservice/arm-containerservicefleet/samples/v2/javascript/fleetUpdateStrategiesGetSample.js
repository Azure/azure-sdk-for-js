// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceFleetClient } = require("@azure/arm-containerservicefleet");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a FleetUpdateStrategy
 *
 * @summary get a FleetUpdateStrategy
 * x-ms-original-file: 2025-03-01/FleetUpdateStrategies_Get_MaximumSet_Gen.json
 */
async function getAFleetUpdateStrategyResourceGeneratedByMaximumSetRule() {
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
 * x-ms-original-file: 2025-03-01/UpdateStrategies_Get.json
 */
async function getAFleetUpdateStrategyResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.fleetUpdateStrategies.get("rg1", "fleet1", "strategy1");
  console.log(result);
}

async function main() {
  await getAFleetUpdateStrategyResourceGeneratedByMaximumSetRule();
  await getAFleetUpdateStrategyResource();
}

main().catch(console.error);
