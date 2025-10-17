// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to delete the VMSS VM run command.
 *
 * @summary the operation to delete the VMSS VM run command.
 * x-ms-original-file: 2025-04-01/runCommandExamples/VirtualMachineScaleSetVMRunCommand_Delete.json
 */
async function deleteVirtualMachineScaleSetVMRunCommand(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.virtualMachineScaleSetVMRunCommands.delete(
    "myResourceGroup",
    "myvmScaleSet",
    "0",
    "myRunCommand",
  );
}

async function main(): Promise<void> {
  await deleteVirtualMachineScaleSetVMRunCommand();
}

main().catch(console.error);
