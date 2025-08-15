// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIVMManagementClient } = require("@azure/arm-azurestackhcivm");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a network security group in the specified resource group.
 *
 * @summary creates or updates a network security group in the specified resource group.
 * x-ms-original-file: 2025-06-01-preview/NetworkSecurityGroups_CreateOrUpdate.json
 */
async function createNetworkSecurityGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityGroups.createOrUpdate("testrg", "testnsg", {
    location: "eastus",
  });
  console.log(result);
}

async function main() {
  await createNetworkSecurityGroup();
}

main().catch(console.error);
