// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createRecorder } from "./utils/recordedClient.js";
import { Recorder } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("My test", () => {
  let recorder: Recorder;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("sample test", async function () {
    assert.equal(1, 1);
  });
});
