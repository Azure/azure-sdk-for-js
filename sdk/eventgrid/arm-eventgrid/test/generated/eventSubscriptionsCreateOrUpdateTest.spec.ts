// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("asynchronously creates a new event subscription or updates an existing event subscription based on the specified scope", () => {
  let recorder: Recorder;
  let client: EventGridManagementClient;

  beforeEach(async function (ctx) {
    recorder = await createRecorder(ctx);
    const credential = createTestCredential();
    const subscriptionId = env.SUBSCRIPTION_ID || "<SUBSCRIPTION_ID>";
    const clientOptions = recorder.configureClientOptions({});
    client = new EventGridManagementClient(credential, subscriptionId, clientOptions);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should asynchronously creates a new event subscription or updates an existing event subscription based on the specified scope for eventSubscriptionsCreateOrUpdateForCustomTopic", async function () {
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
    assert.ok(result);
    assert.strictEqual(result.name, "examplesubscription1");
    assert.strictEqual(result.type, "Microsoft.EventGrid/eventSubscriptions");
    assert.strictEqual(
      result.id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic1/providers/Microsoft.EventGrid/eventSubscriptions/examplesubscription1",
    );
    assert.strictEqual(result.provisioningState, "Succeeded");
    assert.strictEqual(
      result.topic,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/microsoft.eventgrid/topics/exampletopic1",
    );
  });

  it("should asynchronously creates a new event subscription or updates an existing event subscription based on the specified scope for eventSubscriptionsCreateOrUpdateForCustomTopicAzureFunctionDestination", async function () {
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
    assert.ok(result);
    assert.strictEqual(result.name, "examplesubscription1");
    assert.strictEqual(result.type, "Microsoft.EventGrid/eventSubscriptions");
    assert.strictEqual(
      result.id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic1/providers/Microsoft.EventGrid/eventSubscriptions/examplesubscription1",
    );
    assert.strictEqual(result.provisioningState, "Creating");
    assert.strictEqual(
      result.topic,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic1",
    );
  });

  it("should asynchronously creates a new event subscription or updates an existing event subscription based on the specified scope for eventSubscriptionsCreateOrUpdateForCustomTopicEventHubDestination", async function () {
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
    assert.ok(result);
    assert.strictEqual(result.name, "examplesubscription1");
    assert.strictEqual(result.type, "Microsoft.EventGrid/eventSubscriptions");
    assert.strictEqual(
      result.id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic1/providers/Microsoft.EventGrid/eventSubscriptions/examplesubscription1",
    );
    assert.strictEqual(result.provisioningState, "Creating");
    assert.strictEqual(
      result.topic,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic1",
    );
  });

  it("should asynchronously creates a new event subscription or updates an existing event subscription based on the specified scope for eventSubscriptionsCreateOrUpdateForCustomTopicHybridConnectionDestination", async function () {
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
    assert.ok(result);
    assert.strictEqual(result.name, "examplesubscription1");
    assert.strictEqual(result.type, "Microsoft.EventGrid/eventSubscriptions");
    assert.strictEqual(
      result.id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic1/providers/Microsoft.EventGrid/eventSubscriptions/examplesubscription1",
    );
    assert.strictEqual(result.provisioningState, "Creating");
    assert.strictEqual(
      result.topic,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic1",
    );
  });

  it("should asynchronously creates a new event subscription or updates an existing event subscription based on the specified scope for eventSubscriptionsCreateOrUpdateForCustomTopicServiceBusQueueDestination", async function () {
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
    assert.ok(result);
    assert.strictEqual(result.name, "examplesubscription1");
    assert.strictEqual(result.type, "Microsoft.EventGrid/eventSubscriptions");
    assert.strictEqual(
      result.id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic1/providers/Microsoft.EventGrid/eventSubscriptions/examplesubscription1",
    );
    assert.strictEqual(result.provisioningState, "Creating");
    assert.strictEqual(
      result.topic,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic1",
    );
  });

  it("should asynchronously creates a new event subscription or updates an existing event subscription based on the specified scope for eventSubscriptionsCreateOrUpdateForCustomTopicServiceBusTopicDestination", async function () {
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
    assert.ok(result);
    assert.strictEqual(result.name, "examplesubscription1");
    assert.strictEqual(result.type, "Microsoft.EventGrid/eventSubscriptions");
    assert.strictEqual(
      result.id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic1/providers/Microsoft.EventGrid/eventSubscriptions/examplesubscription1",
    );
    assert.strictEqual(result.provisioningState, "Creating");
    assert.strictEqual(
      result.topic,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic1",
    );
  });

  it("should asynchronously creates a new event subscription or updates an existing event subscription based on the specified scope for eventSubscriptionsCreateOrUpdateForCustomTopicStorageQueueDestination", async function () {
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
    assert.ok(result);
    assert.strictEqual(result.name, "examplesubscription1");
    assert.strictEqual(result.type, "Microsoft.EventGrid/eventSubscriptions");
    assert.strictEqual(
      result.id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic1/providers/Microsoft.EventGrid/eventSubscriptions/examplesubscription1",
    );
    assert.strictEqual(result.provisioningState, "Creating");
    assert.strictEqual(
      result.topic,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic1",
    );
  });

  it("should asynchronously creates a new event subscription or updates an existing event subscription based on the specified scope for eventSubscriptionsCreateOrUpdateForCustomTopicWebhookDestination", async function () {
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
    assert.ok(result);
    assert.strictEqual(result.name, "examplesubscription1");
    assert.strictEqual(result.type, "Microsoft.EventGrid/eventSubscriptions");
    assert.strictEqual(
      result.id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic1/providers/Microsoft.EventGrid/eventSubscriptions/examplesubscription1",
    );
    assert.strictEqual(result.provisioningState, "Succeeded");
    assert.strictEqual(
      result.topic,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/microsoft.eventgrid/topics/exampletopic1",
    );
  });

  it("should asynchronously creates a new event subscription or updates an existing event subscription based on the specified scope for eventSubscriptionsCreateOrUpdateForResource", async function () {
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
    assert.ok(result);
    assert.strictEqual(result.name, "examplesubscription10");
    assert.strictEqual(result.type, "Microsoft.EventGrid/eventSubscriptions");
    assert.strictEqual(
      result.id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventHub/namespaces/examplenamespace1/providers/Microsoft.EventGrid/eventSubscriptions/examplesubscription10",
    );
    assert.strictEqual(result.provisioningState, "Succeeded");
    assert.strictEqual(
      result.topic,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventHub/namespaces/examplenamespace1",
    );
  });

  it("should asynchronously creates a new event subscription or updates an existing event subscription based on the specified scope for eventSubscriptionsCreateOrUpdateForResourceGroup", async function () {
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
    assert.ok(result);
    assert.strictEqual(result.name, "examplesubscription2");
    assert.strictEqual(result.type, "Microsoft.EventGrid/eventSubscriptions");
    assert.strictEqual(
      result.id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/eventSubscriptions/examplesubscription2",
    );
    assert.strictEqual(result.provisioningState, "Succeeded");
    assert.strictEqual(
      result.topic,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg",
    );
  });

  it("should asynchronously creates a new event subscription or updates an existing event subscription based on the specified scope for eventSubscriptionsCreateOrUpdateForSubscription", async function () {
    const result = await client.eventSubscriptions.createOrUpdate(
      "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40",
      "examplesubscription3",
      {
        destination: { endpointType: "WebHook", endpointUrl: "https://requestb.in/15ksip71" },
        filter: { isSubjectCaseSensitive: false },
      },
    );
    assert.ok(result);
    assert.strictEqual(result.name, "examplesubscription3");
    assert.strictEqual(result.type, "Microsoft.EventGrid/eventSubscriptions");
    assert.strictEqual(
      result.id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/providers/Microsoft.EventGrid/eventSubscriptions/examplesubscription3",
    );
    assert.strictEqual(result.provisioningState, "Succeeded");
    assert.strictEqual(result.topic, "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40");
  });
});
