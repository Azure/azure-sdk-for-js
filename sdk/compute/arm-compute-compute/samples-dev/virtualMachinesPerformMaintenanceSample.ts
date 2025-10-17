// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to perform maintenance on a virtual machine.
 *
 * @summary the operation to perform maintenance on a virtual machine.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_PerformMaintenance_MaximumSet_Gen.json
 */
async function virtualMachinePerformMaintenanceMaximumSetGen(): Promise<void> {
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
async function virtualMachinePerformMaintenanceMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachines.performMaintenance("rgcompute", "aaaaaaaaaa");
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachinePerformMaintenanceMaximumSetGen();
  await virtualMachinePerformMaintenanceMinimumSetGen();
}

main().catch(console.error);
