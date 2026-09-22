// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to asynchronously creates a new event subscription or updates an existing event subscription based on the specified scope.
 *
 * @summary asynchronously creates a new event subscription or updates an existing event subscription based on the specified scope.
 * x-ms-original-file: 2025-07-15-preview/EventSubscriptions_CreateOrUpdateForCustomTopic.json
 */
async function eventSubscriptionsCreateOrUpdateForCustomTopic(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const result = await client.eventSubscriptions.createOrUpdate(
    "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic1",
    "examplesubscription1",
    {
      destination: {
        endpointType: "EventHub",
        resourceId:
          "/subscriptions/55f3dcd4-cac7-43b4-990b-a139d62a1eb2/resourceGroups/TestRG/providers/Microsoft.EventHub/namespaces/ContosoNamespace/eventhubs/EH1",
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
 * This sample demonstrates how to asynchronously creates a new event subscription or updates an existing event subscription based on the specified scope.
 *
 * @summary asynchronously creates a new event subscription or updates an existing event subscription based on the specified scope.
 * x-ms-original-file: 2025-07-15-preview/EventSubscriptions_CreateOrUpdateForCustomTopic_AzureFunctionDestination.json
 */
async function eventSubscriptionsCreateOrUpdateForCustomTopicAzureFunctionDestination(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const result = await client.eventSubscriptions.createOrUpdate(
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
 * This sample demonstrates how to asynchronously creates a new event subscription or updates an existing event subscription based on the specified scope.
 *
 * @summary asynchronously creates a new event subscription or updates an existing event subscription based on the specified scope.
 * x-ms-original-file: 2025-07-15-preview/EventSubscriptions_CreateOrUpdateForCustomTopic_EventHubDestination.json
 */
async function eventSubscriptionsCreateOrUpdateForCustomTopicEventHubDestination(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const result = await client.eventSubscriptions.createOrUpdate(
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
        endpointType: "EventHub",
        resourceId:
          "/subscriptions/55f3dcd4-cac7-43b4-990b-a139d62a1eb2/resourceGroups/TestRG/providers/Microsoft.EventHub/namespaces/ContosoNamespace/eventhubs/EH1",
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
 * This sample demonstrates how to asynchronously creates a new event subscription or updates an existing event subscription based on the specified scope.
 *
 * @summary asynchronously creates a new event subscription or updates an existing event subscription based on the specified scope.
 * x-ms-original-file: 2025-07-15-preview/EventSubscriptions_CreateOrUpdateForCustomTopic_HybridConnectionDestination.json
 */
async function eventSubscriptionsCreateOrUpdateForCustomTopicHybridConnectionDestination(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const result = await client.eventSubscriptions.createOrUpdate(
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
        endpointType: "HybridConnection",
        resourceId:
          "/subscriptions/d33c5f7a-02ea-40f4-bf52-07f17e84d6a8/resourceGroups/TestRG/providers/Microsoft.Relay/namespaces/ContosoNamespace/hybridConnections/HC1",
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
 * This sample demonstrates how to asynchronously creates a new event subscription or updates an existing event subscription based on the specified scope.
 *
 * @summary asynchronously creates a new event subscription or updates an existing event subscription based on the specified scope.
 * x-ms-original-file: 2025-07-15-preview/EventSubscriptions_CreateOrUpdateForCustomTopic_ServiceBusQueueDestination.json
 */
async function eventSubscriptionsCreateOrUpdateForCustomTopicServiceBusQueueDestination(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const result = await client.eventSubscriptions.createOrUpdate(
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
 * This sample demonstrates how to asynchronously creates a new event subscription or updates an existing event subscription based on the specified scope.
 *
 * @summary asynchronously creates a new event subscription or updates an existing event subscription based on the specified scope.
 * x-ms-original-file: 2025-07-15-preview/EventSubscriptions_CreateOrUpdateForCustomTopic_ServiceBusTopicDestination.json
 */
async function eventSubscriptionsCreateOrUpdateForCustomTopicServiceBusTopicDestination(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const result = await client.eventSubscriptions.createOrUpdate(
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
        endpointType: "ServiceBusTopic",
        resourceId:
          "/subscriptions/55f3dcd4-cac7-43b4-990b-a139d62a1eb2/resourceGroups/TestRG/providers/Microsoft.ServiceBus/namespaces/ContosoNamespace/topics/SBT",
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
 * This sample demonstrates how to asynchronously creates a new event subscription or updates an existing event subscription based on the specified scope.
 *
 * @summary asynchronously creates a new event subscription or updates an existing event subscription based on the specified scope.
 * x-ms-original-file: 2025-07-15-preview/EventSubscriptions_CreateOrUpdateForCustomTopic_StorageQueueDestination.json
 */
async function eventSubscriptionsCreateOrUpdateForCustomTopicStorageQueueDestination(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const result = await client.eventSubscriptions.createOrUpdate(
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
 * This sample demonstrates how to asynchronously creates a new event subscription or updates an existing event subscription based on the specified scope.
 *
 * @summary asynchronously creates a new event subscription or updates an existing event subscription based on the specified scope.
 * x-ms-original-file: 2025-07-15-preview/EventSubscriptions_CreateOrUpdateForCustomTopic_WebhookDestination.json
 */
async function eventSubscriptionsCreateOrUpdateForCustomTopicWebhookDestination(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const result = await client.eventSubscriptions.createOrUpdate(
    "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic1",
    "examplesubscription1",
    {
      destination: {
        endpointType: "EventHub",
        resourceId:
          "/subscriptions/55f3dcd4-cac7-43b4-990b-a139d62a1eb2/resourceGroups/TestRG/providers/Microsoft.EventHub/namespaces/ContosoNamespace/eventhubs/EH1",
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
 * This sample demonstrates how to asynchronously creates a new event subscription or updates an existing event subscription based on the specified scope.
 *
 * @summary asynchronously creates a new event subscription or updates an existing event subscription based on the specified scope.
 * x-ms-original-file: 2025-07-15-preview/EventSubscriptions_CreateOrUpdateForResource.json
 */
async function eventSubscriptionsCreateOrUpdateForResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const result = await client.eventSubscriptions.createOrUpdate(
    "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventHub/namespaces/examplenamespace1",
    "examplesubscription10",
    {
      destination: { endpointType: "WebHook", endpointUrl: "https://requestb.in/15ksip71" },
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
 * This sample demonstrates how to asynchronously creates a new event subscription or updates an existing event subscription based on the specified scope.
 *
 * @summary asynchronously creates a new event subscription or updates an existing event subscription based on the specified scope.
 * x-ms-original-file: 2025-07-15-preview/EventSubscriptions_CreateOrUpdateForResourceGroup.json
 */
async function eventSubscriptionsCreateOrUpdateForResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const result = await client.eventSubscriptions.createOrUpdate(
    "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg",
    "examplesubscription2",
    {
      destination: { endpointType: "WebHook", endpointUrl: "https://requestb.in/15ksip71" },
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
 * This sample demonstrates how to asynchronously creates a new event subscription or updates an existing event subscription based on the specified scope.
 *
 * @summary asynchronously creates a new event subscription or updates an existing event subscription based on the specified scope.
 * x-ms-original-file: 2025-07-15-preview/EventSubscriptions_CreateOrUpdateForSubscription.json
 */
async function eventSubscriptionsCreateOrUpdateForSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const result = await client.eventSubscriptions.createOrUpdate(
    "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40",
    "examplesubscription3",
    {
      destination: { endpointType: "WebHook", endpointUrl: "https://requestb.in/15ksip71" },
      filter: { isSubjectCaseSensitive: false },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await eventSubscriptionsCreateOrUpdateForCustomTopic();
  await eventSubscriptionsCreateOrUpdateForCustomTopicAzureFunctionDestination();
  await eventSubscriptionsCreateOrUpdateForCustomTopicEventHubDestination();
  await eventSubscriptionsCreateOrUpdateForCustomTopicHybridConnectionDestination();
  await eventSubscriptionsCreateOrUpdateForCustomTopicServiceBusQueueDestination();
  await eventSubscriptionsCreateOrUpdateForCustomTopicServiceBusTopicDestination();
  await eventSubscriptionsCreateOrUpdateForCustomTopicStorageQueueDestination();
  await eventSubscriptionsCreateOrUpdateForCustomTopicWebhookDestination();
  await eventSubscriptionsCreateOrUpdateForResource();
  await eventSubscriptionsCreateOrUpdateForResourceGroup();
  await eventSubscriptionsCreateOrUpdateForSubscription();
}

main().catch(console.error);
