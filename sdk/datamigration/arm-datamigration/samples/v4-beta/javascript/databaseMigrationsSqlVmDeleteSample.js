// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete Database Migration resource.
 *
 * @summary delete Database Migration resource.
 * x-ms-original-file: 2025-09-01-preview/SqlVmDeleteDatabaseMigration.json
 */
async function createOrUpdateDatabaseMigrationResourceWithMinimumParameters() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.databaseMigrationsSqlVm.delete("testrg", "testvm", "db1");
  console.log(result);
}

async function main() {
  await createOrUpdateDatabaseMigrationResourceWithMinimumParameters();
}

main().catch(console.error);
