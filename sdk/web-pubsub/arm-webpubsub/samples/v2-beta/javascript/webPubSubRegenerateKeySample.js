// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebPubSubManagementClient } = require("@azure/arm-webpubsub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to regenerate the access key for the resource. PrimaryKey and SecondaryKey cannot be regenerated at the same time.
 *
 * @summary regenerate the access key for the resource. PrimaryKey and SecondaryKey cannot be regenerated at the same time.
 * x-ms-original-file: 2025-08-01-preview/WebPubSub_RegenerateKey.json
 */
async function webPubSubRegenerateKey() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  const result = await client.webPubSub.regenerateKey("myResourceGroup", "myWebPubSubService", {
    keyType: "Primary",
  });
  console.log(result);
}

async function main() {
  await webPubSubRegenerateKey();
}

main().catch(console.error);
