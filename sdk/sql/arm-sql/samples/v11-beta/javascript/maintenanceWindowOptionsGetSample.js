// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of available maintenance windows.
 *
 * @summary gets a list of available maintenance windows.
 * x-ms-original-file: 2025-02-01-preview/GetMaintenanceWindowOptions.json
 */
async function getsAListOfAvailableMaintenanceWindowsForASelectedDatabase() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.maintenanceWindowOptions.get(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    "testdb",
    "current",
  );
  console.log(result);
}

async function main() {
  await getsAListOfAvailableMaintenanceWindowsForASelectedDatabase();
}

main().catch(console.error);
