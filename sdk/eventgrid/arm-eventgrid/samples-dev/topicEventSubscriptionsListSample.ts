// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all event subscriptions that have been created for a specific topic.
 *
 * @summary list all event subscriptions that have been created for a specific topic.
 * x-ms-original-file: 2025-07-15-preview/TopicEventSubscriptions_List.json
 */
async function topicEventSubscriptionsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.topicEventSubscriptions.list("examplerg", "exampleTopic1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await topicEventSubscriptionsList();
}

main().catch(console.error);
