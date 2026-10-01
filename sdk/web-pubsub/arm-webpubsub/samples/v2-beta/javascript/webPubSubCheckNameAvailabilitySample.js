// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebPubSubManagementClient } = require("@azure/arm-webpubsub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to checks that the resource name is valid and is not already in use.
 *
 * @summary checks that the resource name is valid and is not already in use.
 * x-ms-original-file: 2025-08-01-preview/WebPubSub_CheckNameAvailability.json
 */
async function webPubSubCheckNameAvailability() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  const result = await client.webPubSub.checkNameAvailability("eastus", {
    name: "myWebPubSubService",
    type: "Microsoft.SignalRService/WebPubSub",
  });
  console.log(result);
}

async function main() {
  await webPubSubCheckNameAvailability();
}

main().catch(console.error);
