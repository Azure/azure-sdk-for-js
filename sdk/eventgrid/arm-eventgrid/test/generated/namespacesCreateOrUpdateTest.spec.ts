// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("asynchronously creates or updates a new namespace with the specified parameters", () => {
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

  it("should asynchronously creates or updates a new namespace with the specified parameters for namespacesCreateOrUpdate", async function () {
    const result = await client.namespaces.createOrUpdate("examplerg", "exampleNamespaceName1", {
      location: "westus",
      topicSpacesConfiguration: {
        routeTopicResourceId:
          "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampleTopic1",
        state: "Enabled",
      },
      tags: { tag1: "value11", tag2: "value22" },
    });
    assert.ok(result);
    assert.strictEqual(result.name, "exampleNamespaceName1");
    assert.strictEqual(result.type, "Microsoft.EventGrid/Namespaces");
    assert.strictEqual(
      result.id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/namespaces/exampleNamespaceName1",
    );
    assert.strictEqual(result.location, "westus");
    assert.strictEqual(result.provisioningState, "Creating");
    assert.strictEqual(result.tags?.key1, "value11");
    assert.strictEqual(result.tags?.key2, "value22");
  });
});
