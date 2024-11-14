// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { createRecorder } from "./utils/recordedClient.js";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";

describe("My test", () => {
  let recorder: Recorder;

  beforeEach(async function (ctx) {
    recorder = await createRecorder(this);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("sample test", async function () {
    assert.equal(1, 1);
  });
});
