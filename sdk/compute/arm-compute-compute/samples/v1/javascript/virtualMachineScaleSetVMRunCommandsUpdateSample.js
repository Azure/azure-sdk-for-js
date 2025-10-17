// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to update the VMSS VM run command.
 *
 * @summary the operation to update the VMSS VM run command.
 * x-ms-original-file: 2025-04-01/runCommandExamples/VirtualMachineScaleSetVMRunCommand_Update.json
 */
async function updateVirtualMachineScaleSetVMRunCommand() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
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

async function main() {
  await updateVirtualMachineScaleSetVMRunCommand();
}

main().catch(console.error);
