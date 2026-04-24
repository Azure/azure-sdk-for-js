// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to reimages all the disks ( including data disks ) in the virtual machines in a VM scale set. This operation is only supported for managed disks.
 *
 * @summary reimages all the disks ( including data disks ) in the virtual machines in a VM scale set. This operation is only supported for managed disks.
 * x-ms-original-file: 2025-11-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_ReimageAll_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetReimageAllMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.reimageAll("rgcompute", "aaaaaaaaaaaa", {
    vmInstanceIDs: { instanceIds: ["aaaaaaaaaaaaaaaaa"] },
  });
}

/**
 * This sample demonstrates how to reimages all the disks ( including data disks ) in the virtual machines in a VM scale set. This operation is only supported for managed disks.
 *
 * @summary reimages all the disks ( including data disks ) in the virtual machines in a VM scale set. This operation is only supported for managed disks.
 * x-ms-original-file: 2025-11-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_ReimageAll_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetReimageAllMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.reimageAll("rgcompute", "aaaaaaaaaaaaaaaaaaaaaa");
}

async function main() {
  await virtualMachineScaleSetReimageAllMaximumSetGen();
  await virtualMachineScaleSetReimageAllMinimumSetGen();
}

main().catch(console.error);
