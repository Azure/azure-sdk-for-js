// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { createRecorder, createContentProvenanceClient } from "./utils/recordedClient.js";
import type { ContentProvenanceClient } from "../../src/index.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("Content Provenance Client Test", () => {
  let recorder: Recorder;
  let client: ContentProvenanceClient;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = createContentProvenanceClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("detect provenance in signed media", async () => {
    const poller = client.detect({
      content: { uri: assertEnvironmentVariable("CONTENT_SAFETY_SIGNED_MEDIA_URI") },
    });
    const result = await poller.pollUntilDone();

    assert.equal(result.outcome, "ProvenanceDetected");
    assert.isNotEmpty(result.results);
    for (const detected of result.results ?? []) {
      assert.oneOf(detected.type, ["C2PA", "Watermark"]);
      assert.isNotEmpty(detected.provider);
      assert.isNotEmpty(detected.modelName);
    }
  });

  it("detect no provenance in unsigned media", async () => {
    const poller = client.detect({
      content: { uri: assertEnvironmentVariable("CONTENT_SAFETY_UNSIGNED_MEDIA_URI") },
    });
    const result = await poller.pollUntilDone();

    assert.equal(result.outcome, "NoProvenanceDetected");
    assert.isEmpty(result.results ?? []);
  });
});
