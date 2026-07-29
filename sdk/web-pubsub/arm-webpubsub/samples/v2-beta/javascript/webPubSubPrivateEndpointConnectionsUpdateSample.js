// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebPubSubManagementClient } = require("@azure/arm-webpubsub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update the state of specified private endpoint connection
 *
 * @summary update the state of specified private endpoint connection
 * x-ms-original-file: 2025-08-01-preview/WebPubSubPrivateEndpointConnections_Update.json
 */
async function webPubSubPrivateEndpointConnectionsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  const result = await client.webPubSubPrivateEndpointConnections.update(
    "mywebpubsubservice.1fa229cd-bf3f-47f0-8c49-afb36723997e",
    "myResourceGroup",
    "myWebPubSubService",
    {
      privateEndpoint: {},
      privateLinkServiceConnectionState: { actionsRequired: "None", status: "Approved" },
    },
  );
  console.log(result);
}

async function main() {
  await webPubSubPrivateEndpointConnectionsUpdate();
}

main().catch(console.error);
