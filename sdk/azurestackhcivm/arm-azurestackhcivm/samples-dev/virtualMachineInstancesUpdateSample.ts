// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIVMManagementClient } from "@azure/arm-azurestackhcivm";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to update a virtual machine instance.
 *
 * @summary the operation to update a virtual machine instance.
 * x-ms-original-file: 2026-07-01-preview/VirtualMachineInstances_Update.json
 */
async function updateVirtualMachine(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureStackHCIVMManagementClient(credential);
  const result = await client.virtualMachineInstances.update(
    "subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/testrg/providers/Microsoft.HybridCompute/machines/DemoVM",
    {
      properties: {
        storageProfile: {
          dataDisks: [
            {
              id: "/subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/testrg/providers/Microsoft.AzureStackHCI/virtualHardDisks/test-vhd",
            },
          ],
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to update a virtual machine instance.
 *
 * @summary the operation to update a virtual machine instance.
 * x-ms-original-file: 2026-07-01-preview/VirtualMachineInstances_Update_DynamicMemory.json
 */
async function updateVirtualMachineDynamicMemory(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureStackHCIVMManagementClient(credential);
  const result = await client.virtualMachineInstances.update(
    "subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/testrg/providers/Microsoft.HybridCompute/machines/DemoVM",
    {
      properties: {
        hardwareProfile: {
          dynamicMemoryConfig: {
            enabled: true,
            minimumMemoryMB: 2048,
            maximumMemoryMB: 8192,
            targetMemoryBuffer: 20,
          },
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateVirtualMachine();
  await updateVirtualMachineDynamicMemory();
}

main().catch(console.error);
