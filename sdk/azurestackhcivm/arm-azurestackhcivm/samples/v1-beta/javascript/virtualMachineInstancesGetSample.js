// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhcivm");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a virtual machine instance
 *
 * @summary gets a virtual machine instance
 * x-ms-original-file: 2025-06-01-preview/VirtualMachineInstances_Get.json
 */
async function getVirtualMachineInstance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.virtualMachineInstances.get(
    "subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/testrg/providers/Microsoft.HybridCompute/machines/DemoVM",
  );
  console.log(result);
}

async function main() {
  await getVirtualMachineInstance();
}

main().catch(console.error);
