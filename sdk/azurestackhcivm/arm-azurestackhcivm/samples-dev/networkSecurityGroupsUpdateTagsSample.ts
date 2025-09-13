// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to updates a network security group tags.
 *
 * @summary updates a network security group tags.
 * x-ms-original-file: 2025-06-01-preview/NetworkSecurityGroups_UpdateTags.json
 */

import { AzureStackHCIVMManagementClient } from "@azure/arm-azurestackhcivm";
import { DefaultAzureCredential } from "@azure/identity";

async function updateNetworkSecurityGroupTags(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityGroups.updateTags("testrg", "testnsg", {
    tags: { tag1: "value1", tag2: "value2" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateNetworkSecurityGroupTags();
}

main().catch(console.error);
