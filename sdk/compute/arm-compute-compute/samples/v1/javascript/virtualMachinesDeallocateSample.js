// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to shuts down the virtual machine and releases the compute resources. You are not billed for the compute resources that this virtual machine uses.
 *
 * @summary shuts down the virtual machine and releases the compute resources. You are not billed for the compute resources that this virtual machine uses.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Deallocate_MaximumSet_Gen.json
 */
async function virtualMachineDeallocateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachines.deallocate("rgcompute", "aaaaaaaaaa", {
    hibernate: true,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to shuts down the virtual machine and releases the compute resources. You are not billed for the compute resources that this virtual machine uses.
 *
 * @summary shuts down the virtual machine and releases the compute resources. You are not billed for the compute resources that this virtual machine uses.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Deallocate_MinimumSet_Gen.json
 */
async function virtualMachineDeallocateMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachines.deallocate("rgcompute", "aaaaaaaaaaaaaaaa");
  console.log(result);
}

async function main() {
  await virtualMachineDeallocateMaximumSetGen();
  await virtualMachineDeallocateMinimumSetGen();
}

main().catch(console.error);
