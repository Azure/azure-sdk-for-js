// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to get the VMSS VM diagnostic run command.
 *
 * @summary the operation to get the VMSS VM diagnostic run command.
 * x-ms-original-file: 2026-04-01/diagnosticRunCommandExamples/VirtualMachineScaleSetVMDiagnosticRunCommand_Get.json
 */
async function getVirtualMachineScaleSetVMDiagnosticRunCommands(): Promise<void> {
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

async function main(): Promise<void> {
  await getVirtualMachineScaleSetVMDiagnosticRunCommands();
}

main().catch(console.error);
