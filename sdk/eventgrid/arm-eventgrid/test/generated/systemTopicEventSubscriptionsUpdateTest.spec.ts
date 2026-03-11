// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("update an existing event subscription of a system topic", () => {
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

  it("should update an existing event subscription of a system topic for systemTopicEventSubscriptionsUpdate", async function () {
    const result = await client.systemTopicEventSubscriptions.update(
      "examplerg",
      "exampleSystemTopic1",
      "exampleEventSubscriptionName1",
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
    assert.ok(result);
    assert.strictEqual(result.name, "exampleEventSubscriptionName1");
    assert.strictEqual(result.type, "Microsoft.EventGrid/systemTopics/eventSubscriptions");
    assert.strictEqual(
      result.id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/systemTopics/exampleSystemTopic1/eventSubscriptions/exampleEventSubscriptionName1",
    );
    assert.strictEqual(result.eventDeliverySchema, "EventGridSchema");
    assert.ok(Array.isArray(result.labels));
    assert.strictEqual(result.labels.length, 2);
    assert.strictEqual(result.provisioningState, "Succeeded");
    assert.strictEqual(
      result.topic,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/systemTopics/exampleSystemTopic1",
    );
  });
});
