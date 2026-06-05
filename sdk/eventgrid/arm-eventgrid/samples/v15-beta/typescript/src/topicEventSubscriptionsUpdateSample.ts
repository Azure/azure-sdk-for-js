// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update an existing event subscription for a topic.
 *
 * @summary update an existing event subscription for a topic.
 * x-ms-original-file: 2025-07-15-preview/TopicEventSubscriptions_Update.json
 */
async function topicEventSubscriptionsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.topicEventSubscriptions.update(
    "examplerg",
    "exampleTopic1",
    "exampleEventSubscriptionName1",
    {
      destination: { endpointType: "WebHook", endpointUrl: "https://requestb.in/15ksip71" },
      filter: {
        isSubjectCaseSensitive: true,
        subjectBeginsWith: "existingPrefix",
        subjectEndsWith: "newSuffix",
      },
      labels: ["label1", "label2"],
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await topicEventSubscriptionsUpdate();
}

main().catch(console.error);
