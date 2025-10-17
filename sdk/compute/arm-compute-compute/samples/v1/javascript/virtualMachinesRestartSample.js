// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to restart a virtual machine.
 *
 * @summary the operation to restart a virtual machine.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Restart_MaximumSet_Gen.json
 */
async function virtualMachineRestartMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachines.restart("rgcompute", "aaaaaaaaaaaaaaaaaaaa");
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to restart a virtual machine.
 *
 * @summary the operation to restart a virtual machine.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Restart_MinimumSet_Gen.json
 */
async function virtualMachineRestartMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachines.restart("rgcompute", "aaa");
  console.log(result);
}

async function main() {
  await virtualMachineRestartMaximumSetGen();
  await virtualMachineRestartMinimumSetGen();
}

main().catch(console.error);
