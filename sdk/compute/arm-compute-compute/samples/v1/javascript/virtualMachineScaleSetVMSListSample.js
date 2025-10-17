// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of all virtual machines in a VM scale sets.
 *
 * @summary gets a list of all virtual machines in a VM scale sets.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetVM_List_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetVMListMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
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
async function virtualMachineScaleSetVMListMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
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
async function listVmssVMsWithResilientVMDeletionStatus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachineScaleSetVMS.list("resourceGroupname", "vmssName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await virtualMachineScaleSetVMListMaximumSetGen();
  await virtualMachineScaleSetVMListMinimumSetGen();
  await listVmssVMsWithResilientVMDeletionStatus();
}

main().catch(console.error);
