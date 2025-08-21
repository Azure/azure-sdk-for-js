// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the specified private endpoint connection
 *
 * @summary Get the specified private endpoint connection
 * x-ms-original-file: specification/webpubsub/resource-manager/Microsoft.SignalRService/stable/2024-03-01/examples/WebPubSubPrivateEndpointConnections_Get.json
 */

import { WebPubSubManagementClient } from "@azure/arm-webpubsub";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function webPubSubPrivateEndpointConnectionsGet(): Promise<void> {
  const subscriptionId =
    process.env["WEB-PUBSUB_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const privateEndpointConnectionName = "mywebpubsubservice.1fa229cd-bf3f-47f0-8c49-afb36723997e";
  const resourceGroupName = process.env["WEB-PUBSUB_RESOURCE_GROUP"] || "myResourceGroup";
  const resourceName = "myWebPubSubService";
  const credential = new DefaultAzureCredential();
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  const result = await client.webPubSubPrivateEndpointConnections.get(
    privateEndpointConnectionName,
    resourceGroupName,
    resourceName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await webPubSubPrivateEndpointConnectionsGet();
}

main().catch(console.error);
