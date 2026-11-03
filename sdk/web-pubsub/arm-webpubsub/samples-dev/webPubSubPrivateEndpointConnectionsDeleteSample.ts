// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubManagementClient } from "@azure/arm-webpubsub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete the specified private endpoint connection
 *
 * @summary delete the specified private endpoint connection
 * x-ms-original-file: 2025-08-01-preview/WebPubSubPrivateEndpointConnections_Delete.json
 */
async function webPubSubPrivateEndpointConnectionsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  await client.webPubSubPrivateEndpointConnections.delete(
    "mywebpubsubservice.1fa229cd-bf3f-47f0-8c49-afb36723997e",
    "myResourceGroup",
    "myWebPubSubService",
  );
}

async function main(): Promise<void> {
  await webPubSubPrivateEndpointConnectionsDelete();
}

main().catch(console.error);
