// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createRecorder } from "./utils/recordedClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("My test", () => {
  // let recorder: Recorder;

  beforeEach(async function () {
    // recorder = await createRecorder(this);
  });

  afterEach(async function () {
    // await recorder.stop();
  });

  it("sample test", async function () {
    assert.equal(1, 1);
  });
});
