// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to approves or updates the specified private endpoint connection.
 *
 * @summary approves or updates the specified private endpoint connection.
 * x-ms-original-file: 2026-06-01/BookshelfPrivateEndpointConnections_CreateOrUpdate_MaximumSet_Gen.json
 */
async function bookshelfPrivateEndpointConnectionsCreateOrUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.bookshelfPrivateEndpointConnections.createOrUpdate(
    "rgdiscovery",
    "10ae70fbcf775d1e88",
    "connection",
    {
      properties: {
        privateEndpoint: {},
        privateLinkServiceConnectionState: {
          status: "Pending",
          description: "km",
          actionsRequired: "xbshniighjomlygqk",
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await bookshelfPrivateEndpointConnectionsCreateOrUpdateMaximumSet();
}

main().catch(console.error);
