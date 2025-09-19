// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Initiate cutover for in-progress online database migration to SQL Managed Instance.
 *
 * @summary Initiate cutover for in-progress online database migration to SQL Managed Instance.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/stable/2025-06-30/examples/SqlMiCutoverDatabaseMigration.json
 */
async function cutoverOnlineMigrationOperationForTheDatabase() {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["DATAMIGRATION_RESOURCE_GROUP"] || "testrg";
  const managedInstanceName = "managedInstance1";
  const targetDbName = "db1";
  const parameters = {
    migrationOperationId: "4124fe90-d1b6-4b50-b4d9-46d02381f59a",
  };
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.databaseMigrationsSqlMi.beginCutoverAndWait(
    resourceGroupName,
    managedInstanceName,
    targetDbName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await cutoverOnlineMigrationOperationForTheDatabase();
}

main().catch(console.error);
