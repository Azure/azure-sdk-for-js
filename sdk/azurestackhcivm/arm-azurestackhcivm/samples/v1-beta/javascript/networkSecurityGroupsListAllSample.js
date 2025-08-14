// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIVMManagementClient } = require("@azure/arm-azurestackhcivm");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all network security groups in a subscription.
 *
 * @summary gets all network security groups in a subscription.
 * x-ms-original-file: 2025-06-01-preview/NetworkSecurityGroups_ListAll.json
 */
async function listAllNetworkSecurityGroups() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkSecurityGroups.listAll()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllNetworkSecurityGroups();
}

main().catch(console.error);
