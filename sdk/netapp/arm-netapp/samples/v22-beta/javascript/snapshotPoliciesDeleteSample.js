// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete snapshot policy
 *
 * @summary delete snapshot policy
 * x-ms-original-file: 2025-09-01-preview/SnapshotPolicies_Delete.json
 */
async function snapshotPoliciesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.snapshotPolicies.delete("resourceGroup", "accountName", "snapshotPolicyName");
}

async function main() {
  await snapshotPoliciesDelete();
}

main().catch(console.error);
