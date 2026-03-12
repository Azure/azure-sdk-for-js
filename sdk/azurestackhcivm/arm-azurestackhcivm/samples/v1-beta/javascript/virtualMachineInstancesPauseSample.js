// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIVMManagementClient } = require("@azure/arm-azurestackhcivm");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to pause a virtual machine instance.
 *
 * @summary the operation to pause a virtual machine instance.
 * x-ms-original-file: 2025-06-01-preview/VirtualMachineInstances_Pause.json
 */
async function pauseVirtualMachine() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  await client.virtualMachineInstances.pause(
    "subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/testrg/Microsoft.HybridCompute/machines/DemoVM/providers/Microsoft.AzureStackHCI/virtualMachineInstances/default",
  );
}

async function main() {
  await pauseVirtualMachine();
}

main().catch(console.error);
