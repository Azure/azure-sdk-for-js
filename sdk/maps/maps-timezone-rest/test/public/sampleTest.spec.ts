
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {isPlaybackMode, Recorder} from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";

const describeIfNotPlayback = isPlaybackMode() ? describe.skip : describe;

describeIfNotPlayback("My test", () => {
  let recorder: Recorder;

  beforeEach(async function(this: Context) {
    recorder = await createRecorder(this);
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("sample test", async function() {
    assert.equal(1, 1);
  });
});
