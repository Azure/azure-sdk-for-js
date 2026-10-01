// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubManagementClient } from "@azure/arm-webpubsub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a shared private link resource
 *
 * @summary create or update a shared private link resource
 * x-ms-original-file: 2025-08-01-preview/WebPubSubReplicaSharedPrivateLinkResources_CreateOrUpdate.json
 */
async function webPubSubReplicaSharedPrivateLinkResourcesCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  const result = await client.webPubSubReplicaSharedPrivateLinkResources.createOrUpdate(
    "myResourceGroup",
    "myWebPubSubService",
    "myWebPubSubService-eastus",
    "upstream",
    {
      groupId: "sites",
      privateLinkResourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/myResourceGroup/providers/Microsoft.Web/sites/myWebApp",
      requestMessage: "Please approve",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await webPubSubReplicaSharedPrivateLinkResourcesCreateOrUpdate();
}

main().catch(console.error);
