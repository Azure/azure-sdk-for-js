// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists all migrations of a target flexible server.
 *
 * @summary Lists all migrations of a target flexible server.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/MigrationsListByTargetServer.json
 */
async function listAllMigrationsOfATargetFlexibleServer() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const migrationListFilter = "All";
  const options = {
    migrationListFilter,
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.migrations.listByTargetServer(
    resourceGroupName,
    serverName,
    options,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listAllMigrationsOfATargetFlexibleServer();
}

main().catch(console.error);
