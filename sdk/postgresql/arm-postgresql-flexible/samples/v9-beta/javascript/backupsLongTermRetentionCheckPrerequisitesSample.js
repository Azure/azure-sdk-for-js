// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to performs all checks required for a long term retention backup operation to succeed.
 *
 * @summary performs all checks required for a long term retention backup operation to succeed.
 * x-ms-original-file: 2026-01-01-preview/BackupsLongTermRetentionCheckPrerequisites.json
 */
async function performAllChecksRequiredForALongTermRetentionBackupOperationToSucceed() {
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

async function main() {
  await performAllChecksRequiredForALongTermRetentionBackupOperationToSucceed();
}

main().catch(console.error);
