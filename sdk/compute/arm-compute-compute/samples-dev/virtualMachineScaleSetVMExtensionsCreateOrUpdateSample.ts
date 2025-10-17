// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to create or update the VMSS VM extension.
 *
 * @summary the operation to create or update the VMSS VM extension.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetVMExtension_Create.json
 */
async function createVirtualMachineScaleSetVMExtension(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.virtualMachineScaleSetVMExtensions.createOrUpdate(
    "myResourceGroup",
    "myvmScaleSet",
    "0",
    "myVMExtension",
    {
      properties: {
        autoUpgradeMinorVersion: true,
        publisher: "extPublisher",
        type: "extType",
        typeHandlerVersion: "1.2",
        settings: { UserName: "xyz@microsoft.com" },
      },
    },
  );
}

async function main(): Promise<void> {
  await createVirtualMachineScaleSetVMExtension();
}

main().catch(console.error);
