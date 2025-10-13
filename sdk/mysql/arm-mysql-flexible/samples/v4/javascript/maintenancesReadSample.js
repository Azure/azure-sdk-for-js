// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to read maintenance.
 *
 * @summary read maintenance.
 * x-ms-original-file: 2024-12-30/MaintenanceRead.json
 */
async function readAMaintenance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.maintenances.read("TestGroup", "testserver", "_T9Q-TS8");
  console.log(result);
}

async function main() {
  await readAMaintenance();
}

main().catch(console.error);
