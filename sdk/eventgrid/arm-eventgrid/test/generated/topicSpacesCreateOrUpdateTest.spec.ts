// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("create or update a topic space with the specified parameters", () => {
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

  it("should create or update a topic space with the specified parameters for topicSpacesCreateOrUpdate", async function () {
    const result = await client.topicSpaces.createOrUpdate(
      "examplerg",
      "exampleNamespaceName1",
      "exampleTopicSpaceName1",
      { topicTemplates: ["filter1", "filter2"] },
    );
    assert.ok(result);
    assert.strictEqual(result.name, "exampleTopicSpaceName1");
    assert.strictEqual(result.type, "Microsoft.EventGrid/namespaces/topicSpaces");
    assert.strictEqual(
      result.id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/namespaces/exampleNamespaceName1/topicSpaces/exampleTopicSpaceName1",
    );
    assert.strictEqual(result.provisioningState, "Succeeded");
    assert.ok(Array.isArray(result.topicTemplates));
    assert.strictEqual(result.topicTemplates.length, 2);
  });
});
