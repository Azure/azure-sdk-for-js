// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Approve upgrade on deferred rolling upgrade for OS disk on a VM scale set instance.
 *
 * @summary Approve upgrade on deferred rolling upgrade for OS disk on a VM scale set instance.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSetVM_ApproveRollingUpgrade.json
 */
async function virtualMachineScaleSetVMApproveRollingUpgrade() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "rgcompute";
  const vmScaleSetName = "vmssToApproveRollingUpgradeOn";
  const instanceId = "0123";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSetVMs.beginApproveRollingUpgradeAndWait(
    resourceGroupName,
    vmScaleSetName,
    instanceId,
  );
  console.log(result);
}

async function main() {
  await virtualMachineScaleSetVMApproveRollingUpgrade();
}

main().catch(console.error);
