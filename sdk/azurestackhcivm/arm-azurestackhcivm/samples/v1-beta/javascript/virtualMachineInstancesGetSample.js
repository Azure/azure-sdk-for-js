// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIVMManagementClient } = require("@azure/arm-azurestackhcivm");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a virtual machine instance
 *
 * @summary gets a virtual machine instance
 * x-ms-original-file: 2026-07-01-preview/VirtualMachineInstances_Get.json
 */
async function getVirtualMachineInstance() {
  const credential = new DefaultAzureCredential();
  const client = new AzureStackHCIVMManagementClient(credential);
  const result = await client.virtualMachineInstances.get(
    "subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/testrg/providers/Microsoft.HybridCompute/machines/DemoVM",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a virtual machine instance
 *
 * @summary gets a virtual machine instance
 * x-ms-original-file: 2026-07-01-preview/VirtualMachineInstances_Get_OperationFailed.json
 */
async function getVirtualMachineInstanceWithFailedOperation() {
  const credential = new DefaultAzureCredential();
  const client = new AzureStackHCIVMManagementClient(credential);
  const result = await client.virtualMachineInstances.get(
    "subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/testrg/providers/Microsoft.HybridCompute/machines/DemoVM",
  );
  console.log(result);
}

async function main() {
  await getVirtualMachineInstance();
  await getVirtualMachineInstanceWithFailedOperation();
}

main().catch(console.error);
