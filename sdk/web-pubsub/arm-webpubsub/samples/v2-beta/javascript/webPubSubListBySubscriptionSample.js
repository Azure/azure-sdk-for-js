// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebPubSubManagementClient } = require("@azure/arm-webpubsub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to handles requests to list all resources in a subscription.
 *
 * @summary handles requests to list all resources in a subscription.
 * x-ms-original-file: 2025-08-01-preview/WebPubSub_ListBySubscription.json
 */
async function webPubSubListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.webPubSub.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await webPubSubListBySubscription();
}

main().catch(console.error);
