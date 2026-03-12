// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIVMManagementClient } from "@azure/arm-azurestackhcivm";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a virtual machine instance
 *
 * @summary gets a virtual machine instance
 * x-ms-original-file: 2025-06-01-preview/VirtualMachineInstances_Get.json
 */
async function getVirtualMachineInstance(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineInstances.get(
    "subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/testrg/providers/Microsoft.HybridCompute/machines/DemoVM",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getVirtualMachineInstance();
}

main().catch(console.error);
