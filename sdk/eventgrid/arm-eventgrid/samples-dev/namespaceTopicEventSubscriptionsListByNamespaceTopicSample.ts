// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list event subscriptions that belong to a specific namespace topic.
 *
 * @summary list event subscriptions that belong to a specific namespace topic.
 * x-ms-original-file: 2025-07-15-preview/NamespaceTopicEventSubscriptions_ListByNamespaceTopic.json
 */
async function namespaceTopicEventSubscriptionsListByNamespaceTopic(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.namespaceTopicEventSubscriptions.listByNamespaceTopic(
    "examplerg",
    "examplenamespace2",
    "examplenamespacetopic2",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await namespaceTopicEventSubscriptionsListByNamespaceTopic();
}

main().catch(console.error);
