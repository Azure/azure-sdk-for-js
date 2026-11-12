// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to delete the VMSS VM diagnostic run command.
 *
 * @summary the operation to delete the VMSS VM diagnostic run command.
 * x-ms-original-file: 2026-04-01/diagnosticRunCommandExamples/VirtualMachineScaleSetVMDiagnosticRunCommand_Delete.json
 */
async function deleteVirtualMachineScaleSetVMDiagnosticRunCommand(): Promise<void> {
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

async function main(): Promise<void> {
  await deleteVirtualMachineScaleSetVMDiagnosticRunCommand();
}

main().catch(console.error);
