// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all private endpoint connections for a bookshelf.
 *
 * @summary lists all private endpoint connections for a bookshelf.
 * x-ms-original-file: 2026-02-01-preview/BookshelfPrivateEndpointConnections_ListByBookshelf_MaximumSet_Gen.json
 */
async function bookshelfPrivateEndpointConnectionsListByBookshelfMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.bookshelfPrivateEndpointConnections.listByBookshelf(
    "rgdiscovery",
    "d96263ffc8d8c904d4",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await bookshelfPrivateEndpointConnectionsListByBookshelfMaximumSet();
}

main().catch(console.error);
