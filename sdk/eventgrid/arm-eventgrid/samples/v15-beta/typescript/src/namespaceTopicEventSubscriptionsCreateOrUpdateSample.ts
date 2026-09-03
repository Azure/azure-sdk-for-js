// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to asynchronously creates or updates an event subscription of a namespace topic with the specified parameters. Existing event subscriptions will be updated with this API.
 *
 * @summary asynchronously creates or updates an event subscription of a namespace topic with the specified parameters. Existing event subscriptions will be updated with this API.
 * x-ms-original-file: 2025-07-15-preview/NamespaceTopicEventSubscriptions_CreateOrUpdate.json
 */
async function namespaceTopicEventSubscriptionsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.namespaceTopicEventSubscriptions.createOrUpdate(
    "examplerg",
    "examplenamespace2",
    "examplenamespacetopic2",
    "examplenamespacetopicEventSub2",
    {
      deliveryConfiguration: {
        deliveryMode: "Queue",
        queue: { eventTimeToLive: "P1D", maxDeliveryCount: 4, receiveLockDurationInSeconds: 60 },
      },
      eventDeliverySchema: "CloudEventSchemaV1_0",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await namespaceTopicEventSubscriptionsCreateOrUpdate();
}

main().catch(console.error);
