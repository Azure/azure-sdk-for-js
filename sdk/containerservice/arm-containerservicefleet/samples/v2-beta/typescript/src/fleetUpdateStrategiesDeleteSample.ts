// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceFleetClient } from "@azure/arm-containerservicefleet";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a FleetUpdateStrategy
 *
 * @summary delete a FleetUpdateStrategy
 * x-ms-original-file: 2026-02-01-preview/UpdateStrategies_Delete.json
 */
async function deleteAFleetUpdateStrategyResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  await client.fleetUpdateStrategies.delete("rg1", "fleet1", "strategy1");
}

async function main(): Promise<void> {
  await deleteAFleetUpdateStrategyResource();
}

main().catch(console.error);
