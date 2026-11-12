// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to get the VMSS VM diagnostic run command.
 *
 * @summary the operation to get the VMSS VM diagnostic run command.
 * x-ms-original-file: 2026-04-01/diagnosticRunCommandExamples/VirtualMachineScaleSetVMDiagnosticRunCommand_Get.json
 */
async function getVirtualMachineScaleSetVMDiagnosticRunCommands() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSetVMDiagnosticRunCommands.get(
    "myResourceGroup",
    "myvmScaleSet",
    "0",
    "myRunCommand",
  );
  console.log(result);
}

async function main() {
  await getVirtualMachineScaleSetVMDiagnosticRunCommands();
}

main().catch(console.error);
