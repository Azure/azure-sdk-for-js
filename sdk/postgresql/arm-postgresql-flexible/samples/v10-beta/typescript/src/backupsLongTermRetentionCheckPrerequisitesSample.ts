// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to performs all checks required for a long term retention backup operation to succeed.
 *
 * @summary performs all checks required for a long term retention backup operation to succeed.
 * x-ms-original-file: 2026-01-01-preview/BackupsLongTermRetentionCheckPrerequisites.json
 */
async function performAllChecksRequiredForALongTermRetentionBackupOperationToSucceed(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.backupsLongTermRetention.checkPrerequisites(
    "exampleresourcegroup",
    "exampleserver",
    { backupSettings: { backupName: "exampleltrbackup" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await performAllChecksRequiredForALongTermRetentionBackupOperationToSucceed();
}

main().catch(console.error);
