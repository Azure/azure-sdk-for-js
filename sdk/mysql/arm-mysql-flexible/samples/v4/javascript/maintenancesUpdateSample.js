// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update maintenances.
 *
 * @summary update maintenances.
 * x-ms-original-file: 2024-12-30/MaintenanceUpdate.json
 */
async function updateMaintenanceOnAServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.maintenances.update("TestGroup", "testserver", "_T9Q-TS8", {
    parameters: {
      properties: { maintenanceStartTime: new Date("2024-01-20T00:00:00") },
    },
  });
  console.log(result);
}

async function main() {
  await updateMaintenanceOnAServer();
}

main().catch(console.error);
