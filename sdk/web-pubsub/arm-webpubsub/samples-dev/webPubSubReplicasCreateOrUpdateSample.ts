// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Replica } from "@azure/arm-webpubsub";
import { WebPubSubManagementClient } from "@azure/arm-webpubsub";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create or update a replica.
 *
 * @summary Create or update a replica.
 * x-ms-original-file: specification/webpubsub/resource-manager/Microsoft.SignalRService/stable/2024-03-01/examples/WebPubSubReplicas_CreateOrUpdate.json
 */
async function webPubSubReplicasCreateOrUpdate(): Promise<void> {
  const subscriptionId =
    process.env["WEB-PUBSUB_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["WEB-PUBSUB_RESOURCE_GROUP"] || "myResourceGroup";
  const resourceName = "myWebPubSubService";
  const replicaName = "myWebPubSubService-eastus";
  const parameters: Replica = {
    location: "eastus",
    resourceStopped: "false",
    sku: { name: "Premium_P1", capacity: 1, tier: "Premium" },
    tags: { key1: "value1" },
  };
  const credential = new DefaultAzureCredential();
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  const result = await client.webPubSubReplicas.beginCreateOrUpdateAndWait(
    resourceGroupName,
    resourceName,
    replicaName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await webPubSubReplicasCreateOrUpdate();
}

main().catch(console.error);
