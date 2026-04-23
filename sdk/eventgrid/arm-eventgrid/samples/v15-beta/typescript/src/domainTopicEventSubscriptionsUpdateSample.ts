// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update an existing event subscription for a domain topic.
 *
 * @summary update an existing event subscription for a domain topic.
 * x-ms-original-file: 2025-07-15-preview/DomainTopicEventSubscriptions_Update.json
 */
async function domainTopicEventSubscriptionsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.domainTopicEventSubscriptions.update(
    "examplerg",
    "exampleDomain1",
    "exampleDomainTopic1",
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
  await domainTopicEventSubscriptionsUpdate();
}

main().catch(console.error);
