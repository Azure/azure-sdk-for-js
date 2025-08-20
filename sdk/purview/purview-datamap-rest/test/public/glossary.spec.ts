// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { createRecorder } from "./utils/recordedClient.js";
import { createClient } from "./utils/recordedClient.js";
import { isUnexpected } from "@azure-rest/purview-datamap";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("purview datamap glossary test", () => {
  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("Should get glossary", async () => {
    const client = await createClient(recorder);
    const result = await client.path("/atlas/v2/glossary").get();

    assert.strictEqual(isUnexpected(result), false);
  });
});
