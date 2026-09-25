// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to delete the VMSS VM diagnostic run command.
 *
 * @summary the operation to delete the VMSS VM diagnostic run command.
 * x-ms-original-file: 2026-04-01/diagnosticRunCommandExamples/VirtualMachineScaleSetVMDiagnosticRunCommand_Delete.json
 */
async function deleteVirtualMachineScaleSetVMDiagnosticRunCommand() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSetVMDiagnosticRunCommands.delete(
    "myResourceGroup",
    "myvmScaleSet",
    "0",
    "myRunCommand",
  );
}

async function main() {
  await deleteVirtualMachineScaleSetVMDiagnosticRunCommand();
}

main().catch(console.error);
