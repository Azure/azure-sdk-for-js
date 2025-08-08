// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhcivm");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of the virtual machine instances within the specified parent resource.
 *
 * @summary lists all of the virtual machine instances within the specified parent resource.
 * x-ms-original-file: 2025-06-01-preview/VirtualMachineInstances_List.json
 */
async function listVirtualMachineInstances() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachineInstances.list(
    "subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/testrg/providers/Microsoft.HybridCompute/machines/DemoVM",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listVirtualMachineInstances();
}

main().catch(console.error);
