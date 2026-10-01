// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or Update Database Migration Service.
 *
 * @summary create or Update Database Migration Service.
 * x-ms-original-file: 2025-09-01-preview/CreateOrUpdateSqlMigrationServiceMAX.json
 */
async function createOrUpdateSQLMigrationServiceWithMaximumParameters() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.sqlMigrationServices.createOrUpdate("testrg", "testagent", {
    location: "northeurope",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or Update Database Migration Service.
 *
 * @summary create or Update Database Migration Service.
 * x-ms-original-file: 2025-09-01-preview/CreateOrUpdateSqlMigrationServiceMIN.json
 */
async function createOrUpdateSQLMigrationServiceWithMinimumParameters() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.sqlMigrationServices.createOrUpdate("testrg", "testagent", {
    location: "northeurope",
  });
  console.log(result);
}

async function main() {
  await createOrUpdateSQLMigrationServiceWithMaximumParameters();
  await createOrUpdateSQLMigrationServiceWithMinimumParameters();
}

main().catch(console.error);
