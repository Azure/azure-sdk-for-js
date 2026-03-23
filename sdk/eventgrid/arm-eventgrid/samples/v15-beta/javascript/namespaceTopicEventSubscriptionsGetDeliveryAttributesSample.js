// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get all delivery attributes for an event subscription of a namespace topic.
 *
 * @summary get all delivery attributes for an event subscription of a namespace topic.
 * x-ms-original-file: 2025-07-15-preview/NamespaceTopicEventSubscriptions_GetDeliveryAttributes.json
 */
async function namespaceTopicEventSubscriptionsGetDeliveryAttributes() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.namespaceTopicEventSubscriptions.getDeliveryAttributes(
    "examplerg",
    "exampleNamespace",
    "exampleNamespaceTopic",
    "exampleEventSubscriptionName",
  );
  console.log(result);
}

async function main() {
  await namespaceTopicEventSubscriptionsGetDeliveryAttributes();
}

main().catch(console.error);
