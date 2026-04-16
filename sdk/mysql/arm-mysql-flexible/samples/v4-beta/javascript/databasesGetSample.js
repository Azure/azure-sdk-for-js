// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets information about a database.
 *
 * @summary Gets information about a database.
 * x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/Databases/preview/2023-06-01-preview/examples/DatabaseGet.json
 */

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

async function getADatabase() {
  const subscriptionId =
    process.env["MYSQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["MYSQL_RESOURCE_GROUP"] || "TestGroup";
  const serverName = "testserver";
  const databaseName = "db1";
  const credential = new DefaultAzureCredential();
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.databases.get(resourceGroupName, serverName, databaseName);
  console.log(result);
}

async function main() {
  await getADatabase();
}

main().catch(console.error);
