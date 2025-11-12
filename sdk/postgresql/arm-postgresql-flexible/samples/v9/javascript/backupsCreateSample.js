// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create a specific backup for PostgreSQL flexible server.
 *
 * @summary Create a specific backup for PostgreSQL flexible server.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/preview/2025-01-01-preview/examples/BackupCreate.json
 */

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

async function createANewBackupForAFlexibleServer() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "TestGroup";
  const serverName = "postgresqltestserver";
  const backupName = "backup_20250303T160516";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.backups.beginCreateAndWait(resourceGroupName, serverName, backupName);
  console.log(result);
}

async function main() {
  await createANewBackupForAFlexibleServer();
}

main().catch(console.error);
