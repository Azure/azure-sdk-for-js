// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to approve upgrade on deferred rolling upgrades for OS disks in the virtual machines in a VM scale set.
 *
 * @summary approve upgrade on deferred rolling upgrades for OS disks in the virtual machines in a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_ApproveRollingUpgrade.json
 */
async function virtualMachineScaleSetApproveRollingUpgrade(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.approveRollingUpgrade(
    "rgcompute",
    "vmssToApproveRollingUpgradeOn",
    { vmInstanceIDs: { instanceIds: ["0", "1", "2"] } },
  );
}

async function main(): Promise<void> {
  await virtualMachineScaleSetApproveRollingUpgrade();
}

main().catch(console.error);
