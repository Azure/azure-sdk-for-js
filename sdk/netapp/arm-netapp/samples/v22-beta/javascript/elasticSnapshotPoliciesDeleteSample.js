// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a ElasticSnapshotPolicy
 *
 * @summary delete a ElasticSnapshotPolicy
 * x-ms-original-file: 2025-09-01-preview/ElasticSnapshotPolicies_Delete.json
 */
async function elasticSnapshotPoliciesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.elasticSnapshotPolicies.delete("resourceGroup", "accountName", "snapshotPolicyName");
}

async function main() {
  await elasticSnapshotPoliciesDelete();
}

main().catch(console.error);
