// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to The operation to get all run commands of a Virtual Machine.
 *
 * @summary The operation to get all run commands of a Virtual Machine.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/runCommandExamples/VirtualMachineRunCommand_List.json
 */
async function listRunCommandsInAVirtualMachine() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const vmName = "myVM";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachineRunCommands.listByVirtualMachine(
    resourceGroupName,
    vmName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listRunCommandsInAVirtualMachine();
}

main().catch(console.error);
