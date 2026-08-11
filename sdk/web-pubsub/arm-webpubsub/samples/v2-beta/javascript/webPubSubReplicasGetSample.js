// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebPubSubManagementClient } = require("@azure/arm-webpubsub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the replica and its properties.
 *
 * @summary get the replica and its properties.
 * x-ms-original-file: 2025-08-01-preview/WebPubSubReplicas_Get.json
 */
async function webPubSubReplicasGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  const result = await client.webPubSubReplicas.get(
    "myResourceGroup",
    "myWebPubSubService",
    "myWebPubSubService-eastus",
  );
  console.log(result);
}

async function main() {
  await webPubSubReplicasGet();
}

main().catch(console.error);
