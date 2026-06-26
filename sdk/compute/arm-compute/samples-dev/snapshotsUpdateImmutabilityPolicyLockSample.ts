// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to locks the immutability policy of a snapshot. Once locked, the policy cannot be reduced or removed until the lock period expires.
 *
 * @summary locks the immutability policy of a snapshot. Once locked, the policy cannot be reduced or removed until the lock period expires.
 * x-ms-original-file: 2026-03-02/snapshotExamples/Snapshot_UpdateImmutabilityPolicyLock.json
 */
async function updateImmutabilityPolicyLockOfASnapshot(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.snapshots.updateImmutabilityPolicyLock(
    "myResourceGroup",
    "mySnapshot",
    { immutabilityDurationDays: 30, type: "Locked" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateImmutabilityPolicyLockOfASnapshot();
}

main().catch(console.error);
