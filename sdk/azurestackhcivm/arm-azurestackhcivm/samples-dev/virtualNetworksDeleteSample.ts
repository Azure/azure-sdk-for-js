// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIVMManagementClient } from "@azure/arm-azurestackhcivm";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to delete a virtual network.
 *
 * @summary the operation to delete a virtual network.
 * x-ms-original-file: 2026-04-01-preview/VirtualNetworks_Delete.json
 */
async function deleteVirtualNetwork(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  await client.virtualNetworks.delete("test-rg", "test-vnet");
}

async function main(): Promise<void> {
  await deleteVirtualNetwork();
}

main().catch(console.error);
