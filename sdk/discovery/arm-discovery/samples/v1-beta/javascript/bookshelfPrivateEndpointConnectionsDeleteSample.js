// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified private endpoint connection.
 *
 * @summary deletes the specified private endpoint connection.
 * x-ms-original-file: 2026-02-01-preview/BookshelfPrivateEndpointConnections_Delete_MaximumSet_Gen.json
 */
async function bookshelfPrivateEndpointConnectionsDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  await client.bookshelfPrivateEndpointConnections.delete(
    "rgdiscovery",
    "9988c91bf62635cea5",
    "connection",
  );
}

async function main() {
  await bookshelfPrivateEndpointConnectionsDeleteMaximumSet();
}

main().catch(console.error);
