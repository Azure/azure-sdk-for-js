// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the specified Elastic Policy
 *
 * @summary delete the specified Elastic Policy
 * x-ms-original-file: 2025-09-01-preview/ElasticBackupPolicies_Delete.json
 */
async function elasticBackupPoliciesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.elasticBackupPolicies.delete("resourceGroup", "accountName", "backupPolicyName");
}

async function main() {
  await elasticBackupPoliciesDelete();
}

main().catch(console.error);
