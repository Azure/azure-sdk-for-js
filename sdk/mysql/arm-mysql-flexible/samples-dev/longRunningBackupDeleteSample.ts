// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerClient } from "@azure/arm-mysql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete backup for a given server with specified backup name
 *
 * @summary delete backup for a given server with specified backup name
 * x-ms-original-file: 2025-06-01-preview/LongRunningBackupDelete.json
 */
async function deleteBackupForAServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  await client.longRunningBackup.delete("TestGroup", "mysqltestserver", "testback");
}

async function main(): Promise<void> {
  await deleteBackupForAServer();
}

main().catch(console.error);
