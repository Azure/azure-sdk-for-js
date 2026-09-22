// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get properties of an event subscription of a topic.
 *
 * @summary get properties of an event subscription of a topic.
 * x-ms-original-file: 2025-07-15-preview/TopicEventSubscriptions_Get.json
 */
async function topicEventSubscriptionsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.topicEventSubscriptions.get(
    "examplerg",
    "exampleTopic1",
    "examplesubscription1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await topicEventSubscriptionsGet();
}

main().catch(console.error);
