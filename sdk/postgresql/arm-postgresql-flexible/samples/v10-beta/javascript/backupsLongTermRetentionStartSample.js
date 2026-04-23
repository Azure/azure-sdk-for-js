// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to initiates a long term retention backup.
 *
 * @summary initiates a long term retention backup.
 * x-ms-original-file: 2026-01-01-preview/BackupsLongTermRetentionStart.json
 */
async function initiateALongTermRetentionBackup() {
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

async function main() {
  await initiateALongTermRetentionBackup();
}

main().catch(console.error);
