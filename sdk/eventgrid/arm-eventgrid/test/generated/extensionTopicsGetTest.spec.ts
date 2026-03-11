// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("get the properties of an extension topic", () => {
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

  it("should get the properties of an extension topic for extensionTopicsGet", async function () {
    const result = await client.extensionTopics.get(
      "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/microsoft.storage/storageaccounts/exampleResourceName/providers/Microsoft.eventgrid/extensionTopics/default",
    );
    assert.ok(result);
    assert.strictEqual(result.name, "default");
    assert.strictEqual(result.type, "providers/Microsoft.EventGrid/extensionTopics");
    assert.strictEqual(
      result.id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/microsoft.storage/storageaccounts/exampleResourceName/providers/Microsoft.eventgrid/extensionTopics/default",
    );
    assert.strictEqual(
      result.description,
      "Extension topic for /subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/microsoft.storage/storageaccounts/exampleResourceName/providers/Microsoft.eventgrid/extensionTopics/default that can be used to obtain metrics",
    );
    assert.strictEqual(
      result.systemTopic,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/systemTopics/exampleResourceName-2a41650f-00dd-4790-b3ab-dabd12d227cb",
    );
  });
});
