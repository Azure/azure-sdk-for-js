// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to update the VMSS VM run command.
 *
 * @summary the operation to update the VMSS VM run command.
 * x-ms-original-file: 2025-04-01/runCommandExamples/VirtualMachineScaleSetVMRunCommand_Update.json
 */
async function updateVirtualMachineScaleSetVMRunCommand(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.virtualMachineScaleSetVMRunCommands.update(
    "myResourceGroup",
    "myvmScaleSet",
    "0",
    "myRunCommand",
    {
      properties: {
        source: {
          scriptUri: "https://mystorageaccount.blob.core.windows.net/scriptcontainer/MyScript.ps1",
          scriptUriManagedIdentity: {
            objectId: "4231e4d2-33e4-4e23-96b2-17888afa6072",
          },
        },
      },
    },
  );
}

async function main(): Promise<void> {
  await updateVirtualMachineScaleSetVMRunCommand();
}

main().catch(console.error);
