// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Sample test for listAnalyzers.ts - List all available analyzers.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import type { ContentUnderstandingClient } from "../../../../src/index.js";
import { type ContentAnalyzer } from "../../../../src/index.js";
import { assert, describe, beforeEach, afterEach, it } from "vitest";
import { createRecorder, createClient } from "./sampleTestUtils.js";

describe("Sample: listAnalyzers", () => {
  let recorder: Recorder;
  let client: ContentUnderstandingClient;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = createClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should list all available analyzers", async () => {
    // List all analyzers
    const analyzers: ContentAnalyzer[] = [];
    for await (const analyzer of client.listAnalyzers()) {
      analyzers.push(analyzer);
    }

    // Assertions
    assert.ok(analyzers.length > 0, "Should have at least one analyzer");
    console.log(`Found ${analyzers.length} analyzer(s)`);

    // Count prebuilt vs custom analyzers
    const prebuiltCount = analyzers.filter(
      (a) => a.analyzerId && a.analyzerId.startsWith("prebuilt-"),
    ).length;
    const customCount = analyzers.length - prebuiltCount;
    console.log(`Prebuilt analyzers: ${prebuiltCount}`);
    console.log(`Custom analyzers: ${customCount}`);

    // Verify at least some prebuilt analyzers exist
    assert.ok(prebuiltCount > 0, "Should have at least one prebuilt analyzer");
  });
});
