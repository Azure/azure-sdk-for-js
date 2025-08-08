// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhcivm";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified network security group.
 *
 * @summary gets the specified network security group.
 * x-ms-original-file: 2025-06-01-preview/NetworkSecurityGroups_Get.json
 */
async function getNetworkSecurityGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.networkSecurityGroups.get("test-rg", "testnsg");
  console.log(result);
}

async function main(): Promise<void> {
  await getNetworkSecurityGroup();
}

main().catch(console.error);
