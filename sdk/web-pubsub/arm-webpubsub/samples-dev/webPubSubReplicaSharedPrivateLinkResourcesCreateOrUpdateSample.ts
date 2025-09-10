// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create or update a shared private link resource
 *
 * @summary Create or update a shared private link resource
 * x-ms-original-file: specification/webpubsub/resource-manager/Microsoft.SignalRService/stable/2024-03-01/examples/WebPubSubReplicaSharedPrivateLinkResources_CreateOrUpdate.json
 */

import type { SharedPrivateLinkResource } from "@azure/arm-webpubsub";
import { WebPubSubManagementClient } from "@azure/arm-webpubsub";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function webPubSubReplicaSharedPrivateLinkResourcesCreateOrUpdate(): Promise<void> {
  const subscriptionId =
    process.env["WEB-PUBSUB_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["WEB-PUBSUB_RESOURCE_GROUP"] || "myResourceGroup";
  const resourceName = "myWebPubSubService";
  const replicaName = "myWebPubSubService-eastus";
  const sharedPrivateLinkResourceName = "upstream";
  const parameters: SharedPrivateLinkResource = {
    groupId: "sites",
    privateLinkResourceId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/myResourceGroup/providers/Microsoft.Web/sites/myWebApp",
    requestMessage: "Please approve",
  };
  const credential = new DefaultAzureCredential();
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  const result = await client.webPubSubReplicaSharedPrivateLinkResources.beginCreateOrUpdateAndWait(
    resourceGroupName,
    resourceName,
    replicaName,
    sharedPrivateLinkResourceName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await webPubSubReplicaSharedPrivateLinkResourcesCreateOrUpdate();
}

main().catch(console.error);
