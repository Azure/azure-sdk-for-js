// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubManagementClient } from "@azure/arm-webpubsub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list private endpoint connections
 *
 * @summary list private endpoint connections
 * x-ms-original-file: 2025-08-01-preview/WebPubSubPrivateEndpointConnections_List.json
 */
async function webPubSubPrivateEndpointConnectionsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.webPubSubPrivateEndpointConnections.list(
    "myResourceGroup",
    "myWebPubSubService",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await webPubSubPrivateEndpointConnectionsList();
}

main().catch(console.error);
