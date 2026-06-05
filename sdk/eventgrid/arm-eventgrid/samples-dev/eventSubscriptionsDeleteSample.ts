// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete an existing event subscription.
 *
 * @summary delete an existing event subscription.
 * x-ms-original-file: 2025-07-15-preview/EventSubscriptions_DeleteForCustomTopic.json
 */
async function eventSubscriptionsDeleteForCustomTopic(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  await client.eventSubscriptions.delete(
    "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic1",
    "examplesubscription1",
  );
}

/**
 * This sample demonstrates how to delete an existing event subscription.
 *
 * @summary delete an existing event subscription.
 * x-ms-original-file: 2025-07-15-preview/EventSubscriptions_DeleteForResource.json
 */
async function eventSubscriptionsDeleteForResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  await client.eventSubscriptions.delete(
    "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventHub/namespaces/examplenamespace1",
    "examplesubscription10",
  );
}

/**
 * This sample demonstrates how to delete an existing event subscription.
 *
 * @summary delete an existing event subscription.
 * x-ms-original-file: 2025-07-15-preview/EventSubscriptions_DeleteForResourceGroup.json
 */
async function eventSubscriptionsDeleteForResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  await client.eventSubscriptions.delete(
    "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg",
    "examplesubscription2",
  );
}

/**
 * This sample demonstrates how to delete an existing event subscription.
 *
 * @summary delete an existing event subscription.
 * x-ms-original-file: 2025-07-15-preview/EventSubscriptions_DeleteForSubscription.json
 */
async function eventSubscriptionsDeleteForSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  await client.eventSubscriptions.delete(
    "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40",
    "examplesubscription3",
  );
}

async function main(): Promise<void> {
  await eventSubscriptionsDeleteForCustomTopic();
  await eventSubscriptionsDeleteForResource();
  await eventSubscriptionsDeleteForResourceGroup();
  await eventSubscriptionsDeleteForSubscription();
}

main().catch(console.error);
