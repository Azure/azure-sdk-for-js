// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContentStoreClient } = require("@azure/arm-commvaultcontentstore");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to ad-hoc backup of protected items resource in given protection group.
 *
 * @summary ad-hoc backup of protected items resource in given protection group.
 * x-ms-original-file: 2026-07-03-preview/ProtectionGroups_Backup_MaximumSet_Gen.json
 */
async function protectionGroupsBackupMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "65D4E6D7-7063-4C4B-BAC5-13C45474009E";
  const client = new ContentStoreClient(credential, subscriptionId);
  const result = await client.protectionGroups.backup(
    "rgcommvault",
    "sample-cloudAccountName",
    "sample-protectionGroupName",
    {
      vmList: [{ vmGuid: "40000000-aaaa-4bbb-8ccc-000000000000" }],
      backupOptions: {
        backupLevel: "FULL",
        jobDescription: "Ad-hoc backup job",
        backupCopyImmediately: true,
        runSnapShotBackup: true,
        notifyUserOnJobCompletion: true,
      },
    },
  );
  console.log(result);
}

async function main() {
  await protectionGroupsBackupMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
