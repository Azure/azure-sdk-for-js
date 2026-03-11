// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("get properties of a namespace topic", () => {
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

  it("should get properties of a namespace topic for namespaceTopicsGet", async function () {
    const result = await client.namespaceTopics.get(
      "examplerg",
      "examplenamespace2",
      "examplenamespacetopic2",
    );
    assert.ok(result);
    assert.strictEqual(result.name, "examplenamespacetopic2");
    assert.strictEqual(result.type, "Microsoft.EventGrid/namespaces/topics");
    assert.strictEqual(
      result.id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e41/resourceGroups/examplerg/providers/Microsoft.EventGrid/namespaces/examplenamespace2/topics/examplenamespacetopic2",
    );
    assert.strictEqual(result.eventRetentionInDays, 1);
    assert.strictEqual(result.inputSchema, "CloudEventSchemaV1_0");
    assert.strictEqual(result.provisioningState, "Succeeded");
    assert.strictEqual(result.publisherType, "Custom");
  });
});
