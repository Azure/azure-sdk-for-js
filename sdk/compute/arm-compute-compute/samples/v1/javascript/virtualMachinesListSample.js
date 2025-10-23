// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of the virtual machines in the specified resource group. Use the nextLink property in the response to get the next page of virtual machines.
 *
 * @summary lists all of the virtual machines in the specified resource group. Use the nextLink property in the response to get the next page of virtual machines.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_List_MaximumSet_Gen.json
 */
async function virtualMachineListMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachines.list("rgcompute", {
    filter: "aaaaaaaaaaaaaaaaaaaaaaa",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all of the virtual machines in the specified resource group. Use the nextLink property in the response to get the next page of virtual machines.
 *
 * @summary lists all of the virtual machines in the specified resource group. Use the nextLink property in the response to get the next page of virtual machines.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_List_MinimumSet_Gen.json
 */
async function virtualMachineListMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachines.list("rgcompute")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await virtualMachineListMaximumSetGen();
  await virtualMachineListMinimumSetGen();
}

main().catch(console.error);
