// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to reschedules a maintenance event to a new date and time.
 *
 * @summary reschedules a maintenance event to a new date and time.
 * x-ms-original-file: 2026-04-01-preview/MaintenanceEventsReschedule.json
 */
async function rescheduleAMaintenanceEventToANewDateAndTime() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.maintenanceEvents.reschedule(
    "exampleresourcegroup",
    "exampleserver",
    "XXXX-111",
    { postponeToDateTime: new Date("2026-04-10T10:00:00+00:00") },
  );
  console.log(result);
}

async function main() {
  await rescheduleAMaintenanceEventToANewDateAndTime();
}

main().catch(console.error);
