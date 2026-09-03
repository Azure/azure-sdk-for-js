// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update an existing event subscription of a namespace topic.
 *
 * @summary update an existing event subscription of a namespace topic.
 * x-ms-original-file: 2025-07-15-preview/NamespaceTopicEventSubscriptions_Update.json
 */
async function namespaceTopicEventSubscriptionsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.namespaceTopicEventSubscriptions.update(
    "examplerg",
    "exampleNamespaceName1",
    "exampleNamespaceTopicName1",
    "exampleNamespaceTopicEventSubscriptionName1",
    {
      deliveryConfiguration: {
        deliveryMode: "Queue",
        queue: { eventTimeToLive: "P1D", maxDeliveryCount: 3, receiveLockDurationInSeconds: 60 },
      },
      eventDeliverySchema: "CloudEventSchemaV1_0",
    },
  );
  console.log(result);
}

async function main() {
  await namespaceTopicEventSubscriptionsUpdate();
}

main().catch(console.error);
