// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Restarts PostgreSQL database engine in a server.
 *
 * @summary Restarts PostgreSQL database engine in a server.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/ServersRestartWithFailover.json
 */
async function restartPostgreSqlDatabaseEngineInAServerWithAForcedFailoverToStandbyServer() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const parameters = {
    failoverMode: "ForcedFailover",
    restartWithFailover: true,
  };
  const options = { parameters };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.beginRestartAndWait(resourceGroupName, serverName, options);
  console.log(result);
}

/**
 * This sample demonstrates how to Restarts PostgreSQL database engine in a server.
 *
 * @summary Restarts PostgreSQL database engine in a server.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/ServersRestart.json
 */
async function restartPostgreSqlDatabaseEngineInAServer() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.beginRestartAndWait(resourceGroupName, serverName);
  console.log(result);
}

async function main() {
  await restartPostgreSqlDatabaseEngineInAServerWithAForcedFailoverToStandbyServer();
  await restartPostgreSqlDatabaseEngineInAServer();
}

main().catch(console.error);
