// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIVMManagementClient } from "@azure/arm-azurestackhcivm";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to power off a virtual machine instance.
 *
 * @summary the operation to power off a virtual machine instance.
 * x-ms-original-file: 2026-04-01-preview/VirtualMachineInstances_PowerOff.json
 */
async function powerOffVirtualMachine(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureStackHCIVMManagementClient(credential);
  const result = await client.virtualMachineInstances.powerOff(
    "subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/testrg/providers/Microsoft.HybridCompute/machines/DemoVM/providers/Microsoft.AzureStackHCI/virtualMachineInstances/default",
    { skipShutdown: false },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await powerOffVirtualMachine();
}

main().catch(console.error);
