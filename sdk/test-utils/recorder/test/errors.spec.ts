// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { describe, it, assert, beforeEach } from "vitest";
import { RecorderError, RecordingStateManager } from "../src/utils/utils.js";
import { Recorder } from "../src/recorder.js";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import { encodeBase64 } from "../src/utils/encoding.js";

describe("State Manager", function () {
  it("throws error if started twice", function () {
    const manager = new RecordingStateManager();
    manager.state = "started";
    try {
      manager.state = "started";
      throw new Error("should not have reached here, previous assignment should have failed");
    } catch (error: any) {
      assert.equal((error as RecorderError).name, "RecorderError");
      assert.equal((error as RecorderError).message, 
        "Already started, should not have called start again.",
      );
    }
  });

  it("throws error if stopped twice", function () {
    const manager = new RecordingStateManager();
    try {
      manager.state = "stopped";
      throw new Error("should not have reached here, previous assignment should have failed");
    } catch (error: any) {
      assert.equal((error as RecorderError).name, "RecorderError");
      assert.equal((error as RecorderError).message,
        "Already stopped, should not have called stop again.",
      );
    }
  });
});

describe("handleTestProxyErrors", function () {
  let recorder: Recorder;
  beforeEach(function (ctx) {
    recorder = new Recorder(ctx);
  });

  it("x-request-mismatch header", function () {
    const headers = createHttpHeaders();
    headers.set("x-request-mismatch", true);
    headers.set("x-request-mismatch-error", encodeBase64("this is a mismatch error"));
    try {
      recorder["handleTestProxyErrors"]({
        request: createPipelineRequest({ url: "abcd" }),
        status: 401,
        headers,
      });
    } catch (error) {
      assert.equal((error as RecorderError).name, "RecorderError");
      assert.equal((error as RecorderError).message, "this is a mismatch error");
    }
  });
});
