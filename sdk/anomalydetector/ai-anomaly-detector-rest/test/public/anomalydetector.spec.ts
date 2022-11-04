// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { Context } from "mocha";
import { createRecorder } from "./utils/recordedClient";

describe("AnomalyDetectorClient", () => {
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
  });

  afterEach(async function () {
    if (recorder) {
      await recorder.stop();
    }
  });

  it("sample test", async function () {
    console.log("Hi, I'm a test!");
  });
});
