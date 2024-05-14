// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RecorderError, RecordingStateManager } from "../src/utils/utils.js";
import { Recorder } from "../src/recorder.js";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import { encodeBase64 } from "../src/utils/encoding.js";
import { describe, it, beforeEach, expect } from "vitest";

describe("State Manager", function () {
  it("throws error if started twice", function () {
    const manager = new RecordingStateManager();
    manager.state = "started";
    try {
      manager.state = "started";
      throw new Error("should not have reached here, previous assignment should have failed");
    } catch (error: unknown) {
      expect(error instanceof RecorderError).to.equal(true);
      expect((error as RecorderError).name).to.equal("RecorderError");
      expect((error as RecorderError).message).to.equal(
        "Already started, should not have called start again.",
      );
    }
  });

  it("throws error if stopped twice", function () {
    const manager = new RecordingStateManager();
    try {
      manager.state = "stopped";
      throw new Error("should not have reached here, previous assignment should have failed");
    } catch (error: unknown) {
      expect(error instanceof RecorderError).to.equal(true);
      expect((error as RecorderError).name).to.equal("RecorderError");
      expect((error as RecorderError).message).to.equal(
        "Already stopped, should not have called stop again.",
      );
    }
  });
});

describe("handleTestProxyErrors", function () {
  let recorder: Recorder;
  beforeEach(function (context) {
    recorder = new Recorder(context);
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
      expect((error as RecorderError).name).to.equal("RecorderError");
      expect((error as RecorderError).message).to.equal("this is a mismatch error");
    }
  });
});
