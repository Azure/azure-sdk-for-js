// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all private endpoint connections for a bookshelf.
 *
 * @summary lists all private endpoint connections for a bookshelf.
 * x-ms-original-file: 2026-06-01/BookshelfPrivateEndpointConnections_ListByBookshelf_MaximumSet_Gen.json
 */
async function bookshelfPrivateEndpointConnectionsListByBookshelfMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.bookshelfPrivateEndpointConnections.listByBookshelf(
    "rgdiscovery",
    "4a89794042861144cd",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await bookshelfPrivateEndpointConnectionsListByBookshelfMaximumSet();
}

main().catch(console.error);
