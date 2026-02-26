// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all migrations of a target flexible server.
 *
 * @summary lists all migrations of a target flexible server.
 * x-ms-original-file: 2026-01-01-preview/MigrationsListByTargetServer.json
 */
async function listAllMigrationsOfATargetFlexibleServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.migrations.listByTargetServer(
    "exampleresourcegroup",
    "exampleserver",
    { migrationListFilter: "All" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllMigrationsOfATargetFlexibleServer();
}

main().catch(console.error);
