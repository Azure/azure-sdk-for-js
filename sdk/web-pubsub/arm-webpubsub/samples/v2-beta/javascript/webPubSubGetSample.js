// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebPubSubManagementClient } = require("@azure/arm-webpubsub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the resource and its properties.
 *
 * @summary get the resource and its properties.
 * x-ms-original-file: 2025-08-01-preview/WebPubSub_Get.json
 */
async function webPubSubGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  const result = await client.webPubSub.get("myResourceGroup", "myWebPubSubService");
  console.log(result);
}

async function main() {
  await webPubSubGet();
}

main().catch(console.error);
