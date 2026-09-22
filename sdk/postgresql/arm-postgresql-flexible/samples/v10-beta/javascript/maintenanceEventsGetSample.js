// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information about a maintenance event for a flexible server.
 *
 * @summary gets information about a maintenance event for a flexible server.
 * x-ms-original-file: 2026-04-01-preview/MaintenanceEventsGet.json
 */
async function getInformationAboutAMaintenanceEventForAServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.maintenanceEvents.get(
    "exampleresourcegroup",
    "exampleserver",
    "XXXX-111",
  );
  console.log(result);
}

async function main() {
  await getInformationAboutAMaintenanceEventForAServer();
}

main().catch(console.error);
