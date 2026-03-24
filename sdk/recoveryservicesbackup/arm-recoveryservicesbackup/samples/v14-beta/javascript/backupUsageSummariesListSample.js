// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesBackupClient } = require("@azure/arm-recoveryservicesbackup");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to fetches the backup management usage summaries of the vault.
 *
 * @summary fetches the backup management usage summaries of the vault.
 * x-ms-original-file: 2026-01-01-preview/Common/BackupProtectedItem_UsageSummary_Get.json
 */
async function getProtectedItemsUsagesSummary() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.backupUsageSummaries.list("testVault", "testRG", {
    filter: "type eq 'BackupProtectedItemCountSummary'",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to fetches the backup management usage summaries of the vault.
 *
 * @summary fetches the backup management usage summaries of the vault.
 * x-ms-original-file: 2026-01-01-preview/Common/BackupProtectionContainers_UsageSummary_Get.json
 */
async function getProtectedContainersUsagesSummary() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.backupUsageSummaries.list("testVault", "testRG", {
    filter: "type eq 'BackupProtectionContainerCountSummary'",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getProtectedItemsUsagesSummary();
  await getProtectedContainersUsagesSummary();
}

main().catch(console.error);
