// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebPubSubManagementClient } = require("@azure/arm-webpubsub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the specified shared private link resource
 *
 * @summary get the specified shared private link resource
 * x-ms-original-file: 2025-08-01-preview/WebPubSubSharedPrivateLinkResources_Get.json
 */
async function webPubSubSharedPrivateLinkResourcesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  const result = await client.webPubSubSharedPrivateLinkResources.get(
    "upstream",
    "myResourceGroup",
    "myWebPubSubService",
  );
  console.log(result);
}

async function main() {
  await webPubSubSharedPrivateLinkResourcesGet();
}

main().catch(console.error);
