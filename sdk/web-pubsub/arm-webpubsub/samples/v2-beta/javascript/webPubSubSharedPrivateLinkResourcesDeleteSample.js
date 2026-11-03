// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebPubSubManagementClient } = require("@azure/arm-webpubsub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the specified shared private link resource
 *
 * @summary delete the specified shared private link resource
 * x-ms-original-file: 2025-08-01-preview/WebPubSubSharedPrivateLinkResources_Delete.json
 */
async function webPubSubSharedPrivateLinkResourcesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  await client.webPubSubSharedPrivateLinkResources.delete(
    "upstream",
    "myResourceGroup",
    "myWebPubSubService",
  );
}

async function main() {
  await webPubSubSharedPrivateLinkResourcesDelete();
}

main().catch(console.error);
