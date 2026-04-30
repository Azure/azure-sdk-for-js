// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list event subscriptions that belong to a specific partner topic.
 *
 * @summary list event subscriptions that belong to a specific partner topic.
 * x-ms-original-file: 2025-07-15-preview/PartnerTopicEventSubscriptions_ListByPartnerTopic.json
 */
async function partnerTopicEventSubscriptionsListByPartnerTopic(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.partnerTopicEventSubscriptions.listByPartnerTopic(
    "examplerg",
    "examplePartnerTopic1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await partnerTopicEventSubscriptionsListByPartnerTopic();
}

main().catch(console.error);
