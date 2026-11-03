// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified private endpoint connection.
 *
 * @summary deletes the specified private endpoint connection.
 * x-ms-original-file: 2026-06-01/BookshelfPrivateEndpointConnections_Delete_MaximumSet_Gen.json
 */
async function bookshelfPrivateEndpointConnectionsDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  await client.bookshelfPrivateEndpointConnections.delete(
    "rgdiscovery",
    "f26e3436689dc08264",
    "connection",
  );
}

async function main(): Promise<void> {
  await bookshelfPrivateEndpointConnectionsDeleteMaximumSet();
}

main().catch(console.error);
