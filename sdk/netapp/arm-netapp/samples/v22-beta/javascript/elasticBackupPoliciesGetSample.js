// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the Elastic Backup Policy
 *
 * @summary get the Elastic Backup Policy
 * x-ms-original-file: 2025-09-01-preview/ElasticBackupPolicies_Get.json
 */
async function elasticBackupPoliciesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.elasticBackupPolicies.get("myRG", "account1", "backupPolicyName");
  console.log(result);
}

async function main() {
  await elasticBackupPoliciesGet();
}

main().catch(console.error);
