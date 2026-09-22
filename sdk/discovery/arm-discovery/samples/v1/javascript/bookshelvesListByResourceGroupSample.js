// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Bookshelf resources by resource group
 *
 * @summary list Bookshelf resources by resource group
 * x-ms-original-file: 2026-06-01/Bookshelves_ListByResourceGroup_MaximumSet_Gen.json
 */
async function bookshelvesListByResourceGroupMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.bookshelves.listByResourceGroup("rgdiscovery")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await bookshelvesListByResourceGroupMaximumSet();
}

main().catch(console.error);
