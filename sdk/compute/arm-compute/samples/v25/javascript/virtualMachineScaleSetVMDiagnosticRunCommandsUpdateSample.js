// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to update the VMSS VM diagnostic run command.
 *
 * @summary the operation to update the VMSS VM diagnostic run command.
 * x-ms-original-file: 2026-04-01/diagnosticRunCommandExamples/VirtualMachineScaleSetVMDiagnosticRunCommand_Update.json
 */
async function updateVirtualMachineScaleSetVMDiagnosticRunCommand() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSetVMDiagnosticRunCommands.update(
    "myResourceGroup",
    "myvmScaleSet",
    "0",
    "myRunCommand",
    { source: { commandId: "FleetDiagnosticsWindows" } },
  );
}

async function main() {
  await updateVirtualMachineScaleSetVMDiagnosticRunCommand();
}

main().catch(console.error);
