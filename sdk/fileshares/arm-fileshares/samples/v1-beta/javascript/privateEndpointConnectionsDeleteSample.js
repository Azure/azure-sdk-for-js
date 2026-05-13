// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { FileSharesClient } = require("@azure/arm-fileshares");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified private endpoint connection associated with the file share.
 *
 * @summary deletes the specified private endpoint connection associated with the file share.
 * x-ms-original-file: 2026-06-01/PrivateEndpointConnections_Delete.json
 */
async function privateEndpointConnectionsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0681745E-3F9F-4966-80E6-69624A3B29F2";
  const client = new FileSharesClient(credential, subscriptionId);
  await client.privateEndpointConnections.delete(
    "rgfileshares",
    "fileshare",
    "privateEndpointConnection1",
  );
}

async function main() {
  await privateEndpointConnectionsDelete();
}

main().catch(console.error);
