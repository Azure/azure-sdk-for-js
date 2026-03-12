// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to The operation to get all run commands of an instance in Virtual Machine Scaleset.
 *
 * @summary The operation to get all run commands of an instance in Virtual Machine Scaleset.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/runCommandExamples/VirtualMachineScaleSetVMRunCommand_List.json
 */
async function listRunCommandsInVmssInstance() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const vmScaleSetName = "myvmScaleSet";
  const instanceId = "0";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachineScaleSetVMRunCommands.list(
    resourceGroupName,
    vmScaleSetName,
    instanceId,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listRunCommandsInVmssInstance();
}

main().catch(console.error);
