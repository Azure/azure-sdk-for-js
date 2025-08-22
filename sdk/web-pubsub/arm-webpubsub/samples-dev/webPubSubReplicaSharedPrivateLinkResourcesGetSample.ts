// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the specified shared private link resource
 *
 * @summary Get the specified shared private link resource
 * x-ms-original-file: specification/webpubsub/resource-manager/Microsoft.SignalRService/stable/2024-03-01/examples/WebPubSubReplicaSharedPrivateLinkResources_Get.json
 */

import { WebPubSubManagementClient } from "@azure/arm-webpubsub";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function webPubSubReplicaSharedPrivateLinkResourcesGet(): Promise<void> {
  const subscriptionId =
    process.env["WEB-PUBSUB_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["WEB-PUBSUB_RESOURCE_GROUP"] || "myResourceGroup";
  const resourceName = "myWebPubSubService";
  const replicaName = "myWebPubSubService-eastus";
  const sharedPrivateLinkResourceName = "upstream";
  const credential = new DefaultAzureCredential();
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  const result = await client.webPubSubReplicaSharedPrivateLinkResources.get(
    resourceGroupName,
    resourceName,
    replicaName,
    sharedPrivateLinkResourceName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await webPubSubReplicaSharedPrivateLinkResourcesGet();
}

main().catch(console.error);
