// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to asynchronously updates an existing event subscription.
 *
 * @summary asynchronously updates an existing event subscription.
 * x-ms-original-file: 2025-07-15-preview/EventSubscriptions_UpdateForCustomTopic.json
 */
async function eventSubscriptionsUpdateForCustomTopic(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const result = await client.eventSubscriptions.update(
    "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic2",
    "examplesubscription1",
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

/**
 * This sample demonstrates how to asynchronously updates an existing event subscription.
 *
 * @summary asynchronously updates an existing event subscription.
 * x-ms-original-file: 2025-07-15-preview/EventSubscriptions_UpdateForCustomTopic_AzureFunctionDestination.json
 */
async function eventSubscriptionsUpdateForCustomTopicAzureFunctionDestination(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const result = await client.eventSubscriptions.update(
    "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic1",
    "examplesubscription1",
    {
      deadLetterDestination: {
        endpointType: "StorageBlob",
        blobContainerName: "contosocontainer",
        resourceId:
          "/subscriptions/55f3dcd4-cac7-43b4-990b-a139d62a1eb2/resourceGroups/TestRG/providers/Microsoft.Storage/storageAccounts/contosostg",
      },
      destination: {
        endpointType: "AzureFunction",
        resourceId:
          "/subscriptions/55f3dcd4-cac7-43b4-990b-a139d62a1eb2/resourceGroups/TestRG/providers/Microsoft.Web/sites/ContosoSite/funtions/ContosoFunc",
      },
      filter: {
        isSubjectCaseSensitive: false,
        subjectBeginsWith: "ExamplePrefix",
        subjectEndsWith: "ExampleSuffix",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to asynchronously updates an existing event subscription.
 *
 * @summary asynchronously updates an existing event subscription.
 * x-ms-original-file: 2025-07-15-preview/EventSubscriptions_UpdateForCustomTopic_EventHubDestination.json
 */
async function eventSubscriptionsUpdateForCustomTopicEventHubDestination(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const result = await client.eventSubscriptions.update(
    "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic2",
    "examplesubscription1",
    {
      destination: {
        endpointType: "EventHub",
        resourceId:
          "/subscriptions/55f3dcd4-cac7-43b4-990b-a139d62a1eb2/resourceGroups/TestRG/providers/Microsoft.EventHub/namespaces/ContosoNamespace/eventhubs/EH1",
      },
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

/**
 * This sample demonstrates how to asynchronously updates an existing event subscription.
 *
 * @summary asynchronously updates an existing event subscription.
 * x-ms-original-file: 2025-07-15-preview/EventSubscriptions_UpdateForCustomTopic_HybridConnectionDestination.json
 */
async function eventSubscriptionsUpdateForCustomTopicHybridConnectionDestination(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const result = await client.eventSubscriptions.update(
    "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic2",
    "examplesubscription1",
    {
      destination: {
        endpointType: "HybridConnection",
        resourceId:
          "/subscriptions/d33c5f7a-02ea-40f4-bf52-07f17e84d6a8/resourceGroups/TestRG/providers/Microsoft.Relay/namespaces/ContosoNamespace/hybridConnections/HC1",
      },
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

/**
 * This sample demonstrates how to asynchronously updates an existing event subscription.
 *
 * @summary asynchronously updates an existing event subscription.
 * x-ms-original-file: 2025-07-15-preview/EventSubscriptions_UpdateForCustomTopic_ServiceBusQueueDestination.json
 */
async function eventSubscriptionsUpdateForCustomTopicServiceBusQueueDestination(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const result = await client.eventSubscriptions.update(
    "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic1",
    "examplesubscription1",
    {
      deadLetterDestination: {
        endpointType: "StorageBlob",
        blobContainerName: "contosocontainer",
        resourceId:
          "/subscriptions/55f3dcd4-cac7-43b4-990b-a139d62a1eb2/resourceGroups/TestRG/providers/Microsoft.Storage/storageAccounts/contosostg",
      },
      destination: {
        endpointType: "ServiceBusQueue",
        resourceId:
          "/subscriptions/55f3dcd4-cac7-43b4-990b-a139d62a1eb2/resourceGroups/TestRG/providers/Microsoft.ServiceBus/namespaces/ContosoNamespace/queues/SBQ",
      },
      filter: {
        isSubjectCaseSensitive: false,
        subjectBeginsWith: "ExamplePrefix",
        subjectEndsWith: "ExampleSuffix",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to asynchronously updates an existing event subscription.
 *
 * @summary asynchronously updates an existing event subscription.
 * x-ms-original-file: 2025-07-15-preview/EventSubscriptions_UpdateForCustomTopic_ServiceBusTopicDestination.json
 */
async function eventSubscriptionsUpdateForCustomTopicServiceBusTopicDestination(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const result = await client.eventSubscriptions.update(
    "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic2",
    "examplesubscription1",
    {
      destination: {
        endpointType: "ServiceBusTopic",
        resourceId:
          "/subscriptions/55f3dcd4-cac7-43b4-990b-a139d62a1eb2/resourceGroups/TestRG/providers/Microsoft.ServiceBus/namespaces/ContosoNamespace/topics/SBT",
      },
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

/**
 * This sample demonstrates how to asynchronously updates an existing event subscription.
 *
 * @summary asynchronously updates an existing event subscription.
 * x-ms-original-file: 2025-07-15-preview/EventSubscriptions_UpdateForCustomTopic_StorageQueueDestination.json
 */
async function eventSubscriptionsUpdateForCustomTopicStorageQueueDestination(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const result = await client.eventSubscriptions.update(
    "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic1",
    "examplesubscription1",
    {
      deadLetterDestination: {
        endpointType: "StorageBlob",
        blobContainerName: "contosocontainer",
        resourceId:
          "/subscriptions/55f3dcd4-cac7-43b4-990b-a139d62a1eb2/resourceGroups/TestRG/providers/Microsoft.Storage/storageAccounts/contosostg",
      },
      destination: {
        endpointType: "StorageQueue",
        queueMessageTimeToLiveInSeconds: 300,
        queueName: "queue1",
        resourceId:
          "/subscriptions/d33c5f7a-02ea-40f4-bf52-07f17e84d6a8/resourceGroups/TestRG/providers/Microsoft.Storage/storageAccounts/contosostg",
      },
      filter: {
        isSubjectCaseSensitive: false,
        subjectBeginsWith: "ExamplePrefix",
        subjectEndsWith: "ExampleSuffix",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to asynchronously updates an existing event subscription.
 *
 * @summary asynchronously updates an existing event subscription.
 * x-ms-original-file: 2025-07-15-preview/EventSubscriptions_UpdateForCustomTopic_WebhookDestination.json
 */
async function eventSubscriptionsUpdateForCustomTopicWebhookDestination(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const result = await client.eventSubscriptions.update(
    "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic2",
    "examplesubscription1",
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

/**
 * This sample demonstrates how to asynchronously updates an existing event subscription.
 *
 * @summary asynchronously updates an existing event subscription.
 * x-ms-original-file: 2025-07-15-preview/EventSubscriptions_UpdateForResource.json
 */
async function eventSubscriptionsUpdateForResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const result = await client.eventSubscriptions.update(
    "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventHub/namespaces/examplenamespace1",
    "examplesubscription1",
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

/**
 * This sample demonstrates how to asynchronously updates an existing event subscription.
 *
 * @summary asynchronously updates an existing event subscription.
 * x-ms-original-file: 2025-07-15-preview/EventSubscriptions_UpdateForResourceGroup.json
 */
async function eventSubscriptionsUpdateForResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const result = await client.eventSubscriptions.update(
    "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg",
    "examplesubscription2",
    {
      destination: {
        endpointType: "EventHub",
        resourceId:
          "/subscriptions/55f3dcd4-cac7-43b4-990b-a139d62a1eb2/resourceGroups/TestRG/providers/Microsoft.EventHub/namespaces/ContosoNamespace/eventhubs/EH1",
      },
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

/**
 * This sample demonstrates how to asynchronously updates an existing event subscription.
 *
 * @summary asynchronously updates an existing event subscription.
 * x-ms-original-file: 2025-07-15-preview/EventSubscriptions_UpdateForSubscription.json
 */
async function eventSubscriptionsUpdateForSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const result = await client.eventSubscriptions.update(
    "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40",
    "examplesubscription3",
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
  await eventSubscriptionsUpdateForCustomTopic();
  await eventSubscriptionsUpdateForCustomTopicAzureFunctionDestination();
  await eventSubscriptionsUpdateForCustomTopicEventHubDestination();
  await eventSubscriptionsUpdateForCustomTopicHybridConnectionDestination();
  await eventSubscriptionsUpdateForCustomTopicServiceBusQueueDestination();
  await eventSubscriptionsUpdateForCustomTopicServiceBusTopicDestination();
  await eventSubscriptionsUpdateForCustomTopicStorageQueueDestination();
  await eventSubscriptionsUpdateForCustomTopicWebhookDestination();
  await eventSubscriptionsUpdateForResource();
  await eventSubscriptionsUpdateForResourceGroup();
  await eventSubscriptionsUpdateForSubscription();
}

main().catch(console.error);
