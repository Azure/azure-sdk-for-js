// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhcivm");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of the logical networks in the specified subscription. Use the nextLink property in the response to get the next page of logical networks.
 *
 * @summary lists all of the logical networks in the specified subscription. Use the nextLink property in the response to get the next page of logical networks.
 * x-ms-original-file: 2025-06-01-preview/LogicalNetworks_ListAll.json
 */
async function listLogicalNetworkBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.logicalNetworks.listAll()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listLogicalNetworkBySubscription();
}

main().catch(console.error);
