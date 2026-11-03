// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the immutability policy of a snapshot. Sets or extends an unlocked immutability policy with the specified duration and type. If the snapshot already has a locked policy, the request will be rejected. Use updateImmutabilityPolicyLock to lock an immutability policy.
 *
 * @summary updates the immutability policy of a snapshot. Sets or extends an unlocked immutability policy with the specified duration and type. If the snapshot already has a locked policy, the request will be rejected. Use updateImmutabilityPolicyLock to lock an immutability policy.
 * x-ms-original-file: 2026-03-02/snapshotExamples/Snapshot_UpdateImmutabilityPolicy.json
 */
async function updateImmutabilityPolicyOfASnapshot(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.snapshots.updateImmutabilityPolicy("myResourceGroup", "mySnapshot", {
    immutabilityDurationDays: 30,
    type: "Unlocked",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateImmutabilityPolicyOfASnapshot();
}

main().catch(console.error);
