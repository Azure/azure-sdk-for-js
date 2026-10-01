// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to applies the maintenance event immediately.
 *
 * @summary applies the maintenance event immediately.
 * x-ms-original-file: 2026-04-01-preview/MaintenanceEventsApplyNow.json
 */
async function applyMaintenanceImmediatelyForAServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.maintenanceEvents.applyNow(
    "exampleresourcegroup",
    "exampleserver",
    "XXXX-111",
  );
  console.log(result);
}

async function main() {
  await applyMaintenanceImmediatelyForAServer();
}

main().catch(console.error);
