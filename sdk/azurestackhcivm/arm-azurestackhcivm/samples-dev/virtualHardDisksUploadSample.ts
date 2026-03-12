// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to the operation to upload a virtual hard disk.
 *
 * @summary the operation to upload a virtual hard disk.
 * x-ms-original-file: 2025-06-01-preview/VirtualHardDisks_Upload.json
 */

import { AzureStackHCIVMManagementClient } from "@azure/arm-azurestackhcivm";
import { DefaultAzureCredential } from "@azure/identity";

async function uploadVirtualHardDisk(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  const result = await client.virtualHardDisks.upload("test-rg", "test-vhd", {
    azureManagedDiskUploadUrl:
      "https://YourStorageAccountName.blob.core.windows.net/YourContainerName/YourVHDBlobName.vhd?<sas-token>",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await uploadVirtualHardDisk();
}

main().catch(console.error);
