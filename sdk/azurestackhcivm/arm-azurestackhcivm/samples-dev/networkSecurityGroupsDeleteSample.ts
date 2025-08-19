// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIVMManagementClient } from "@azure/arm-azurestackhcivm";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified network security group.
 *
 * @summary deletes the specified network security group.
 * x-ms-original-file: 2025-06-01-preview/NetworkSecurityGroups_Delete.json
 */
async function deleteNetworkSecurityGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  await client.networkSecurityGroups.delete("test-rg", "testnsg");
}

async function main(): Promise<void> {
  await deleteNetworkSecurityGroup();
}

main().catch(console.error);
