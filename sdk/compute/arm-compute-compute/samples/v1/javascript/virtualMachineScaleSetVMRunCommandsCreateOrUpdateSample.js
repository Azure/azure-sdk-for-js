// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to create or update the VMSS VM run command.
 *
 * @summary the operation to create or update the VMSS VM run command.
 * x-ms-original-file: 2025-04-01/runCommandExamples/VirtualMachineScaleSetVMRunCommand_CreateOrUpdate.json
 */
async function createVirtualMachineScaleSetVMRunCommand() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSetVMRunCommands.createOrUpdate(
    "myResourceGroup",
    "myvmScaleSet",
    "0",
    "myRunCommand",
    {
      location: "West US",
      properties: {
        source: {
          scriptUri: "https://mystorageaccount.blob.core.windows.net/scriptcontainer/MyScript.ps1",
          scriptUriManagedIdentity: {
            objectId: "4231e4d2-33e4-4e23-96b2-17888afa6072",
          },
        },
        parameters: [
          { name: "param1", value: "value1" },
          { name: "param2", value: "value2" },
        ],
        asyncExecution: false,
        treatFailureAsDeploymentFailure: true,
        runAsUser: "user1",
        runAsPassword: "<runAsPassword>",
        timeoutInSeconds: 3600,
        outputBlobUri:
          "https://mystorageaccount.blob.core.windows.net/myscriptoutputcontainer/MyScriptoutput.txt",
        errorBlobUri:
          "https://mystorageaccount.blob.core.windows.net/mycontainer/MyScriptError.txt",
        outputBlobManagedIdentity: {
          clientId: "22d35efb-0c99-4041-8c5b-6d24db33a69a",
        },
        errorBlobManagedIdentity: {},
      },
    },
  );
}

async function main() {
  await createVirtualMachineScaleSetVMRunCommand();
}

main().catch(console.error);
