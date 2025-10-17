// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
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
  const result = await client.virtualMachineScaleSetVMS.restart(
    "rgcompute",
    "aa",
    "aaaaaaaaaaaaaaaaa",
  );
  console.log(result);
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
  const result = await client.virtualMachineScaleSetVMS.restart(
    "rgcompute",
    "aaaaaaaaaaaa",
    "aaaaaa",
  );
  console.log(result);
}

async function main() {
  await virtualMachineScaleSetVMRestartMaximumSetGen();
  await virtualMachineScaleSetVMRestartMinimumSetGen();
}

main().catch(console.error);
