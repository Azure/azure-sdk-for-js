// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates a configuration of a server.
 *
 * @summary Updates a configuration of a server.
 * x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/Configurations/preview/2023-06-01-preview/examples/ConfigurationCreateOrUpdate.json
 */

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

async function configurationCreateOrUpdate() {
  const subscriptionId =
    process.env["MYSQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["MYSQL_RESOURCE_GROUP"] || "TestGroup";
  const serverName = "testserver";
  const configurationName = "event_scheduler";
  const parameters = { source: "user-override", value: "off" };
  const credential = new DefaultAzureCredential();
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.configurations.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    configurationName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await configurationCreateOrUpdate();
}

main().catch(console.error);
