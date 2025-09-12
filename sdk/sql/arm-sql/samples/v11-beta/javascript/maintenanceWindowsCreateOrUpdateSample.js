// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Sets maintenance windows settings for a database.
 *
 * @summary Sets maintenance windows settings for a database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/CreateOrUpdateMaintenanceWindows.json
 */
async function setsMaintenanceWindowSettingsForASelectedDatabase() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const serverName = "testsvr";
  const databaseName = "testdwdb";
  const maintenanceWindowName = "current";
  const parameters = {
    timeRanges: [{ dayOfWeek: "Saturday", duration: "PT60M", startTime: "00:00:00" }],
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.maintenanceWindowsOperations.createOrUpdate(
    resourceGroupName,
    serverName,
    databaseName,
    maintenanceWindowName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await setsMaintenanceWindowSettingsForASelectedDatabase();
}

main().catch(console.error);
