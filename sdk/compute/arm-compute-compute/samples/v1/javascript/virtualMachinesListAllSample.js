// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of the virtual machines in the specified subscription. Use the nextLink property in the response to get the next page of virtual machines.
 *
 * @summary lists all of the virtual machines in the specified subscription. Use the nextLink property in the response to get the next page of virtual machines.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_ListAll_MaximumSet_Gen.json
 */
async function virtualMachineListAllMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachines.listAll({
    statusOnly: "aaaaaa",
    filter: "aaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all of the virtual machines in the specified subscription. Use the nextLink property in the response to get the next page of virtual machines.
 *
 * @summary lists all of the virtual machines in the specified subscription. Use the nextLink property in the response to get the next page of virtual machines.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_ListAll_MinimumSet_Gen.json
 */
async function virtualMachineListAllMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachines.listAll()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await virtualMachineListAllMaximumSetGen();
  await virtualMachineListAllMinimumSetGen();
}

main().catch(console.error);
