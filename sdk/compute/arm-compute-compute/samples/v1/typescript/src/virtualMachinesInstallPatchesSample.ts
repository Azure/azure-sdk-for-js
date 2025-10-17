// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to installs patches on the VM.
 *
 * @summary installs patches on the VM.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_InstallPatches.json
 */
async function installPatchStateOfAVirtualMachine(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachines.installPatches("myResourceGroupName", "myVMName", {
    maximumDuration: "PT4H",
    rebootSetting: "IfRequired",
    windowsParameters: {
      classificationsToInclude: ["Critical", "Security"],
      maxPatchPublishDate: new Date("2020-11-19T02:36:43.0539904+00:00"),
      patchNameMasksToInclude: ["*SQL*"],
      patchNameMasksToExclude: ["*Windows*"],
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await installPatchStateOfAVirtualMachine();
}

main().catch(console.error);
