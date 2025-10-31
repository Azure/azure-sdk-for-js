// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { QueueClient } from "../src/QueueClient.js";
import { getQSU } from "./utils/index.js";
import { getUniqueName, recorderEnvSetup, uriSanitizers } from "./utils/testutils.common.js";
import { isPlaybackMode, Recorder } from "@azure-tools/test-recorder";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("Aborter", () => {
  let queueName: string;
  let queueClient: QueueClient;

  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers({ uriSanitizers }, ["record", "playback"]);
    const queueServiceClient = getQSU(recorder);
    queueName = recorder.variable("queue", getUniqueName("queue"));
    queueClient = queueServiceClient.getQueueClient(queueName);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should not abort after calling abort()", async () => {
    const cResp = await queueClient.create();
    assert.isDefined(cResp.date);
    await queueClient.delete();
  });

  it("should abort when calling abort() before request finishes", async () => {
    const aborter = new AbortController();
    const response = queueClient.create({ abortSignal: aborter.signal });
    aborter.abort();
    try {
      await response;
      assert.fail();
    } catch (err: any) {
      assert.equal(err.name, "AbortError");
    }
  });

  it("should not abort when calling abort() after request finishes", async () => {
    const aborter = new AbortController();
    await queueClient.create({ abortSignal: aborter.signal });
    aborter.abort();
    await queueClient.delete();
  });

  it("should abort after aborter timeout", async () => {
    try {
      await queueClient.create({ abortSignal: AbortSignal.timeout(1) });
      assert.fail();
    } catch (err: any) {
      if (!isPlaybackMode()) {
        assert.equal(err.name, "AbortError");
      } else {
        // Race condition in playback mode:
        // During playback, the test recorder attempts to replay recorded responses but won't find matching entries
        // for aborted requests as the recording is empty.
        // In this case, two possible exceptions can occur: either the AbortController's timeout
        // triggers first (AbortError) or the recorder fails to find matching entries first (RecorderError).
        // We need to handle both possible outcomes to prevent test flakiness.
        assert.include(["RecorderError", "AbortError"], err.name);
      }
    }
  });
});
