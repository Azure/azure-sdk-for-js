// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to the operation to update a network interface.
 *
 * @summary the operation to update a network interface.
 * x-ms-original-file: 2025-06-01-preview/NetworkInterfaces_Update.json
 */

import { AzureStackHCIVMManagementClient } from "@azure/arm-azurestackhcivm";
import { DefaultAzureCredential } from "@azure/identity";

async function updateNetworkInterface(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  const result = await client.networkInterfaces.update("test-rg", "test-nic", {
    tags: { additionalProperties: "sample" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateNetworkInterface();
}

main().catch(console.error);
