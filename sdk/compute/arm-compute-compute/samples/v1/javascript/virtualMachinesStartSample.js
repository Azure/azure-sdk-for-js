// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to start a virtual machine.
 *
 * @summary the operation to start a virtual machine.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Start_MaximumSet_Gen.json
 */
async function virtualMachineStartMaximumSetGen() {
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
async function virtualMachineStartMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachines.start("rgcompute", "aaaaa");
  console.log(result);
}

async function main() {
  await virtualMachineStartMaximumSetGen();
  await virtualMachineStartMinimumSetGen();
}

main().catch(console.error);
