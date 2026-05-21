// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import { EventGridDiagnosticsClient } from "../../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("EventGridDiagnosticsClient", () => {
  let recorder: Recorder;
  let client: EventGridDiagnosticsClient;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start({ envSetupForPlayback: {} });
    const credential = new DefaultAzureCredential();
    client = new EventGridDiagnosticsClient(
      process.env.EVENTGRID_NAMESPACE_ENDPOINT ?? "https://endpoint",
      credential,
      "default-topic",
    );
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("returns a topic health snapshot", async () => {
    const snapshot = await client.getTopicHealth({ sampleCount: 5 });
    assert.equal(snapshot.topicName, "default-topic");
    assert.isAtLeast(snapshot.acceptedEventsPerSecond, 0);
  });

  it("returns lag for a single subscription", async () => {
    const lag = await client.getSubscriptionLag({ subscriptionName: "orders" });
    assert.isObject(lag);
  });
});
