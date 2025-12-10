// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a snapshot Policy
 *
 * @summary get a snapshot Policy
 * x-ms-original-file: 2025-09-01-preview/SnapshotPolicies_Get.json
 */
async function snapshotPoliciesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.snapshotPolicies.get("myRG", "account1", "snapshotPolicyName");
  console.log(result);
}

async function main() {
  await snapshotPoliciesGet();
}

main().catch(console.error);
