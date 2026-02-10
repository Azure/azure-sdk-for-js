// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates a configuration of a server.
 *
 * @summary Updates a configuration of a server.
 * x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/Configurations/preview/2023-06-01-preview/examples/ConfigurationUpdate.json
 */

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

async function updateAUserConfiguration() {
  const subscriptionId =
    process.env["MYSQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["MYSQL_RESOURCE_GROUP"] || "testrg";
  const serverName = "testserver";
  const configurationName = "event_scheduler";
  const parameters = { source: "user-override", value: "on" };
  const credential = new DefaultAzureCredential();
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.configurations.beginUpdateAndWait(
    resourceGroupName,
    serverName,
    configurationName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await updateAUserConfiguration();
}

main().catch(console.error);
