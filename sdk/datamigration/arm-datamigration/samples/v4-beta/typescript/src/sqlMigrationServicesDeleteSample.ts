// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataMigrationManagementClient } from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete Database Migration Service.
 *
 * @summary delete Database Migration Service.
 * x-ms-original-file: 2025-09-01-preview/DeleteSqlMigrationService.json
 */
async function deleteSQLMigrationService(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  await client.sqlMigrationServices.delete("testrg", "service1");
}

async function main(): Promise<void> {
  await deleteSQLMigrationService();
}

main().catch(console.error);
