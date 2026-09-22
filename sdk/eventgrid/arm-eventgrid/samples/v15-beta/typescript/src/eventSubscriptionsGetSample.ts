// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get properties of an event subscription.
 *
 * @summary get properties of an event subscription.
 * x-ms-original-file: 2025-07-15-preview/EventSubscriptions_GetForCustomTopic.json
 */
async function eventSubscriptionsGetForCustomTopic(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const result = await client.eventSubscriptions.get(
    "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic2",
    "examplesubscription1",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get properties of an event subscription.
 *
 * @summary get properties of an event subscription.
 * x-ms-original-file: 2025-07-15-preview/EventSubscriptions_GetForCustomTopic_AzureFunctionDestination.json
 */
async function eventSubscriptionsGetForCustomTopicAzureFunctionDestination(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const result = await client.eventSubscriptions.get(
    "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic2",
    "examplesubscription1",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get properties of an event subscription.
 *
 * @summary get properties of an event subscription.
 * x-ms-original-file: 2025-07-15-preview/EventSubscriptions_GetForCustomTopic_EventHubDestination.json
 */
async function eventSubscriptionsGetForCustomTopicEventHubDestination(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const result = await client.eventSubscriptions.get(
    "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic2",
    "examplesubscription1",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get properties of an event subscription.
 *
 * @summary get properties of an event subscription.
 * x-ms-original-file: 2025-07-15-preview/EventSubscriptions_GetForCustomTopic_HybridConnectionDestination.json
 */
async function eventSubscriptionsGetForCustomTopicHybridConnectionDestination(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const result = await client.eventSubscriptions.get(
    "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic2",
    "examplesubscription1",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get properties of an event subscription.
 *
 * @summary get properties of an event subscription.
 * x-ms-original-file: 2025-07-15-preview/EventSubscriptions_GetForCustomTopic_ServiceBusQueueDestination.json
 */
async function eventSubscriptionsGetForCustomTopicServiceBusQueueDestination(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const result = await client.eventSubscriptions.get(
    "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic2",
    "examplesubscription1",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get properties of an event subscription.
 *
 * @summary get properties of an event subscription.
 * x-ms-original-file: 2025-07-15-preview/EventSubscriptions_GetForCustomTopic_ServiceBusTopicDestination.json
 */
async function eventSubscriptionsGetForCustomTopicServiceBusTopicDestination(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const result = await client.eventSubscriptions.get(
    "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic2",
    "examplesubscription1",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get properties of an event subscription.
 *
 * @summary get properties of an event subscription.
 * x-ms-original-file: 2025-07-15-preview/EventSubscriptions_GetForCustomTopic_StorageQueueDestination.json
 */
async function eventSubscriptionsGetForCustomTopicStorageQueueDestination(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const result = await client.eventSubscriptions.get(
    "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic2",
    "examplesubscription1",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get properties of an event subscription.
 *
 * @summary get properties of an event subscription.
 * x-ms-original-file: 2025-07-15-preview/EventSubscriptions_GetForCustomTopic_WebhookDestination.json
 */
async function eventSubscriptionsGetForCustomTopicWebhookDestination(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const result = await client.eventSubscriptions.get(
    "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic2",
    "examplesubscription1",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get properties of an event subscription.
 *
 * @summary get properties of an event subscription.
 * x-ms-original-file: 2025-07-15-preview/EventSubscriptions_GetForResource.json
 */
async function eventSubscriptionsGetForResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const result = await client.eventSubscriptions.get(
    "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventHub/namespaces/examplenamespace1",
    "examplesubscription1",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get properties of an event subscription.
 *
 * @summary get properties of an event subscription.
 * x-ms-original-file: 2025-07-15-preview/EventSubscriptions_GetForResourceGroup.json
 */
async function eventSubscriptionsGetForResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const result = await client.eventSubscriptions.get(
    "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg",
    "examplesubscription2",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get properties of an event subscription.
 *
 * @summary get properties of an event subscription.
 * x-ms-original-file: 2025-07-15-preview/EventSubscriptions_GetForSubscription.json
 */
async function eventSubscriptionsGetForSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const result = await client.eventSubscriptions.get(
    "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40",
    "examplesubscription3",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await eventSubscriptionsGetForCustomTopic();
  await eventSubscriptionsGetForCustomTopicAzureFunctionDestination();
  await eventSubscriptionsGetForCustomTopicEventHubDestination();
  await eventSubscriptionsGetForCustomTopicHybridConnectionDestination();
  await eventSubscriptionsGetForCustomTopicServiceBusQueueDestination();
  await eventSubscriptionsGetForCustomTopicServiceBusTopicDestination();
  await eventSubscriptionsGetForCustomTopicStorageQueueDestination();
  await eventSubscriptionsGetForCustomTopicWebhookDestination();
  await eventSubscriptionsGetForResource();
  await eventSubscriptionsGetForResourceGroup();
  await eventSubscriptionsGetForSubscription();
}

main().catch(console.error);
