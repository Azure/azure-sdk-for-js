// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the replica and its properties.
 *
 * @summary Get the replica and its properties.
 * x-ms-original-file: specification/webpubsub/resource-manager/Microsoft.SignalRService/stable/2024-03-01/examples/WebPubSubReplicas_Get.json
 */

import { WebPubSubManagementClient } from "@azure/arm-webpubsub";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function webPubSubReplicasGet(): Promise<void> {
  const subscriptionId =
    process.env["WEB-PUBSUB_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["WEB-PUBSUB_RESOURCE_GROUP"] || "myResourceGroup";
  const resourceName = "myWebPubSubService";
  const replicaName = "myWebPubSubService-eastus";
  const credential = new DefaultAzureCredential();
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  const result = await client.webPubSubReplicas.get(resourceGroupName, resourceName, replicaName);
  console.log(result);
}

async function main(): Promise<void> {
  await webPubSubReplicasGet();
}

main().catch(console.error);
