// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all available virtual machine sizes to which the specified virtual machine can be resized.
 *
 * @summary lists all available virtual machine sizes to which the specified virtual machine can be resized.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_ListAvailableVmSizes.json
 */
async function listsAllAvailableVirtualMachineSizesToWhichTheSpecifiedVirtualMachineCanBeResized(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachines.listAvailableSizes(
    "myResourceGroup",
    "myVmName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listsAllAvailableVirtualMachineSizesToWhichTheSpecifiedVirtualMachineCanBeResized();
}

main().catch(console.error);
