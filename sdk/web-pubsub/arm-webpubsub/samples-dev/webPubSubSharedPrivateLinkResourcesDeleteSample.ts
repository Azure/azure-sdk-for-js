// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete the specified shared private link resource
 *
 * @summary Delete the specified shared private link resource
 * x-ms-original-file: specification/webpubsub/resource-manager/Microsoft.SignalRService/stable/2024-03-01/examples/WebPubSubSharedPrivateLinkResources_Delete.json
 */

import { WebPubSubManagementClient } from "@azure/arm-webpubsub";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function webPubSubSharedPrivateLinkResourcesDelete(): Promise<void> {
  const subscriptionId =
    process.env["WEB-PUBSUB_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const sharedPrivateLinkResourceName = "upstream";
  const resourceGroupName = process.env["WEB-PUBSUB_RESOURCE_GROUP"] || "myResourceGroup";
  const resourceName = "myWebPubSubService";
  const credential = new DefaultAzureCredential();
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  const result = await client.webPubSubSharedPrivateLinkResources.beginDeleteAndWait(
    sharedPrivateLinkResourceName,
    resourceGroupName,
    resourceName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await webPubSubSharedPrivateLinkResourcesDelete();
}

main().catch(console.error);
