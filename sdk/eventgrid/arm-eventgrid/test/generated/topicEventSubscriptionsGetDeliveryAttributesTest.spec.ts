// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("get all delivery attributes for an event subscription for topic", () => {
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

  it("should get all delivery attributes for an event subscription for topic for topicEventSubscriptionsGetDeliveryAttributes", async function () {
    const result = await client.topicEventSubscriptions.getDeliveryAttributes(
      "examplerg",
      "exampleTopic1",
      "examplesubscription1",
    );
    assert.ok(result);
    assert.ok(Array.isArray(result.value));
    assert.strictEqual(result.value.length, 3);
  });
});
