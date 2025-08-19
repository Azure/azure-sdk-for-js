// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The operation to update the VMSS VM run command.
 *
 * @summary The operation to update the VMSS VM run command.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2024-11-01/examples/runCommandExamples/VirtualMachineScaleSetVMRunCommand_Update.json
 */

import {
  VirtualMachineRunCommandUpdate,
  ComputeManagementClient,
} from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateVirtualMachineScaleSetVMRunCommand(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const vmScaleSetName = "myvmScaleSet";
  const instanceId = "0";
  const runCommandName = "myRunCommand";
  const runCommand: VirtualMachineRunCommandUpdate = {
    source: {
      scriptUri:
        "https://mystorageaccount.blob.core.windows.net/scriptcontainer/MyScript.ps1",
      scriptUriManagedIdentity: {
        objectId: "4231e4d2-33e4-4e23-96b2-17888afa6072",
      },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result =
    await client.virtualMachineScaleSetVMRunCommands.beginUpdateAndWait(
      resourceGroupName,
      vmScaleSetName,
      instanceId,
      runCommandName,
      runCommand,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await updateVirtualMachineScaleSetVMRunCommand();
}

main().catch(console.error);
