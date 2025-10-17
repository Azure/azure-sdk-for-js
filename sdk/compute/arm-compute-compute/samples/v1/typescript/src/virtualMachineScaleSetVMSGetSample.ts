// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a virtual machine from a VM scale set.
 *
 * @summary gets a virtual machine from a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetVM_Get_WithResilientVMDeletionStatus.json
 */
async function getVMScaleSetVMWithResiliencyView(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSetVMS.get("myResourceGroup", "{vmss-name}", "1");
  console.log(result);
}

/**
 * This sample demonstrates how to gets a virtual machine from a VM scale set.
 *
 * @summary gets a virtual machine from a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetVM_Get_WithUserData.json
 */
async function getVMScaleSetVMWithUserData(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSetVMS.get("myResourceGroup", "{vmss-name}", "0");
  console.log(result);
}

/**
 * This sample demonstrates how to gets a virtual machine from a VM scale set.
 *
 * @summary gets a virtual machine from a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetVM_Get_WithVMSizeProperties.json
 */
async function getVMScaleSetVMWithVMSizeProperties(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSetVMS.get("myResourceGroup", "{vmss-name}", "0");
  console.log(result);
}

async function main(): Promise<void> {
  await getVMScaleSetVMWithResiliencyView();
  await getVMScaleSetVMWithUserData();
  await getVMScaleSetVMWithVMSizeProperties();
}

main().catch(console.error);
