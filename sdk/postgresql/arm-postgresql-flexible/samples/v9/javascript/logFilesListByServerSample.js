// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List all the server log files in a given server.
 *
 * @summary List all the server log files in a given server.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/preview/2025-01-01-preview/examples/LogFilesListByServer.json
 */

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

async function listAllServerLogFilesForAServer() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "testrg";
  const serverName = "postgresqltestsvc1";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.logFiles.listByServer(resourceGroupName, serverName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listAllServerLogFilesForAServer();
}

main().catch(console.error);
