// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a private endpoint connection.
 *
 * @summary deletes a private endpoint connection.
 * x-ms-original-file: 2026-01-20-preview/PrivateEndpointConnections_Delete.json
 */
async function deleteAPrivateEndpointConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  await client.horizonDbPrivateEndpointConnections.delete(
    "exampleresourcegroup",
    "exampleprivateendpointconnection.1fa229cd-bf3f-47f0-8c49-afb36723997e",
  );
}

async function main() {
  await deleteAPrivateEndpointConnection();
}

main().catch(console.error);
