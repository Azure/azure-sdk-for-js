// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataMigrationManagementClient } from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve the List of database migrations attached to the service.
 *
 * @summary retrieve the List of database migrations attached to the service.
 * x-ms-original-file: 2025-09-01-preview/ListMigrationsBySqlMigrationService.json
 */
async function listDatabaseMigrationsAttachedToTheService(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sqlMigrationServices.listMigrations("testrg", "service1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listDatabaseMigrationsAttachedToTheService();
}

main().catch(console.error);
