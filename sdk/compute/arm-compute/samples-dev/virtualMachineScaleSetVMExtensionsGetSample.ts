// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The operation to get the VMSS VM extension.
 *
 * @summary The operation to get the VMSS VM extension.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2024-11-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSetVMExtension_Get.json
 */

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getVirtualMachineScaleSetVMExtension(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const vmScaleSetName = "myvmScaleSet";
  const instanceId = "0";
  const vmExtensionName = "myVMExtension";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSetVMExtensions.get(
    resourceGroupName,
    vmScaleSetName,
    instanceId,
    vmExtensionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getVirtualMachineScaleSetVMExtension();
}

main().catch(console.error);
