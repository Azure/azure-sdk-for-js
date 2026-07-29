// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebPubSubManagementClient } = require("@azure/arm-webpubsub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the specified private endpoint connection
 *
 * @summary delete the specified private endpoint connection
 * x-ms-original-file: 2025-08-01-preview/WebPubSubPrivateEndpointConnections_Delete.json
 */
async function webPubSubPrivateEndpointConnectionsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  await client.webPubSubPrivateEndpointConnections.delete(
    "mywebpubsubservice.1fa229cd-bf3f-47f0-8c49-afb36723997e",
    "myResourceGroup",
    "myWebPubSubService",
  );
}

async function main() {
  await webPubSubPrivateEndpointConnectionsDelete();
}

main().catch(console.error);
