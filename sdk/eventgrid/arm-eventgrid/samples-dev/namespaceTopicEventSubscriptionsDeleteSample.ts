// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete an existing event subscription of a namespace topic.
 *
 * @summary delete an existing event subscription of a namespace topic.
 * x-ms-original-file: 2025-07-15-preview/NamespaceTopicEventSubscriptions_Delete.json
 */
async function namespaceTopicEventSubscriptionsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  await client.namespaceTopicEventSubscriptions.delete(
    "examplerg",
    "examplenamespace2",
    "examplenamespacetopic2",
    "examplenamespacetopicEventSub2",
  );
}

async function main(): Promise<void> {
  await namespaceTopicEventSubscriptionsDelete();
}

main().catch(console.error);
