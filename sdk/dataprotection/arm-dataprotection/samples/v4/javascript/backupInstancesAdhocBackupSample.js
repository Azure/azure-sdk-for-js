// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataProtectionClient } = require("@azure/arm-dataprotection");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to trigger adhoc backup
 *
 * @summary trigger adhoc backup
 * x-ms-original-file: 2025-07-01/BackupInstanceOperations/TriggerBackup.json
 */
async function triggerAdhocBackup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.backupInstances.adhocBackup(
    "000pikumar",
    "PratikPrivatePreviewVault1",
    "testInstance1",
    {
      backupRuleOptions: {
        ruleName: "BackupWeekly",
        triggerOption: { retentionTagOverride: "yearly" },
      },
    },
  );
  console.log(result);
}

async function main() {
  await triggerAdhocBackup();
}

main().catch(console.error);
