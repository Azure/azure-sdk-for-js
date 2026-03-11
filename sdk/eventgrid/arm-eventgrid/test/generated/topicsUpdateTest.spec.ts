// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("asynchronously updates a topic with the specified parameters", () => {
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

  it("should asynchronously updates a topic with the specified parameters for topicsUpdate", async function () {
    const result = await client.topics.update("examplerg", "exampletopic1", {
      inboundIpRules: [
        { action: "Allow", ipMask: "12.18.30.15" },
        { action: "Allow", ipMask: "12.18.176.1" },
      ],
      publicNetworkAccess: "Enabled",
      tags: { tag1: "value1", tag2: "value2" },
    });
    assert.ok(result);
  });
});
