// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to start a virtual machine.
 *
 * @summary the operation to start a virtual machine.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Start_MaximumSet_Gen.json
 */
async function virtualMachineStartMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachines.start("rgcompute", "aaaaaaaaaaaaaaaaaaaa");
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to start a virtual machine.
 *
 * @summary the operation to start a virtual machine.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Start_MinimumSet_Gen.json
 */
async function virtualMachineStartMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachines.start("rgcompute", "aaaaa");
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachineStartMaximumSetGen();
  await virtualMachineStartMinimumSetGen();
}

main().catch(console.error);
