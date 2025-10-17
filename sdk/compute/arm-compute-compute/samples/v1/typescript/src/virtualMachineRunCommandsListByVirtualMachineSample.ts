// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to get all run commands of a Virtual Machine.
 *
 * @summary the operation to get all run commands of a Virtual Machine.
 * x-ms-original-file: 2025-04-01/runCommandExamples/VirtualMachineRunCommand_List.json
 */
async function listRunCommandsInAVirtualMachine(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachineRunCommands.listByVirtualMachine(
    "myResourceGroup",
    "myVM",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listRunCommandsInAVirtualMachine();
}

main().catch(console.error);
