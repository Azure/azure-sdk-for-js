// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceFleetClient } from "@azure/arm-containerservicefleet";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list AutoUpgradeProfile resources by Fleet
 *
 * @summary list AutoUpgradeProfile resources by Fleet
 * x-ms-original-file: 2025-03-01/AutoUpgradeProfiles_ListByFleet.json
 */
async function listsTheAutoUpgradeProfileResourcesByFleet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.autoUpgradeProfiles.listByFleet("rg1", "fleet1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list AutoUpgradeProfile resources by Fleet
 *
 * @summary list AutoUpgradeProfile resources by Fleet
 * x-ms-original-file: 2025-03-01/AutoUpgradeProfiles_ListByFleet_MaximumSet_Gen.json
 */
async function listsTheAutoUpgradeProfileResourcesByFleetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.autoUpgradeProfiles.listByFleet("rgfleets", "fleet1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listsTheAutoUpgradeProfileResourcesByFleet();
  await listsTheAutoUpgradeProfileResourcesByFleetGeneratedByMaximumSetRule();
}

main().catch(console.error);
