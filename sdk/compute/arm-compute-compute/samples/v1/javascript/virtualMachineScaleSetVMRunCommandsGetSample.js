// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to get the VMSS VM run command.
 *
 * @summary the operation to get the VMSS VM run command.
 * x-ms-original-file: 2025-04-01/runCommandExamples/VirtualMachineScaleSetVMRunCommand_Get.json
 */
async function getVirtualMachineScaleSetVMRunCommands() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSetVMRunCommands.get(
    "myResourceGroup",
    "myvmScaleSet",
    "0",
    "myRunCommand",
  );
  console.log(result);
}

async function main() {
  await getVirtualMachineScaleSetVMRunCommands();
}

main().catch(console.error);
