// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIVMManagementClient } from "@azure/arm-azurestackhcivm";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to update a logical network.
 *
 * @summary the operation to update a logical network.
 * x-ms-original-file: 2025-06-01-preview/LogicalNetworks_Update.json
 */
async function updateLogicalNetwork(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  const result = await client.logicalNetworks.update("test-rg", "test-lnet", {
    tags: { additionalProperties: "sample" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateLogicalNetwork();
}

main().catch(console.error);
