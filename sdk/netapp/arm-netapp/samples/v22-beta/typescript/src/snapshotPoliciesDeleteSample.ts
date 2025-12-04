// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete snapshot policy
 *
 * @summary delete snapshot policy
 * x-ms-original-file: 2025-09-01-preview/SnapshotPolicies_Delete.json
 */
async function snapshotPoliciesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.snapshotPolicies.delete("resourceGroup", "accountName", "snapshotPolicyName");
}

async function main(): Promise<void> {
  await snapshotPoliciesDelete();
}

main().catch(console.error);
