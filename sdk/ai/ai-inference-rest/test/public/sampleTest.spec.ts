// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createRecorder, createInferenceClient } from "./utils/recordedClient.js";
import { Recorder } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { InferenceClient } from "../../src/index.js";

describe("chat test suite", () => {
  let recorder: Recorder;
  let client: InferenceClient;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = await createInferenceClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("client test", async function () {
    assert.isNotNull(client);
  });
});
