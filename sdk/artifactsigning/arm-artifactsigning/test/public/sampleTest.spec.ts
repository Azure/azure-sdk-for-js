// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// import { Recorder } from "@azure-tools/test-recorder";
// import { createRecorder } from "./utils/recordedClient.js";
import {
  assert,
  // beforeEach,
  // afterEach,
  it,
  describe,
} from "vitest";

describe("My test", () => {
  // let recorder: Recorder;

  // beforeEach(async function(ctx) {
  // recorder = await createRecorder(ctx);
  // });

  // afterEach(async function() {
  // await recorder.stop();
  // );

  it("sample test", async function () {
    assert.equal(1, 1);
  });
});
