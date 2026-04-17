// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to restarts a virtual machine in a VM scale set.
 *
 * @summary restarts a virtual machine in a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetVM_Restart_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetVMRestartMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.virtualMachineScaleSetVMs.restart("rgcompute", "aa", "aaaaaaaaaaaaaaaaa");
}

/**
 * This sample demonstrates how to restarts a virtual machine in a VM scale set.
 *
 * @summary restarts a virtual machine in a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetVM_Restart_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetVMRestartMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.virtualMachineScaleSetVMs.restart("rgcompute", "aaaaaaaaaaaa", "aaaaaa");
}

async function main() {
  await virtualMachineScaleSetVMRestartMaximumSetGen();
  await virtualMachineScaleSetVMRestartMinimumSetGen();
}

main().catch(console.error);
