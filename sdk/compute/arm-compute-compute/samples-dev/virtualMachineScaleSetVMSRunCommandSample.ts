// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to run command on a virtual machine in a VM scale set.
 *
 * @summary run command on a virtual machine in a VM scale set.
 * x-ms-original-file: 2025-04-01/runCommandExamples/VirtualMachineScaleSetVMRunCommand.json
 */
async function virtualMachineScaleSetVMsRunCommand(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSetVMS.runCommand(
    "myResourceGroup",
    "myVirtualMachineScaleSet",
    "0",
    { commandId: "RunPowerShellScript", script: ["Write-Host Hello World!"] },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachineScaleSetVMsRunCommand();
}

main().catch(console.error);
