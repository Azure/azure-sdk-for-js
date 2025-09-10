// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The operation to update the VMSS VM extension.
 *
 * @summary The operation to update the VMSS VM extension.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/stable/2020-06-01/examples/UpdateVirtualMachineScaleSetVMExtensions.json
 */

import type { VirtualMachineScaleSetVMExtensionUpdate } from "@azure/arm-compute-profile-2020-09-01-hybrid";
import { ComputeManagementClient } from "@azure/arm-compute-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateVirtualMachineScaleSetVMExtension(): Promise<void> {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const vmScaleSetName = "myvmScaleSet";
  const instanceId = "0";
  const vmExtensionName = "myVMExtension";
  const extensionParameters: VirtualMachineScaleSetVMExtensionUpdate = {
    typePropertiesType: "extType",
    autoUpgradeMinorVersion: true,
    publisher: "extPublisher",
    settings: { UserName: "xyz@microsoft.com" },
    typeHandlerVersion: "1.2",
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSetVMExtensions.beginUpdateAndWait(
    resourceGroupName,
    vmScaleSetName,
    instanceId,
    vmExtensionName,
    extensionParameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateVirtualMachineScaleSetVMExtension();
}

main().catch(console.error);
