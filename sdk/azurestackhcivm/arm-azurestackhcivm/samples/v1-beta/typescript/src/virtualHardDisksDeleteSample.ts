// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIVMManagementClient } from "@azure/arm-azurestackhcivm";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to delete a virtual hard disk.
 *
 * @summary the operation to delete a virtual hard disk.
 * x-ms-original-file: 2025-06-01-preview/VirtualHardDisks_Delete.json
 */
async function deleteVirtualHardDisk(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  await client.virtualHardDisks.delete("test-rg", "test-vhd");
}

async function main(): Promise<void> {
  await deleteVirtualHardDisk();
}

main().catch(console.error);
