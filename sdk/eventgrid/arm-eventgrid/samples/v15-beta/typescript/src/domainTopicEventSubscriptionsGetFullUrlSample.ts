// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the full endpoint URL for a nested event subscription for domain topic.
 *
 * @summary get the full endpoint URL for a nested event subscription for domain topic.
 * x-ms-original-file: 2025-07-15-preview/DomainTopicEventSubscriptions_GetFullUrl.json
 */
async function domainTopicEventSubscriptionsGetFullUrl(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.domainTopicEventSubscriptions.getFullUrl(
    "examplerg",
    "exampleDomain1",
    "exampleDomainTopic1",
    "examplesubscription1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await domainTopicEventSubscriptionsGetFullUrl();
}

main().catch(console.error);
