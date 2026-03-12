// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIVMManagementClient } from "@azure/arm-azurestackhcivm";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a network interface
 *
 * @summary gets a network interface
 * x-ms-original-file: 2025-06-01-preview/NetworkInterfaces_Get.json
 */
async function getNetworkInterface(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  const result = await client.networkInterfaces.get("test-rg", "test-nic");
  console.log(result);
}

async function main(): Promise<void> {
  await getNetworkInterface();
}

main().catch(console.error);
