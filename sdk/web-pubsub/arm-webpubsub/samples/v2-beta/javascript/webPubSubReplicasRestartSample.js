// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebPubSubManagementClient } = require("@azure/arm-webpubsub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to operation to restart a replica.
 *
 * @summary operation to restart a replica.
 * x-ms-original-file: 2025-08-01-preview/WebPubSubReplicas_Restart.json
 */
async function webPubSubReplicasRestart() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  await client.webPubSubReplicas.restart(
    "myResourceGroup",
    "myWebPubSubService",
    "myWebPubSubService-eastus",
  );
}

async function main() {
  await webPubSubReplicasRestart();
}

main().catch(console.error);
