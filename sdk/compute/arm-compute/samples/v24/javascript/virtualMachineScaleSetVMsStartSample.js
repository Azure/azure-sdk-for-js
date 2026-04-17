// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to starts a virtual machine in a VM scale set.
 *
 * @summary starts a virtual machine in a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetVM_Start_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetVMStartMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.virtualMachineScaleSetVMs.start("rgcompute", "aaaaaaaaaaaaaa", "aaaaaaaaaaaaa");
}

/**
 * This sample demonstrates how to starts a virtual machine in a VM scale set.
 *
 * @summary starts a virtual machine in a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetVM_Start_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetVMStartMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.virtualMachineScaleSetVMs.start(
    "rgcompute",
    "aaaaaaaaaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaa",
  );
}

async function main() {
  await virtualMachineScaleSetVMStartMaximumSetGen();
  await virtualMachineScaleSetVMStartMinimumSetGen();
}

main().catch(console.error);
