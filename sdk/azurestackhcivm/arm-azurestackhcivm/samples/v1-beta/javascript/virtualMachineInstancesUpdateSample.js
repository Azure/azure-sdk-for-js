// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIVMManagementClient } = require("@azure/arm-azurestackhcivm");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to update a virtual machine instance.
 *
 * @summary the operation to update a virtual machine instance.
 * x-ms-original-file: 2026-04-01-preview/VirtualMachineInstances_Update.json
 */
async function updateVirtualMachine() {
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

async function main() {
  await updateVirtualMachine();
}

main().catch(console.error);
