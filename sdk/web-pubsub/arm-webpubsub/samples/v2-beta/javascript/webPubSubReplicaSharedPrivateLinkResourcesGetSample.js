// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebPubSubManagementClient } = require("@azure/arm-webpubsub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the specified shared private link resource
 *
 * @summary get the specified shared private link resource
 * x-ms-original-file: 2025-08-01-preview/WebPubSubReplicaSharedPrivateLinkResources_Get.json
 */
async function webPubSubReplicaSharedPrivateLinkResourcesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  const result = await client.webPubSubReplicaSharedPrivateLinkResources.get(
    "myResourceGroup",
    "myWebPubSubService",
    "myWebPubSubService-eastus",
    "upstream",
  );
  console.log(result);
}

async function main() {
  await webPubSubReplicaSharedPrivateLinkResourcesGet();
}

main().catch(console.error);
