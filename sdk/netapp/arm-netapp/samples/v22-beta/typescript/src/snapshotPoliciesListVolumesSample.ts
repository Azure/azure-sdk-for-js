// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get volumes associated with snapshot policy
 *
 * @summary get volumes associated with snapshot policy
 * x-ms-original-file: 2025-09-01-preview/SnapshotPolicies_ListVolumes.json
 */
async function snapshotPoliciesListVolumes(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.snapshotPolicies.listVolumes(
    "myRG",
    "account1",
    "snapshotPolicyName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await snapshotPoliciesListVolumes();
}

main().catch(console.error);
