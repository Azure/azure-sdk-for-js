// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about a maintenance event for a HorizonDB pool.
 *
 * @summary gets information about a maintenance event for a HorizonDB pool.
 * x-ms-original-file: 2026-10-01-preview/MaintenanceEvents_Get.json
 */
async function getInformationAboutAMaintenanceEventForAHorizonDBPool(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.maintenanceEvents.get(
    "example-resource-group",
    "example-cluster",
    "example-pool-01",
    "ABCD-123",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getInformationAboutAMaintenanceEventForAHorizonDBPool();
}

main().catch(console.error);
