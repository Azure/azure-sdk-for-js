// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update Database Migration Service.
 *
 * @summary update Database Migration Service.
 * x-ms-original-file: 2025-09-01-preview/UpdateMigrationService.json
 */
async function updateMigrationService() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.migrationServices.update("testrg", "testagent", {
    tags: { mytag: "myval" },
  });
  console.log(result);
}

async function main() {
  await updateMigrationService();
}

main().catch(console.error);
