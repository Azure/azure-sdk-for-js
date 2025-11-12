// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes a specific backup.
 *
 * @summary Deletes a specific backup.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/preview/2025-01-01-preview/examples/BackupDelete.json
 */

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteASpecificBackup(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "TestGroup";
  const serverName = "testserver";
  const backupName = "backup_20250303T160516";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.backups.beginDeleteAndWait(resourceGroupName, serverName, backupName);
  console.log(result);
}

async function main(): Promise<void> {
  await deleteASpecificBackup();
}

main().catch(console.error);
