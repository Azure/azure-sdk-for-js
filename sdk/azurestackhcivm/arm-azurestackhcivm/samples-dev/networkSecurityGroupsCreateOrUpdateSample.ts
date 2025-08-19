// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to creates or updates a network security group in the specified resource group.
 *
 * @summary creates or updates a network security group in the specified resource group.
 * x-ms-original-file: 2025-06-01-preview/NetworkSecurityGroups_CreateOrUpdate.json
 */

import { AzureStackHCIVMManagementClient } from "@azure/arm-azurestackhcivm";
import { DefaultAzureCredential } from "@azure/identity";

async function createNetworkSecurityGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityGroups.createOrUpdate("testrg", "testnsg", {
    location: "eastus",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createNetworkSecurityGroup();
}

main().catch(console.error);
