// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to the operation to start a virtual machine instance.
 *
 * @summary the operation to start a virtual machine instance.
 * x-ms-original-file: 2025-06-01-preview/VirtualMachineInstances_Start.json
 */

import { AzureStackHCIVMManagementClient } from "@azure/arm-azurestackhcivm";
import { DefaultAzureCredential } from "@azure/identity";

async function startVirtualMachine(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  await client.virtualMachineInstances.start(
    "subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/testrg/providers/Microsoft.HybridCompute/machines/DemoVM/providers/Microsoft.AzureStackHCI/virtualMachineInstances/default",
  );
}

async function main(): Promise<void> {
  await startVirtualMachine();
}

main().catch(console.error);
