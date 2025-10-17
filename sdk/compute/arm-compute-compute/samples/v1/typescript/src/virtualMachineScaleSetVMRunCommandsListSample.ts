// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to get all run commands of an instance in Virtual Machine Scaleset.
 *
 * @summary the operation to get all run commands of an instance in Virtual Machine Scaleset.
 * x-ms-original-file: 2025-04-01/runCommandExamples/VirtualMachineScaleSetVMRunCommand_List.json
 */
async function listRunCommandsInVmssInstance(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachineScaleSetVMRunCommands.list(
    "myResourceGroup",
    "myvmScaleSet",
    "0",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listRunCommandsInVmssInstance();
}

main().catch(console.error);
