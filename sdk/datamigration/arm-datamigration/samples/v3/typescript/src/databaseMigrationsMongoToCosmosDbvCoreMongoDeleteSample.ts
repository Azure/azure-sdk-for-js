// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataMigrationManagementClient } from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Delete Database Migration resource.
 *
 * @summary Delete Database Migration resource.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/stable/2025-06-30/examples/CosmosDbMongoDeleteDatabaseMigration.json
 */
async function deleteMongoToCosmosDbMongoVCoreDatabaseMigrationResource(): Promise<void> {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const resourceGroupName =
    process.env["DATAMIGRATION_RESOURCE_GROUP"] || "testrg";
  const targetResourceName = "targetCosmosDbClusterName";
  const migrationName = "migrationRequest";
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result =
    await client.databaseMigrationsMongoToCosmosDbvCoreMongo.beginDeleteAndWait(
      resourceGroupName,
      targetResourceName,
      migrationName,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteMongoToCosmosDbMongoVCoreDatabaseMigrationResource();
}

main().catch(console.error);
