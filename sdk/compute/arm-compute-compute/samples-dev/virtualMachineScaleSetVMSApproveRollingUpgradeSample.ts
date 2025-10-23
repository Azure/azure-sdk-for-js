// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to approve upgrade on deferred rolling upgrade for OS disk on a VM scale set instance.
 *
 * @summary approve upgrade on deferred rolling upgrade for OS disk on a VM scale set instance.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetVM_ApproveRollingUpgrade.json
 */
async function virtualMachineScaleSetVMApproveRollingUpgrade(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSetVMS.approveRollingUpgrade(
    "rgcompute",
    "vmssToApproveRollingUpgradeOn",
    "0123",
  );
}

async function main(): Promise<void> {
  await virtualMachineScaleSetVMApproveRollingUpgrade();
}

main().catch(console.error);
