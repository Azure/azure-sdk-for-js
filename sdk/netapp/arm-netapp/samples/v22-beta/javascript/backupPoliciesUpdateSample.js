// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to patch a backup policy for Netapp Account
 *
 * @summary patch a backup policy for Netapp Account
 * x-ms-original-file: 2025-09-01-preview/BackupPolicies_Update.json
 */
async function backupPoliciesUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.backupPolicies.update("myRG", "account1", "backupPolicyName", {
    location: "westus",
    properties: {
      dailyBackupsToKeep: 5,
      enabled: false,
      monthlyBackupsToKeep: 10,
      weeklyBackupsToKeep: 10,
    },
  });
  console.log(result);
}

async function main() {
  await backupPoliciesUpdate();
}

main().catch(console.error);
