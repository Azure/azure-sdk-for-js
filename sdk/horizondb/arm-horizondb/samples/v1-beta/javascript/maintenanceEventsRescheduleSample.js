// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to reschedules a maintenance event to a new date and time.
 *
 * @summary reschedules a maintenance event to a new date and time.
 * x-ms-original-file: 2026-10-01-preview/MaintenanceEvents_Reschedule.json
 */
async function rescheduleAMaintenanceEventForAHorizonDBPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.maintenanceEvents.reschedule(
    "example-resource-group",
    "example-cluster",
    "example-pool-01",
    "ABCD-123",
    { postponeToDateTimeUtc: new Date("2026-08-20T10:00:00Z") },
  );
  console.log(result);
}

async function main() {
  await rescheduleAMaintenanceEventForAHorizonDBPool();
}

main().catch(console.error);
