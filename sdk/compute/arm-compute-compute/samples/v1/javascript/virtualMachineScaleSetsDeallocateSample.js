// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deallocates specific virtual machines in a VM scale set. Shuts down the virtual machines and releases the compute resources. You are not billed for the compute resources that this virtual machine scale set deallocates.
 *
 * @summary deallocates specific virtual machines in a VM scale set. Shuts down the virtual machines and releases the compute resources. You are not billed for the compute resources that this virtual machine scale set deallocates.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Deallocate_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetDeallocateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSets.deallocate(
    "rgcompute",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    { vmInstanceIDs: { instanceIds: ["aaaaaaaaaaaaaaaaa"] }, hibernate: true },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to deallocates specific virtual machines in a VM scale set. Shuts down the virtual machines and releases the compute resources. You are not billed for the compute resources that this virtual machine scale set deallocates.
 *
 * @summary deallocates specific virtual machines in a VM scale set. Shuts down the virtual machines and releases the compute resources. You are not billed for the compute resources that this virtual machine scale set deallocates.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Deallocate_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetDeallocateMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSets.deallocate(
    "rgcompute",
    "aaaaaaaaaaaaaaaaaaaaaaaa",
  );
  console.log(result);
}

async function main() {
  await virtualMachineScaleSetDeallocateMaximumSetGen();
  await virtualMachineScaleSetDeallocateMinimumSetGen();
}

main().catch(console.error);
