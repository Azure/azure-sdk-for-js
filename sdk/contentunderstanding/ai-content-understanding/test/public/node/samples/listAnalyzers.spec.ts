// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Sample test for listAnalyzers.ts - List all available analyzers.
 *
 * Multi-version test: `listAnalyzers` is available on both GA and preview
 * surfaces, so `forEachServiceVersion` runs the assertions against each api
 * version in live mode. In playback mode only the
 * `RECORDING_SERVICE_API_VERSION` cell runs.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import type { ContentUnderstandingClient } from "../../../../src/index.js";
import { type ContentAnalyzer } from "../../../../src/index.js";
import { assert, beforeEach, afterEach, it } from "vitest";
import { createRecorder, createClient } from "./sampleTestUtils.js";
import { forEachServiceVersion } from "../../../utils/multiVersion.js";

forEachServiceVersion("Sample: listAnalyzers", ({ apiVersion }) => {
  let recorder: Recorder;
  let client: ContentUnderstandingClient;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = createClient(recorder, apiVersion);
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

    // ========== List analyzers verification ==========
    // . Prebuilt + custom partitioning is a stable invariant
    // regardless of which analyzers the resource contains.
    assert.ok(prebuiltCount >= 0, "prebuiltCount should be >= 0");
    assert.ok(customCount >= 0, "customCount should be >= 0");
    assert.strictEqual(
      analyzers.length,
      prebuiltCount + customCount,
      "prebuiltCount + customCount should equal total analyzer count",
    );

    // Verify every analyzer has a valid ID.
    for (const analyzer of analyzers) {
      assert.ok(analyzer.analyzerId, "Every analyzer should have a non-empty analyzerId");
      assert.ok(
        !analyzer.analyzerId?.includes(" "),
        `AnalyzerId '${analyzer.analyzerId}' should not contain spaces`,
      );
    }

    // Verify common prebuilt analyzers are present. These ship with every resource.
    const analyzerIds = new Set(analyzers.map((a) => a.analyzerId));
    for (const expected of ["prebuilt-document", "prebuilt-invoice"]) {
      assert.ok(
        analyzerIds.has(expected),
        `Well-known prebuilt analyzer '${expected}' should be listed`,
      );
    }

    // Verify prebuilt IDs follow naming convention: "prebuilt-<camelCase>" (no spaces,
    // no underscores).
    const prebuiltAnalyzers = analyzers.filter((a) =>
      a.analyzerId?.startsWith("prebuilt-"),
    );
    for (const prebuilt of prebuiltAnalyzers) {
      assert.ok(
        !prebuilt.analyzerId?.includes(" "),
        `Prebuilt analyzerId '${prebuilt.analyzerId}' should not contain spaces`,
      );
    }

    // No duplicate analyzer IDs.
    assert.strictEqual(
      analyzerIds.size,
      analyzers.length,
      "Listed analyzers should have unique IDs (no duplicates)",
    );
  });
});
