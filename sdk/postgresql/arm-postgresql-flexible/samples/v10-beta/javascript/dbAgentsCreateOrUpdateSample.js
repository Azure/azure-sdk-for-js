// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to enables or disables the database agent for a flexible server.
 *
 * @summary enables or disables the database agent for a flexible server.
 * x-ms-original-file: 2026-07-01-preview/DBAgentUpdateDisable.json
 */
async function disableTheSingletonDefaultDatabaseAgentForAServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.dbAgents.createOrUpdate("exampleresourcegroup", "exampleserver", {
    properties: { state: "Disabled" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to enables or disables the database agent for a flexible server.
 *
 * @summary enables or disables the database agent for a flexible server.
 * x-ms-original-file: 2026-07-01-preview/DBAgentUpdateEnable.json
 */
async function enableTheSingletonDefaultDatabaseAgentForAServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.dbAgents.createOrUpdate("exampleresourcegroup", "exampleserver", {
    properties: { state: "Enabled" },
  });
  console.log(result);
}

async function main() {
  await disableTheSingletonDefaultDatabaseAgentForAServer();
  await enableTheSingletonDefaultDatabaseAgentForAServer();
}

main().catch(console.error);
