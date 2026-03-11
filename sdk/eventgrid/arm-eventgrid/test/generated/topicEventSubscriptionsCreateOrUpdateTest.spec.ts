// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("asynchronously creates a new event subscription or updates an existing event subscription", () => {
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

  it("should asynchronously creates a new event subscription or updates an existing event subscription for topicEventSubscriptionsCreateOrUpdate", async function () {
    const result = await client.topicEventSubscriptions.createOrUpdate(
      "examplerg",
      "exampleTopic1",
      "exampleEventSubscriptionName1",
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
    assert.strictEqual(result.name, "exampleEventSubscriptionName1");
    assert.strictEqual(result.type, "Microsoft.EventGrid/topics/eventSubscriptions");
    assert.strictEqual(
      result.id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampleTopic1/eventSubscriptions/exampleEventSubscriptionName1",
    );
    assert.strictEqual(result.eventDeliverySchema, "EventGridSchema");
    assert.strictEqual(result.provisioningState, "Succeeded");
    assert.strictEqual(
      result.topic,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampleTopic1",
    );
  });
});
