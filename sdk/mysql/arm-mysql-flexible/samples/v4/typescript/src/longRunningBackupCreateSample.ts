// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerClient } from "@azure/arm-mysql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create backup for a given server with specified backup name.
 *
 * @summary create backup for a given server with specified backup name.
 * x-ms-original-file: 2024-12-30/LongRunningBackup.json
 */
async function createBackupForAServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.longRunningBackup.create("TestGroup", "mysqltestserver", "testback");
  console.log(result);
}

async function main(): Promise<void> {
  await createBackupForAServer();
}

main().catch(console.error);
