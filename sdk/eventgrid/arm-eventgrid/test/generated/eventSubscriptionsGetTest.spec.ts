// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("get properties of an event subscription", () => {
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

  it("should get properties of an event subscription for eventSubscriptionsGetForCustomTopic", async function () {
    const result = await client.eventSubscriptions.get(
      "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic2",
      "examplesubscription1",
    );
    assert.ok(result);
    assert.strictEqual(result.name, "examplesubscription1");
    assert.strictEqual(result.type, "Microsoft.EventGrid/eventSubscriptions");
    assert.strictEqual(
      result.id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic2/providers/Microsoft.EventGrid/eventSubscriptions/examplesubscription1",
    );
    assert.ok(Array.isArray(result.labels));
    assert.strictEqual(result.labels.length, 2);
    assert.strictEqual(result.provisioningState, "Succeeded");
    assert.strictEqual(
      result.topic,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/microsoft.eventgrid/topics/exampletopic2",
    );
  });

  it("should get properties of an event subscription for eventSubscriptionsGetForCustomTopicAzureFunctionDestination", async function () {
    const result = await client.eventSubscriptions.get(
      "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic2",
      "examplesubscription1",
    );
    assert.ok(result);
    assert.strictEqual(result.name, "examplesubscription1");
    assert.strictEqual(result.type, "Microsoft.EventGrid/eventSubscriptions");
    assert.strictEqual(
      result.id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic2/providers/Microsoft.EventGrid/eventSubscriptions/examplesubscription1",
    );
    assert.ok(Array.isArray(result.labels));
    assert.strictEqual(result.labels.length, 2);
    assert.strictEqual(result.provisioningState, "Succeeded");
    assert.strictEqual(
      result.topic,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/microsoft.eventgrid/topics/exampletopic2",
    );
  });

  it("should get properties of an event subscription for eventSubscriptionsGetForCustomTopicEventHubDestination", async function () {
    const result = await client.eventSubscriptions.get(
      "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic2",
      "examplesubscription1",
    );
    assert.ok(result);
    assert.strictEqual(result.name, "examplesubscription1");
    assert.strictEqual(result.type, "Microsoft.EventGrid/eventSubscriptions");
    assert.strictEqual(
      result.id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic2/providers/Microsoft.EventGrid/eventSubscriptions/examplesubscription1",
    );
    assert.ok(Array.isArray(result.labels));
    assert.strictEqual(result.labels.length, 2);
    assert.strictEqual(result.provisioningState, "Succeeded");
    assert.strictEqual(
      result.topic,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/microsoft.eventgrid/topics/exampletopic2",
    );
  });

  it("should get properties of an event subscription for eventSubscriptionsGetForCustomTopicHybridConnectionDestination", async function () {
    const result = await client.eventSubscriptions.get(
      "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic2",
      "examplesubscription1",
    );
    assert.ok(result);
    assert.strictEqual(result.name, "examplesubscription1");
    assert.strictEqual(result.type, "Microsoft.EventGrid/eventSubscriptions");
    assert.strictEqual(
      result.id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic2/providers/Microsoft.EventGrid/eventSubscriptions/examplesubscription1",
    );
    assert.ok(Array.isArray(result.labels));
    assert.strictEqual(result.labels.length, 2);
    assert.strictEqual(result.provisioningState, "Succeeded");
    assert.strictEqual(
      result.topic,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/microsoft.eventgrid/topics/exampletopic2",
    );
  });

  it("should get properties of an event subscription for eventSubscriptionsGetForCustomTopicServiceBusQueueDestination", async function () {
    const result = await client.eventSubscriptions.get(
      "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic2",
      "examplesubscription1",
    );
    assert.ok(result);
    assert.strictEqual(result.name, "examplesubscription1");
    assert.strictEqual(result.type, "Microsoft.EventGrid/eventSubscriptions");
    assert.strictEqual(
      result.id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic2/providers/Microsoft.EventGrid/eventSubscriptions/examplesubscription1",
    );
    assert.ok(Array.isArray(result.labels));
    assert.strictEqual(result.labels.length, 2);
    assert.strictEqual(result.provisioningState, "Succeeded");
    assert.strictEqual(
      result.topic,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/microsoft.eventgrid/topics/exampletopic2",
    );
  });

  it("should get properties of an event subscription for eventSubscriptionsGetForCustomTopicServiceBusTopicDestination", async function () {
    const result = await client.eventSubscriptions.get(
      "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic2",
      "examplesubscription1",
    );
    assert.ok(result);
    assert.strictEqual(result.name, "examplesubscription1");
    assert.strictEqual(result.type, "Microsoft.EventGrid/eventSubscriptions");
    assert.strictEqual(
      result.id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic2/providers/Microsoft.EventGrid/eventSubscriptions/examplesubscription1",
    );
    assert.ok(Array.isArray(result.labels));
    assert.strictEqual(result.labels.length, 2);
    assert.strictEqual(result.provisioningState, "Succeeded");
    assert.strictEqual(
      result.topic,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/microsoft.eventgrid/topics/exampletopic2",
    );
  });

  it("should get properties of an event subscription for eventSubscriptionsGetForCustomTopicStorageQueueDestination", async function () {
    const result = await client.eventSubscriptions.get(
      "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic2",
      "examplesubscription1",
    );
    assert.ok(result);
    assert.strictEqual(result.name, "examplesubscription1");
    assert.strictEqual(result.type, "Microsoft.EventGrid/eventSubscriptions");
    assert.strictEqual(
      result.id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic2/providers/Microsoft.EventGrid/eventSubscriptions/examplesubscription1",
    );
    assert.ok(Array.isArray(result.labels));
    assert.strictEqual(result.labels.length, 2);
    assert.strictEqual(result.provisioningState, "Succeeded");
    assert.strictEqual(
      result.topic,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/microsoft.eventgrid/topics/exampletopic2",
    );
  });

  it("should get properties of an event subscription for eventSubscriptionsGetForCustomTopicWebhookDestination", async function () {
    const result = await client.eventSubscriptions.get(
      "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic2",
      "examplesubscription1",
    );
    assert.ok(result);
    assert.strictEqual(result.name, "examplesubscription1");
    assert.strictEqual(result.type, "Microsoft.EventGrid/eventSubscriptions");
    assert.strictEqual(
      result.id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic2/providers/Microsoft.EventGrid/eventSubscriptions/examplesubscription1",
    );
    assert.ok(Array.isArray(result.labels));
    assert.strictEqual(result.labels.length, 2);
    assert.strictEqual(result.provisioningState, "Succeeded");
    assert.strictEqual(
      result.topic,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/microsoft.eventgrid/topics/exampletopic2",
    );
  });

  it("should get properties of an event subscription for eventSubscriptionsGetForResource", async function () {
    const result = await client.eventSubscriptions.get(
      "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventHub/namespaces/examplenamespace1",
      "examplesubscription1",
    );
    assert.ok(result);
    assert.strictEqual(result.name, "examplesubscription1");
    assert.strictEqual(result.type, "Microsoft.EventGrid/eventSubscriptions");
    assert.strictEqual(
      result.id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventHub/namespaces/examplenamespace1/providers/Microsoft.EventGrid/eventSubscriptions/examplesubscription1",
    );
    assert.ok(Array.isArray(result.labels));
    assert.strictEqual(result.labels.length, 2);
    assert.strictEqual(result.provisioningState, "Succeeded");
    assert.strictEqual(
      result.topic,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventHub/namespaces/examplenamespace1",
    );
  });

  it("should get properties of an event subscription for eventSubscriptionsGetForResourceGroup", async function () {
    const result = await client.eventSubscriptions.get(
      "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg",
      "examplesubscription2",
    );
    assert.ok(result);
    assert.strictEqual(result.name, "examplesubscription2");
    assert.strictEqual(result.type, "Microsoft.EventGrid/eventSubscriptions");
    assert.strictEqual(
      result.id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/eventSubscriptions/examplesubscription2",
    );
    assert.ok(Array.isArray(result.labels));
    assert.strictEqual(result.labels.length, 2);
    assert.strictEqual(result.provisioningState, "Succeeded");
    assert.strictEqual(
      result.topic,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg",
    );
  });

  it("should get properties of an event subscription for eventSubscriptionsGetForSubscription", async function () {
    const result = await client.eventSubscriptions.get(
      "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40",
      "examplesubscription3",
    );
    assert.ok(result);
    assert.strictEqual(result.name, "examplesubscription3");
    assert.strictEqual(result.type, "Microsoft.EventGrid/eventSubscriptions");
    assert.strictEqual(
      result.id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/providers/Microsoft.EventGrid/eventSubscriptions/examplesubscription3",
    );
    assert.ok(Array.isArray(result.labels));
    assert.strictEqual(result.labels.length, 2);
    assert.strictEqual(result.provisioningState, "Succeeded");
    assert.strictEqual(result.topic, "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40");
  });
});
