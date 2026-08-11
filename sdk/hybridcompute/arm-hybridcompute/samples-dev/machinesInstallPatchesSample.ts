// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementClient } from "@azure/arm-hybridcompute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to install patches on a hybrid machine identity in Azure.
 *
 * @summary the operation to install patches on a hybrid machine identity in Azure.
 * x-ms-original-file: 2026-06-16-preview/machine/Machine_InstallPatches.json
 */
async function installPatchStateOfAMachine(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.machines.installPatches("myResourceGroupName", "myMachineName", {
    maximumDuration: "PT4H",
    rebootSetting: "IfRequired",
    windowsParameters: {
      classificationsToInclude: ["Critical", "Security"],
      maxPatchPublishDate: new Date("2021-08-19T02:36:43.0539904+00:00"),
      patchNameMasksToExclude: ["*Windows*"],
      patchNameMasksToInclude: ["*SQL*"],
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await installPatchStateOfAMachine();
}

main().catch(console.error);
