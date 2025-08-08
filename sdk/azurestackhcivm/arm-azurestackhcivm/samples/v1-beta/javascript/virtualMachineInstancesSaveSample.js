// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhcivm");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to save a virtual machine instance.
 *
 * @summary the operation to save a virtual machine instance.
 * x-ms-original-file: 2025-06-01-preview/VirtualMachineInstances_Save.json
 */
async function saveVirtualMachine() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  await client.virtualMachineInstances.save(
    "subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/testrg/Microsoft.HybridCompute/machines/DemoVM/providers/Microsoft.AzureStackHCI/virtualMachineInstances/default",
  );
}

async function main() {
  await saveVirtualMachine();
}

main().catch(console.error);
