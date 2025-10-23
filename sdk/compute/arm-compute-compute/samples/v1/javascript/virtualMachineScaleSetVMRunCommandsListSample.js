// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to get all run commands of an instance in Virtual Machine Scaleset.
 *
 * @summary the operation to get all run commands of an instance in Virtual Machine Scaleset.
 * x-ms-original-file: 2025-04-01/runCommandExamples/VirtualMachineScaleSetVMRunCommand_List.json
 */
async function listRunCommandsInVmssInstance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
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

async function main() {
  await listRunCommandsInVmssInstance();
}

main().catch(console.error);
