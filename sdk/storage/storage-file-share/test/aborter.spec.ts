// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getBSU, recorderEnvSetup, getUniqueName, uriSanitizers } from "./utils/index.js";
import { isPlaybackMode, Recorder } from "@azure-tools/test-recorder";
import type { ShareClient } from "@azure/storage-file-share";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("Aborter", () => {
  let shareName: string;
  let shareClient: ShareClient;

  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers({ uriSanitizers }, ["record", "playback"]);
    const serviceClient = getBSU(recorder);
    shareName = recorder.variable("share", getUniqueName("share"));
    shareClient = serviceClient.getShareClient(shareName);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("Should abort after aborter timeout", async () => {
    try {
      await shareClient.create({ abortSignal: AbortSignal.timeout(1) });
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

  it("Should not abort after calling abort()", async () => {
    await shareClient.create();
    await shareClient.delete();
  });

  it("Should abort when calling abort() before request finishes", async () => {
    const aborter = new AbortController();
    const response = shareClient.create({ abortSignal: aborter.signal });
    aborter.abort();
    try {
      await response;
      assert.fail();
    } catch (err: any) {
      assert.equal(err.name, "AbortError");
    }
  });

  it("Should not abort when calling abort() after request finishes", async () => {
    const aborter = new AbortController();
    await shareClient.create();
    aborter.abort();
  });
});
