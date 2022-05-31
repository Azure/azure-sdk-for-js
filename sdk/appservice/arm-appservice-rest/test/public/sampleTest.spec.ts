// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import * as assert from "assert";
import { createRecorder } from "./utils/recordedClient";

describe("My test", () => {
  let recorder: Recorder;

  beforeEach(async function() {
    recorder = createRecorder(this);
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("sample test", async function() {
    assert.equal(1, 1);
  });
});
