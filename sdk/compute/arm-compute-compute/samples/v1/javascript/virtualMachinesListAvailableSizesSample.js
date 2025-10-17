// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all available virtual machine sizes to which the specified virtual machine can be resized.
 *
 * @summary lists all available virtual machine sizes to which the specified virtual machine can be resized.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_ListAvailableVmSizes.json
 */
async function listsAllAvailableVirtualMachineSizesToWhichTheSpecifiedVirtualMachineCanBeResized() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachines.listAvailableSizes(
    "myResourceGroup",
    "myVmName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listsAllAvailableVirtualMachineSizesToWhichTheSpecifiedVirtualMachineCanBeResized();
}

main().catch(console.error);
