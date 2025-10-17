// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of all virtual machines in a VM scale sets.
 *
 * @summary gets a list of all virtual machines in a VM scale sets.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetVM_List_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetVMListMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachineScaleSetVMS.list(
    "rgcompute",
    "aaaaaaaaaaaaaaaaaaaaaa",
    {
      filter: "aaaaaaaaaaaaaa",
      select: "aaaaaaaaaaaaaaaaaaaaa",
      expand: "aaaaaaaaaaaaa",
    },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to gets a list of all virtual machines in a VM scale sets.
 *
 * @summary gets a list of all virtual machines in a VM scale sets.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetVM_List_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetVMListMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachineScaleSetVMS.list("rgcompute", "aaaaaaaaaaaaaa")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to gets a list of all virtual machines in a VM scale sets.
 *
 * @summary gets a list of all virtual machines in a VM scale sets.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetVM_List_WithResiliencyView.json
 */
async function listVmssVMsWithResilientVMDeletionStatus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachineScaleSetVMS.list("resourceGroupname", "vmssName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await virtualMachineScaleSetVMListMaximumSetGen();
  await virtualMachineScaleSetVMListMinimumSetGen();
  await listVmssVMsWithResilientVMDeletionStatus();
}

main().catch(console.error);
