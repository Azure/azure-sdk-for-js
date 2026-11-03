// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebPubSubManagementClient } = require("@azure/arm-webpubsub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all available skus of the resource.
 *
 * @summary list all available skus of the resource.
 * x-ms-original-file: 2025-08-01-preview/WebPubSub_ListSkus.json
 */
async function webPubSubListSkus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  const result = await client.webPubSub.listSkus("myResourceGroup", "myWebPubSubService");
  console.log(result);
}

async function main() {
  await webPubSubListSkus();
}

main().catch(console.error);
