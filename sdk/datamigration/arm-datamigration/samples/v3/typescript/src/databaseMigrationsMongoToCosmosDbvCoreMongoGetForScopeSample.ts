// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataMigrationManagementClient } from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get Database Migration resources for the scope.
 *
 * @summary Get Database Migration resources for the scope.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/stable/2025-06-30/examples/CosmosDbMongoListByScopeDatabaseMigration.json
 */
async function getMongoToCosmosDbMongoVCoreDatabaseMigrationWithTheExpandParameter(): Promise<void> {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const resourceGroupName =
    process.env["DATAMIGRATION_RESOURCE_GROUP"] || "testrg";
  const targetResourceName = "targetCosmosDbClusterName";
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.databaseMigrationsMongoToCosmosDbvCoreMongo.listForScope(
    resourceGroupName,
    targetResourceName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Get Database Migration resources for the scope.
 *
 * @summary Get Database Migration resources for the scope.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/stable/2025-06-30/examples/CosmosDbMongoListByScopeDatabaseMigration.json
 */
async function getMongoToCosmosDbMongoVCoreDatabaseMigrationWithoutTheExpandParameter(): Promise<void> {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const resourceGroupName =
    process.env["DATAMIGRATION_RESOURCE_GROUP"] || "testrg";
  const targetResourceName = "targetCosmosDbClusterName";
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.databaseMigrationsMongoToCosmosDbvCoreMongo.listForScope(
    resourceGroupName,
    targetResourceName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getMongoToCosmosDbMongoVCoreDatabaseMigrationWithTheExpandParameter();
  await getMongoToCosmosDbMongoVCoreDatabaseMigrationWithoutTheExpandParameter();
}

main().catch(console.error);
