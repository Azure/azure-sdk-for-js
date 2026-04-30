// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to initiates a long term retention backup.
 *
 * @summary initiates a long term retention backup.
 * x-ms-original-file: 2026-01-01-preview/BackupsLongTermRetentionStart.json
 */
async function initiateALongTermRetentionBackup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.backupsLongTermRetention.start(
    "exampleresourcegroup",
    "exampleserver",
    {
      backupSettings: { backupName: "exampleltrbackup" },
      targetDetails: { sasUriList: ["sasuri"] },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await initiateALongTermRetentionBackup();
}

main().catch(console.error);
