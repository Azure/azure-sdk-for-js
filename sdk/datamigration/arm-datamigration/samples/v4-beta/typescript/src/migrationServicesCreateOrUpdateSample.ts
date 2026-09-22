// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataMigrationManagementClient } from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or Update Database Migration Service.
 *
 * @summary create or Update Database Migration Service.
 * x-ms-original-file: 2025-09-01-preview/CreateOrUpdateMigrationServiceMAX.json
 */
async function createOrUpdateMigrationServiceWithMaximumParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.migrationServices.createOrUpdate("testrg", "testagent", {
    location: "northeurope",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or Update Database Migration Service.
 *
 * @summary create or Update Database Migration Service.
 * x-ms-original-file: 2025-09-01-preview/CreateOrUpdateMigrationServiceMIN.json
 */
async function createOrUpdateMigrationServiceWithMinimumParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.migrationServices.createOrUpdate("testrg", "testagent", {
    location: "northeurope",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateMigrationServiceWithMaximumParameters();
  await createOrUpdateMigrationServiceWithMinimumParameters();
}

main().catch(console.error);
