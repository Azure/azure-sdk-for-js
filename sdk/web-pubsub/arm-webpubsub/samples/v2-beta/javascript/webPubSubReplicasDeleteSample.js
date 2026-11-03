// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebPubSubManagementClient } = require("@azure/arm-webpubsub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to operation to delete a replica.
 *
 * @summary operation to delete a replica.
 * x-ms-original-file: 2025-08-01-preview/WebPubSubReplicas_Delete.json
 */
async function webPubSubReplicasDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  await client.webPubSubReplicas.delete(
    "myResourceGroup",
    "myWebPubSubService",
    "myWebPubSubService-eastus",
  );
}

async function main() {
  await webPubSubReplicasDelete();
}

main().catch(console.error);
