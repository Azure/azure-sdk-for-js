// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve the Database Migration Service
 *
 * @summary retrieve the Database Migration Service
 * x-ms-original-file: 2025-09-01-preview/GetMigrationService.json
 */
async function getMigrationService() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.migrationServices.get("testrg", "service1");
  console.log(result);
}

async function main() {
  await getMigrationService();
}

main().catch(console.error);
