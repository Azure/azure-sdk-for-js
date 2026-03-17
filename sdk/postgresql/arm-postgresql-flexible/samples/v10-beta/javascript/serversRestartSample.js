// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to restarts PostgreSQL database engine in a server.
 *
 * @summary restarts PostgreSQL database engine in a server.
 * x-ms-original-file: 2026-01-01-preview/ServersRestart.json
 */
async function restartPostgreSQLDatabaseEngineInAServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  await client.servers.restart("exampleresourcegroup", "exampleserver");
}

/**
 * This sample demonstrates how to restarts PostgreSQL database engine in a server.
 *
 * @summary restarts PostgreSQL database engine in a server.
 * x-ms-original-file: 2026-01-01-preview/ServersRestartWithFailover.json
 */
async function restartPostgreSQLDatabaseEngineInAServerWithAForcedFailoverToStandbyServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  await client.servers.restart("exampleresourcegroup", "exampleserver", {
    parameters: { failoverMode: "ForcedFailover", restartWithFailover: true },
  });
}

async function main() {
  await restartPostgreSQLDatabaseEngineInAServer();
  await restartPostgreSQLDatabaseEngineInAServerWithAForcedFailoverToStandbyServer();
}

main().catch(console.error);
