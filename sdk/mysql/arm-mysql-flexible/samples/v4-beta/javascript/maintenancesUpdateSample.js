// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update maintenances.
 *
 * @summary Update maintenances.
 * x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/Maintenance/preview/2023-10-01-preview/examples/MaintenanceUpdate.json
 */

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

async function updateMaintenanceOnAServer() {
  const subscriptionId =
    process.env["MYSQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["MYSQL_RESOURCE_GROUP"] || "TestGroup";
  const serverName = "testserver";
  const maintenanceName = "_T9Q-TS8";
  const parameters = {
    maintenanceStartTime: new Date("2024-01-20T00:00:00"),
  };
  const options = { parameters };
  const credential = new DefaultAzureCredential();
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.maintenances.beginUpdateAndWait(
    resourceGroupName,
    serverName,
    maintenanceName,
    options,
  );
  console.log(result);
}

async function main() {
  await updateMaintenanceOnAServer();
}

main().catch(console.error);
