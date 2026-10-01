// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContentStoreClient } = require("@azure/arm-commvaultcontentstore");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to resume Backup for a Protection Group.
 *
 * @summary resume Backup for a Protection Group.
 * x-ms-original-file: 2026-07-03-preview/ProtectionGroups_ResumeBackup_MaximumSet_Gen.json
 */
async function protectionGroupsResumeBackupMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "65D4E6D7-7063-4C4B-BAC5-13C45474009E";
  const client = new ContentStoreClient(credential, subscriptionId);
  await client.protectionGroups.resumeBackup(
    "rgcommvault",
    "sample-cloudAccountName",
    "sample-protectionGroupName",
  );
}

async function main() {
  await protectionGroupsResumeBackupMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
