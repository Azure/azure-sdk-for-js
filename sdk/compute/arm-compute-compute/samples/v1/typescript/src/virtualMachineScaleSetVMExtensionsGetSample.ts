// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to get the VMSS VM extension.
 *
 * @summary the operation to get the VMSS VM extension.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetVMExtension_Get.json
 */
async function getVirtualMachineScaleSetVMExtension(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSetVMExtensions.get(
    "myResourceGroup",
    "myvmScaleSet",
    "0",
    "myVMExtension",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getVirtualMachineScaleSetVMExtension();
}

main().catch(console.error);
