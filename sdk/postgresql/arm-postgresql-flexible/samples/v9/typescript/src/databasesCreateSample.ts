// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  Database} from "@azure/arm-postgresql-flexible";
import {
  PostgreSQLManagementFlexibleServerClient,
} from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates a new database.
 *
 * @summary Creates a new database.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/DatabasesCreate.json
 */
async function createADatabase(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const databaseName = "exampledatabase";
  const parameters: Database = { charset: "utf8", collation: "en_US.utf8" };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(
    credential,
    subscriptionId,
  );
  const result = await client.databases.beginCreateAndWait(
    resourceGroupName,
    serverName,
    databaseName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createADatabase();
}

main().catch(console.error);
