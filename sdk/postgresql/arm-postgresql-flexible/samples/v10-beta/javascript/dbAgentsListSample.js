// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the database agent configuration for a flexible server.
 *
 * @summary lists the database agent configuration for a flexible server.
 * x-ms-original-file: 2026-07-01-preview/DBAgentList.json
 */
async function listTheDatabaseAgentConfigurationForAServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dbAgents.list("exampleresourcegroup", "exampleserver")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listTheDatabaseAgentConfigurationForAServer();
}

main().catch(console.error);
