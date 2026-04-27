// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a private endpoint connection.
 *
 * @summary updates a private endpoint connection.
 * x-ms-original-file: 2026-01-20-preview/PrivateEndpointConnections_Update.json
 */
async function approveOrRejectAPrivateEndpointConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.horizonDbPrivateEndpointConnections.update(
    "exampleresourcegroup",
    "exampleprivateendpointconnection.1fa229cd-bf3f-47f0-8c49-afb36723997e",
    {
      properties: {
        privateLinkServiceConnectionState: {
          description: "Approved by johndoe@contoso.com",
          status: "Approved",
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await approveOrRejectAPrivateEndpointConnection();
}

main().catch(console.error);
