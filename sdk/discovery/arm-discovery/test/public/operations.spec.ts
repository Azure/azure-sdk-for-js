// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { env } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { DiscoveryClient } from "../../src/index.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { createRecorder } from "./utils/recordedClient.js";

describe("Discovery ARM Client - Operations", () => {
  let recorder: Recorder;
  let client: DiscoveryClient;
  let subscriptionId: string;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    subscriptionId = env.SUBSCRIPTION_ID || "";
    const credential = createTestCredential();
    client = new DiscoveryClient(credential, subscriptionId, recorder.configureClientOptions({}));
  });

  afterEach(async () => {
    if (recorder?.recordingId) {
      await recorder.stop();
    }
  });

  it("should list available operations", async () => {
    const operations: any[] = [];
    for await (const operation of client.operations.list()) {
      operations.push(operation);
    }
    assert.isArray(operations);
    assert.isAbove(operations.length, 0);
    assert.isDefined(operations[0].name);
  });
});
