// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContentStoreClient } = require("@azure/arm-commvault");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to stop Backup for a Protection Group
 *
 * @summary stop Backup for a Protection Group
 * x-ms-original-file: 2026-07-03-preview/ProtectionGroups_StopBackup_MaximumSet_Gen.json
 */
async function protectionGroupsStopBackupMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "65D4E6D7-7063-4C4B-BAC5-13C45474009E";
  const client = new ContentStoreClient(credential, subscriptionId);
  await client.protectionGroups.stopBackup(
    "rgcommvault",
    "sample-cloudAccountName",
    "sample-protectionGroupName",
    { reason: "auzneewhs", comment: "ipaalpltffowhwzoxqmcc" },
  );
}

async function main() {
  await protectionGroupsStopBackupMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
