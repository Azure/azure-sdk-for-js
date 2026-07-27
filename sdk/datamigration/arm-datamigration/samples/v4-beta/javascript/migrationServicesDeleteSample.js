// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete Database Migration Service.
 *
 * @summary delete Database Migration Service.
 * x-ms-original-file: 2025-09-01-preview/DeleteMigrationService.json
 */
async function deleteMigrationService() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  await client.migrationServices.delete("testrg", "service1");
}

async function main() {
  await deleteMigrationService();
}

main().catch(console.error);
