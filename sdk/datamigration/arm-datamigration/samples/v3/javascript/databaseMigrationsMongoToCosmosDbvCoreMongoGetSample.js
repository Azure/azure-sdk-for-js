// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Get Database Migration resource.
 *
 * @summary Get Database Migration resource.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/stable/2025-06-30/examples/CosmosDbMongoGetDatabaseMigrationExpanded.json
 */
async function getMongoToCosmosDbMongoVCoreDatabaseMigrationWithTheExpandParameter() {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["DATAMIGRATION_RESOURCE_GROUP"] || "testrg";
  const targetResourceName = "targetCosmosDbClusterName";
  const migrationName = "migrationRequest";
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.databaseMigrationsMongoToCosmosDbvCoreMongo.get(
    resourceGroupName,
    targetResourceName,
    migrationName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Get Database Migration resource.
 *
 * @summary Get Database Migration resource.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/stable/2025-06-30/examples/CosmosDbMongoGetDatabaseMigration.json
 */
async function getMongoToCosmosDbMongoVCoreDatabaseMigrationWithoutTheExpandParameter() {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["DATAMIGRATION_RESOURCE_GROUP"] || "testrg";
  const targetResourceName = "targetCosmosDbClusterName";
  const migrationName = "migrationRequest";
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.databaseMigrationsMongoToCosmosDbvCoreMongo.get(
    resourceGroupName,
    targetResourceName,
    migrationName,
  );
  console.log(result);
}

async function main() {
  await getMongoToCosmosDbMongoVCoreDatabaseMigrationWithTheExpandParameter();
  await getMongoToCosmosDbMongoVCoreDatabaseMigrationWithoutTheExpandParameter();
}

main().catch(console.error);
