// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information about a maintenance event for a HorizonDB pool.
 *
 * @summary gets information about a maintenance event for a HorizonDB pool.
 * x-ms-original-file: 2026-10-01-preview/MaintenanceEvents_Get.json
 */
async function getInformationAboutAMaintenanceEventForAHorizonDBPool() {
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

async function main() {
  await getInformationAboutAMaintenanceEventForAHorizonDBPool();
}

main().catch(console.error);
