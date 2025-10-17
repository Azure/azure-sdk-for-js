// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to get all run commands of a Virtual Machine.
 *
 * @summary the operation to get all run commands of a Virtual Machine.
 * x-ms-original-file: 2025-04-01/runCommandExamples/VirtualMachineRunCommand_List.json
 */
async function listRunCommandsInAVirtualMachine() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachineRunCommands.listByVirtualMachine(
    "myResourceGroup",
    "myVM",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listRunCommandsInAVirtualMachine();
}

main().catch(console.error);
