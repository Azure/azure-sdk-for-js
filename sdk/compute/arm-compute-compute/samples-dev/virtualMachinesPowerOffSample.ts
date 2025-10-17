// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to power off (stop) a virtual machine. The virtual machine can be restarted with the same provisioned resources. You are still charged for this virtual machine.
 *
 * @summary the operation to power off (stop) a virtual machine. The virtual machine can be restarted with the same provisioned resources. You are still charged for this virtual machine.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_PowerOff_MaximumSet_Gen.json
 */
async function virtualMachinePowerOffMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachines.powerOff("rgcompute", "aaaaaaaaaaaaaaaaaaaaaaaaaaa", {
    skipShutdown: true,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to power off (stop) a virtual machine. The virtual machine can be restarted with the same provisioned resources. You are still charged for this virtual machine.
 *
 * @summary the operation to power off (stop) a virtual machine. The virtual machine can be restarted with the same provisioned resources. You are still charged for this virtual machine.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_PowerOff_MinimumSet_Gen.json
 */
async function virtualMachinePowerOffMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachines.powerOff("rgcompute", "aaaaaaaaaaaaaaaaaa");
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachinePowerOffMaximumSetGen();
  await virtualMachinePowerOffMinimumSetGen();
}

main().catch(console.error);
