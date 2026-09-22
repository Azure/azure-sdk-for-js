// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PurviewManagementClient } = require("@azure/arm-purview");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a private endpoint connection
 *
 * @summary delete a private endpoint connection
 * x-ms-original-file: 2024-04-01-preview/PrivateEndpointConnections_Delete.json
 */
async function privateEndpointConnectionsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new PurviewManagementClient(credential, subscriptionId);
  await client.privateEndpointConnections.delete(
    "SampleResourceGroup",
    "account1",
    "privateEndpointConnection1",
  );
}

async function main() {
  await privateEndpointConnectionsDelete();
}

main().catch(console.error);
