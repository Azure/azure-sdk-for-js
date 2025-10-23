// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of all VM scale sets under a resource group.
 *
 * @summary gets a list of all VM scale sets under a resource group.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_List_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetListMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachineScaleSets.list("rgcompute")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to gets a list of all VM scale sets under a resource group.
 *
 * @summary gets a list of all VM scale sets under a resource group.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_List_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetListMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachineScaleSets.list("rgcompute")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await virtualMachineScaleSetListMaximumSetGen();
  await virtualMachineScaleSetListMinimumSetGen();
}

main().catch(console.error);
