// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIVMManagementClient } = require("@azure/arm-azurestackhcivm");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a virtual hard disk
 *
 * @summary gets a virtual hard disk
 * x-ms-original-file: 2025-06-01-preview/VirtualHardDisks_Get.json
 */
async function getVirtualHardDisk() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  const result = await client.virtualHardDisks.get("test-rg", "test-vhd");
  console.log(result);
}

async function main() {
  await getVirtualHardDisk();
}

main().catch(console.error);
