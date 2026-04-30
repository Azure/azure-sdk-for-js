// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified private endpoint connection associated with the bookshelf.
 *
 * @summary gets the specified private endpoint connection associated with the bookshelf.
 * x-ms-original-file: 2026-02-01-preview/BookshelfPrivateEndpointConnections_Get_MaximumSet_Gen.json
 */
async function bookshelfPrivateEndpointConnectionsGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.bookshelfPrivateEndpointConnections.get(
    "rgdiscovery",
    "ca2ea71fd0a5838c7f",
    "connection",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await bookshelfPrivateEndpointConnectionsGetMaximumSet();
}

main().catch(console.error);
