// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebPubSubManagementClient } = require("@azure/arm-webpubsub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a hub setting.
 *
 * @summary delete a hub setting.
 * x-ms-original-file: 2025-08-01-preview/WebPubSubHubs_Delete.json
 */
async function webPubSubHubsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  await client.webPubSubHubs.delete("exampleHub", "myResourceGroup", "myWebPubSubService");
}

async function main() {
  await webPubSubHubsDelete();
}

main().catch(console.error);
