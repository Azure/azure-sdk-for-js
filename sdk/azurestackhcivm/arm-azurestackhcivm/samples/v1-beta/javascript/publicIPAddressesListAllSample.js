// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIVMManagementClient } = require("@azure/arm-azurestackhcivm");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of the publicIPAddresses in the specified subscription. Use the nextLink property in the response to get the next page of PublicIP.
 *
 * @summary lists all of the publicIPAddresses in the specified subscription. Use the nextLink property in the response to get the next page of PublicIP.
 * x-ms-original-file: 2026-04-01-preview/PublicIPAddresses_ListALL.json
 */
async function listAllPublicIPAddresses() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.publicIPAddresses.listAll()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllPublicIPAddresses();
}

main().catch(console.error);
