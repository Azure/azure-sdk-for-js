// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the full endpoint URL for an event subscription for topic.
 *
 * @summary get the full endpoint URL for an event subscription for topic.
 * x-ms-original-file: 2025-07-15-preview/TopicEventSubscriptions_GetFullUrl.json
 */
async function topicEventSubscriptionsGetFullUrl() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.topicEventSubscriptions.getFullUrl(
    "examplerg",
    "exampleTopic1",
    "examplesubscription1",
  );
  console.log(result);
}

async function main() {
  await topicEventSubscriptionsGetFullUrl();
}

main().catch(console.error);
