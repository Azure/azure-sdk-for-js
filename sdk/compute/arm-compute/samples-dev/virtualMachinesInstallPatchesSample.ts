// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Installs patches on the VM.
 *
 * @summary Installs patches on the VM.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2024-11-01/examples/virtualMachineExamples/VirtualMachine_InstallPatches.json
 */

import {
  VirtualMachineInstallPatchesParameters,
  ComputeManagementClient,
} from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function installPatchStateOfAVirtualMachine(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroupName";
  const vmName = "myVMName";
  const installPatchesInput: VirtualMachineInstallPatchesParameters = {
    maximumDuration: "PT4H",
    rebootSetting: "IfRequired",
    windowsParameters: {
      classificationsToInclude: ["Critical", "Security"],
      maxPatchPublishDate: new Date("2020-11-19T02:36:43.0539904+00:00"),
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachines.beginInstallPatchesAndWait(
    resourceGroupName,
    vmName,
    installPatchesInput,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await installPatchStateOfAVirtualMachine();
}

main().catch(console.error);
