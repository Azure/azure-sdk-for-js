// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The operation to perform maintenance on a virtual machine.
 *
 * @summary The operation to perform maintenance on a virtual machine.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2024-11-01/examples/virtualMachineExamples/VirtualMachine_PerformMaintenance_MaximumSet_Gen.json
 */

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function virtualMachinePerformMaintenanceMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "rgcompute";
  const vmName = "aaaaaaa";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachines.beginPerformMaintenanceAndWait(
    resourceGroupName,
    vmName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to The operation to perform maintenance on a virtual machine.
 *
 * @summary The operation to perform maintenance on a virtual machine.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2024-11-01/examples/virtualMachineExamples/VirtualMachine_PerformMaintenance_MinimumSet_Gen.json
 */
async function virtualMachinePerformMaintenanceMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "rgcompute";
  const vmName = "aaaaaaaaaa";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachines.beginPerformMaintenanceAndWait(
    resourceGroupName,
    vmName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachinePerformMaintenanceMaximumSetGen();
  await virtualMachinePerformMaintenanceMinimumSetGen();
}

main().catch(console.error);
