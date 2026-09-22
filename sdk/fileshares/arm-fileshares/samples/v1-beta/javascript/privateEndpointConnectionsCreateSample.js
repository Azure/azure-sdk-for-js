// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { FileSharesClient } = require("@azure/arm-fileshares");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update the state of specified private endpoint connection associated with the file share.
 *
 * @summary update the state of specified private endpoint connection associated with the file share.
 * x-ms-original-file: 2026-06-01/PrivateEndpointConnections_Create.json
 */
async function privateEndpointConnectionsCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0681745E-3F9F-4966-80E6-69624A3B29F2";
  const client = new FileSharesClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.create(
    "rgfileshares",
    "fileshare",
    "privateEndpointConnection1",
    {
      properties: {
        privateLinkServiceConnectionState: { status: "Approved", description: "Approved by admin" },
      },
    },
  );
  console.log(result);
}

async function main() {
  await privateEndpointConnectionsCreate();
}

main().catch(console.error);
