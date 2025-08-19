// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIVMManagementClient } = require("@azure/arm-azurestackhcivm");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to delete a logical network.
 *
 * @summary the operation to delete a logical network.
 * x-ms-original-file: 2025-06-01-preview/LogicalNetworks_Delete.json
 */
async function deleteLogicalNetwork() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  await client.logicalNetworks.delete("test-rg", "test-lnet");
}

async function main() {
  await deleteLogicalNetwork();
}

main().catch(console.error);
