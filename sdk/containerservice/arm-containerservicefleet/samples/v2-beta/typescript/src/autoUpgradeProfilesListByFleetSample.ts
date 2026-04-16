// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceFleetClient } from "@azure/arm-containerservicefleet";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list AutoUpgradeProfile resources by Fleet
 *
 * @summary list AutoUpgradeProfile resources by Fleet
 * x-ms-original-file: 2026-02-01-preview/AutoUpgradeProfiles_ListByFleet.json
 */
async function listsTheAutoUpgradeProfileResourcesByFleet(): Promise<void> {
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
}

main().catch(console.error);
