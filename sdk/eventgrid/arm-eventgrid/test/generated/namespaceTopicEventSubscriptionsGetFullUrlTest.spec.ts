// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("get the full endpoint URL for an event subscription of a namespace topic", () => {
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

  it("should get the full endpoint URL for an event subscription of a namespace topic for namespaceTopicEventSubscriptionsGetFullUrl", async function () {
    const result = await client.namespaceTopicEventSubscriptions.getFullUrl(
      "examplerg",
      "exampleNamespaceName1",
      "exampleDomainTopic1",
      "examplesubscription1",
    );
    assert.ok(result);
    assert.strictEqual(result.endpointUrl, "https://requestb.in/15ksip71");
  });
});
