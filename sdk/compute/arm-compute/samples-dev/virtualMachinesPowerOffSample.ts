// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  VirtualMachinesPowerOffOptionalParams,
  ComputeManagementClient,
} from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to The operation to power off (stop) a virtual machine. The virtual machine can be restarted with the same provisioned resources. You are still charged for this virtual machine.
 *
 * @summary The operation to power off (stop) a virtual machine. The virtual machine can be restarted with the same provisioned resources. You are still charged for this virtual machine.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/virtualMachineExamples/VirtualMachine_PowerOff_MaximumSet_Gen.json
 */
async function virtualMachinePowerOffMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "rgcompute";
  const vmName = "aaaaaaaaaaaaaaaaaaaaaaaaaaa";
  const skipShutdown = true;
  const options: VirtualMachinesPowerOffOptionalParams = { skipShutdown };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachines.beginPowerOffAndWait(
    resourceGroupName,
    vmName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to The operation to power off (stop) a virtual machine. The virtual machine can be restarted with the same provisioned resources. You are still charged for this virtual machine.
 *
 * @summary The operation to power off (stop) a virtual machine. The virtual machine can be restarted with the same provisioned resources. You are still charged for this virtual machine.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/virtualMachineExamples/VirtualMachine_PowerOff_MinimumSet_Gen.json
 */
async function virtualMachinePowerOffMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "rgcompute";
  const vmName = "aaaaaaaaaaaaaaaaaa";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachines.beginPowerOffAndWait(
    resourceGroupName,
    vmName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachinePowerOffMaximumSetGen();
  await virtualMachinePowerOffMinimumSetGen();
}

main().catch(console.error);
