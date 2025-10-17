// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to perform maintenance on a virtual machine.
 *
 * @summary the operation to perform maintenance on a virtual machine.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_PerformMaintenance_MaximumSet_Gen.json
 */
async function virtualMachinePerformMaintenanceMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachines.performMaintenance("rgcompute", "aaaaaaa");
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to perform maintenance on a virtual machine.
 *
 * @summary the operation to perform maintenance on a virtual machine.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_PerformMaintenance_MinimumSet_Gen.json
 */
async function virtualMachinePerformMaintenanceMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachines.performMaintenance("rgcompute", "aaaaaaaaaa");
  console.log(result);
}

async function main() {
  await virtualMachinePerformMaintenanceMaximumSetGen();
  await virtualMachinePerformMaintenanceMinimumSetGen();
}

main().catch(console.error);
