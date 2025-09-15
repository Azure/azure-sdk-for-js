// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The operation to delete the VMSS VM extension.
 *
 * @summary The operation to delete the VMSS VM extension.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/stable/2020-06-01/examples/DeleteVirtualMachineScaleSetVMExtensions.json
 */

import { ComputeManagementClient } from "@azure/arm-compute-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteVirtualMachineScaleSetVMExtension(): Promise<void> {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const vmScaleSetName = "myvmScaleSet";
  const instanceId = "0";
  const vmExtensionName = "myVMExtension";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSetVMExtensions.beginDeleteAndWait(
    resourceGroupName,
    vmScaleSetName,
    instanceId,
    vmExtensionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteVirtualMachineScaleSetVMExtension();
}

main().catch(console.error);
