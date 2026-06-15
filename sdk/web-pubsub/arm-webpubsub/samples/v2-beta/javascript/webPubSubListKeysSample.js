// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebPubSubManagementClient } = require("@azure/arm-webpubsub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the access keys of the resource.
 *
 * @summary get the access keys of the resource.
 * x-ms-original-file: 2025-08-01-preview/WebPubSub_ListKeys.json
 */
async function webPubSubListKeys() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  const result = await client.webPubSub.listKeys("myResourceGroup", "myWebPubSubService");
  console.log(result);
}

async function main() {
  await webPubSubListKeys();
}

main().catch(console.error);
