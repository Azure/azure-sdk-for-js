// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to get all extensions of an instance in Virtual Machine Scaleset.
 *
 * @summary the operation to get all extensions of an instance in Virtual Machine Scaleset.
 * x-ms-original-file: 2025-11-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetVMExtension_List.json
 */
async function listExtensionsInVmssInstance(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSetVMExtensions.list(
    "myResourceGroup",
    "myvmScaleSet",
    "0",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await listExtensionsInVmssInstance();
}

main().catch(console.error);
