// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebPubSubManagementClient } = require("@azure/arm-webpubsub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a persistent storage.
 *
 * @summary get a persistent storage.
 * x-ms-original-file: 2025-12-01-preview/WebPubSubPersistentStorages_Get.json
 */
async function webPubSubPersistentStoragesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  const result = await client.webPubSubPersistentStorages.get(
    "myResourceGroup",
    "myWebPubSubService",
    "example",
  );
  console.log(result);
}

async function main() {
  await webPubSubPersistentStoragesGet();
}

main().catch(console.error);
