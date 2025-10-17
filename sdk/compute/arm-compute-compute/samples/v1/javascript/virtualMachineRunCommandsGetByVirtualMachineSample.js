// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to get the run command.
 *
 * @summary the operation to get the run command.
 * x-ms-original-file: 2025-04-01/runCommandExamples/VirtualMachineRunCommand_Get.json
 */
async function getARunCommand() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineRunCommands.getByVirtualMachine(
    "myResourceGroup",
    "myVM",
    "myRunCommand",
  );
  console.log(result);
}

async function main() {
  await getARunCommand();
}

main().catch(console.error);
