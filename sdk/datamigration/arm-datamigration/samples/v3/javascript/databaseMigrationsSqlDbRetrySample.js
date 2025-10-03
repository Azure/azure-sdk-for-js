// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Retry on going migration for the database.
 *
 * @summary Retry on going migration for the database.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/stable/2025-06-30/examples/SqlDbRetryDatabaseMigration.json
 */
async function retryDatabaseMigrationResource() {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["DATAMIGRATION_RESOURCE_GROUP"] || "testrg";
  const sqlDbInstanceName = "sqldbinstance";
  const targetDbName = "db1";
  const migrationOperationInput = {
    migrationOperationId: "9a90bb84-e70f-46f7-b0ae-1aef5b3b9f07",
  };
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.databaseMigrationsSqlDb.beginRetryAndWait(
    resourceGroupName,
    sqlDbInstanceName,
    targetDbName,
    migrationOperationInput,
  );
  console.log(result);
}

async function main() {
  await retryDatabaseMigrationResource();
}

main().catch(console.error);
