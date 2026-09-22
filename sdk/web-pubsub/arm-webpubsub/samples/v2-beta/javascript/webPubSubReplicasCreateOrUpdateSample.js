// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebPubSubManagementClient } = require("@azure/arm-webpubsub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a replica.
 *
 * @summary create or update a replica.
 * x-ms-original-file: 2025-08-01-preview/WebPubSubReplicas_CreateOrUpdate.json
 */
async function webPubSubReplicasCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  const result = await client.webPubSubReplicas.createOrUpdate(
    "myResourceGroup",
    "myWebPubSubService",
    "myWebPubSubService-eastus",
    {
      location: "eastus",
      resourceStopped: "false",
      sku: { name: "Premium_P1", capacity: 1, tier: "Premium" },
      tags: { key1: "value1" },
    },
  );
  console.log(result);
}

async function main() {
  await webPubSubReplicasCreateOrUpdate();
}

main().catch(console.error);
