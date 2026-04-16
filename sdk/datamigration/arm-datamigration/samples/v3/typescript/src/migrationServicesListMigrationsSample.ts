// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataMigrationManagementClient } from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Retrieve the List of database migrations attached to the service.
 *
 * @summary Retrieve the List of database migrations attached to the service.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/stable/2025-06-30/examples/ListMigrationsByMigrationService.json
 */
async function listDatabaseMigrationsAttachedToTheService(): Promise<void> {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const resourceGroupName =
    process.env["DATAMIGRATION_RESOURCE_GROUP"] || "testrg";
  const migrationServiceName = "testMigrationService";
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.migrationServices.listMigrations(
    resourceGroupName,
    migrationServiceName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listDatabaseMigrationsAttachedToTheService();
}

main().catch(console.error);
