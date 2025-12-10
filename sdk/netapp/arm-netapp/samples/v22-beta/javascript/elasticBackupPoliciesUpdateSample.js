// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to patch the specified NetApp Elastic Backup Policy
 *
 * @summary patch the specified NetApp Elastic Backup Policy
 * x-ms-original-file: 2025-09-01-preview/ElasticBackupPolicies_Update.json
 */
async function elasticBackupPoliciesUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.elasticBackupPolicies.update("myRG", "account1", "backupPolicyName", {
    properties: {
      dailyBackupsToKeep: 5,
      weeklyBackupsToKeep: 10,
      monthlyBackupsToKeep: 10,
      policyState: "Enabled",
    },
  });
  console.log(result);
}

async function main() {
  await elasticBackupPoliciesUpdate();
}

main().catch(console.error);
