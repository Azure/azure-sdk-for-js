// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to The operation to update the VMSS VM run command.
 *
 * @summary The operation to update the VMSS VM run command.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/runCommandExamples/VirtualMachineScaleSetVMRunCommand_Update.json
 */
async function updateVirtualMachineScaleSetVMRunCommand() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const vmScaleSetName = "myvmScaleSet";
  const instanceId = "0";
  const runCommandName = "myRunCommand";
  const runCommand = {
    source: {
      scriptUri: "https://mystorageaccount.blob.core.windows.net/scriptcontainer/MyScript.ps1",
      scriptUriManagedIdentity: {
        objectId: "4231e4d2-33e4-4e23-96b2-17888afa6072",
      },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSetVMRunCommands.beginUpdateAndWait(
    resourceGroupName,
    vmScaleSetName,
    instanceId,
    runCommandName,
    runCommand,
  );
  console.log(result);
}

async function main() {
  await updateVirtualMachineScaleSetVMRunCommand();
}

main().catch(console.error);
