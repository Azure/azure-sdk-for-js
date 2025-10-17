// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to delete the VMSS VM extension.
 *
 * @summary the operation to delete the VMSS VM extension.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetVMExtension_Delete.json
 */
async function deleteVirtualMachineScaleSetVMExtension(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSetVMExtensions.delete(
    "myResourceGroup",
    "myvmScaleSet",
    "0",
    "myVMExtension",
  );
}

async function main(): Promise<void> {
  await deleteVirtualMachineScaleSetVMExtension();
}

main().catch(console.error);
