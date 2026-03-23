// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the full endpoint URL for an event subscription.
 *
 * @summary get the full endpoint URL for an event subscription.
 * x-ms-original-file: 2025-07-15-preview/EventSubscriptions_GetFullUrlForCustomTopic.json
 */
async function eventSubscriptionsGetFullUrlForCustomTopic() {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const result = await client.eventSubscriptions.getFullUrl(
    "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic2",
    "examplesubscription1",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get the full endpoint URL for an event subscription.
 *
 * @summary get the full endpoint URL for an event subscription.
 * x-ms-original-file: 2025-07-15-preview/EventSubscriptions_GetFullUrlForResource.json
 */
async function eventSubscriptionsGetFullUrlForResource() {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const result = await client.eventSubscriptions.getFullUrl(
    "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventHub/namespaces/examplenamespace1",
    "examplesubscription1",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get the full endpoint URL for an event subscription.
 *
 * @summary get the full endpoint URL for an event subscription.
 * x-ms-original-file: 2025-07-15-preview/EventSubscriptions_GetFullUrlForResourceGroup.json
 */
async function eventSubscriptionsGetFullUrlForResourceGroup() {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const result = await client.eventSubscriptions.getFullUrl(
    "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg",
    "examplesubscription2",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get the full endpoint URL for an event subscription.
 *
 * @summary get the full endpoint URL for an event subscription.
 * x-ms-original-file: 2025-07-15-preview/EventSubscriptions_GetFullUrlForSubscription.json
 */
async function eventSubscriptionsGetFullUrlForSubscription() {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const result = await client.eventSubscriptions.getFullUrl(
    "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40",
    "examplesubscription3",
  );
  console.log(result);
}

async function main() {
  await eventSubscriptionsGetFullUrlForCustomTopic();
  await eventSubscriptionsGetFullUrlForResource();
  await eventSubscriptionsGetFullUrlForResourceGroup();
  await eventSubscriptionsGetFullUrlForSubscription();
}

main().catch(console.error);
