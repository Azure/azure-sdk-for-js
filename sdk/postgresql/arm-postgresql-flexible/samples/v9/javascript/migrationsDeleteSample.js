// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes a migration.
 *
 * @summary Deletes a migration.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/preview/2025-01-01-preview/examples/Migrations_Delete.json
 */

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

async function migrationsDelete() {
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "testrg";
  const targetDbServerName = "testtarget";
  const migrationName = "testmigration";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential);
  const result = await client.migrations.delete(
    subscriptionId,
    resourceGroupName,
    targetDbServerName,
    migrationName,
  );
  console.log(result);
}

async function main() {
  await migrationsDelete();
}

main().catch(console.error);
