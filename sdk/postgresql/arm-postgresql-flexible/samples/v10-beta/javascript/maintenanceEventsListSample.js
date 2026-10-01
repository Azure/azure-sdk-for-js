// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all maintenance events for a flexible server.
 *
 * @summary lists all maintenance events for a flexible server.
 * x-ms-original-file: 2026-04-01-preview/MaintenanceEventsListByServer.json
 */
async function listOngoingAndScheduledMaintenanceEventsForAServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.maintenanceEvents.list("exampleresourcegroup", "exampleserver")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all maintenance events for a flexible server.
 *
 * @summary lists all maintenance events for a flexible server.
 * x-ms-original-file: 2026-04-01-preview/MaintenanceEventsListByServerWithFilter.json
 */
async function listMaintenanceEventsFilteredByStatusForAServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.maintenanceEvents.list("exampleresourcegroup", "exampleserver", {
    maintenanceStatus: "Upcoming",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listOngoingAndScheduledMaintenanceEventsForAServer();
  await listMaintenanceEventsFilteredByStatusForAServer();
}

main().catch(console.error);
