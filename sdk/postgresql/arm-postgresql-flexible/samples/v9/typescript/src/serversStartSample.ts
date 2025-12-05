// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Starts a stopped server.
 *
 * @summary Starts a stopped server.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/ServersStart.json
 */
async function startAStoppedServer(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(
    credential,
    subscriptionId,
  );
  const result = await client.servers.beginStartAndWait(
    resourceGroupName,
    serverName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await startAStoppedServer();
}

main().catch(console.error);
