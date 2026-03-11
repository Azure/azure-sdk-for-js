// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("asynchronously creates or updates a new domain topic with the specified parameters", () => {
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

  it("should asynchronously creates or updates a new domain topic with the specified parameters for domainTopicsCreateOrUpdate", async function () {
    const result = await client.domainTopics.createOrUpdate(
      "examplerg",
      "exampledomain1",
      "exampledomaintopic1",
    );
    assert.ok(result);
    assert.strictEqual(result.name, "exampledomaintopic1");
    assert.strictEqual(result.type, "Microsoft.EventGrid/domains/topics");
    assert.strictEqual(
      result.id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/domains/exampledomain1/topics/exampledomaintopic1",
    );
    assert.strictEqual(result.provisioningState, "Succeeded");
  });
});
