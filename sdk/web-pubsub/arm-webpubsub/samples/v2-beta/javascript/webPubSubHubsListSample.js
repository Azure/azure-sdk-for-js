// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebPubSubManagementClient } = require("@azure/arm-webpubsub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list hub settings.
 *
 * @summary list hub settings.
 * x-ms-original-file: 2025-08-01-preview/WebPubSubHubs_List.json
 */
async function webPubSubHubsList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.webPubSubHubs.list("myResourceGroup", "myWebPubSubService")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await webPubSubHubsList();
}

main().catch(console.error);
