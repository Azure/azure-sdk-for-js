// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Version-parity tests.
 *
 * Each test explicitly picks a service api version and asserts that the operation
 * actually reaches the wire under that version. Because `forEachServiceVersion`
 * creates a separate recording folder per api-version cell
 * (`_apiversioneq20260601preview` suffix on the non-primary cell), these record
 * and play back cleanly per version.
 *
 * The default-client-uses-preview assertion is covered hermetically in
 * `apiVersionDefault.spec.ts`; this file adds the three tests that require real
 * HTTP traffic:
 *
 * - getDefaults — both versions.
 * - analyzeBinary — GA only (op exists on both versions but this test targets GA).
 * - analyzeInline — preview only (op does not exist on GA).
 */

import type { Recorder } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it } from "vitest";
import type { ContentUnderstandingClient } from "../../../src/index.js";
import { KnownVersions } from "../../../src/index.js";
import { createClient, createRecorder, TEST_INVOICE_URL } from "./samples/sampleTestUtils.js";
import { forEachServiceVersion, gaOnly, previewOnly } from "../../utils/multiVersion.js";

// -----------------------------------------------------------------------------
// getDefaults — both versions.
// -----------------------------------------------------------------------------
forEachServiceVersion("getDefaults across service api versions", ({ apiVersion }) => {
  let recorder: Recorder;
  let client: ContentUnderstandingClient;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = createClient(recorder, apiVersion);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("getDefaults succeeds against the configured api version", async () => {
    const defaults = await client.getDefaults();
    assert.ok(defaults, "getDefaults should return a non-null response for both api versions");
  });
});

// -----------------------------------------------------------------------------
// analyzeBinary — GA only.
// -----------------------------------------------------------------------------
forEachServiceVersion(
  "analyzeBinary on the GA (2025-11-01) api version",
  gaOnly,
  ({ apiVersion }) => {
    let recorder: Recorder;
    let client: ContentUnderstandingClient;

    beforeEach(async (context) => {
      recorder = await createRecorder(context);
      client = createClient(recorder, apiVersion);
      assert.equal(
        apiVersion,
        KnownVersions.V20251101,
        "gaOnly cell should only run under the GA api version",
      );
    });

    afterEach(async () => {
      await recorder.stop();
    });

    it("analyzeBinary completes under the 2025-11-01 GA api version", async () => {
      // The GA surface accepts `prebuilt-documentSearch` (renamed on preview) and
      // returns HTTP 202 + poller. Just verify the poller reaches Succeeded.
      const bytes = new Uint8Array(await (await fetch(TEST_INVOICE_URL)).arrayBuffer());
      const poller = client.analyzeBinary("prebuilt-documentSearch", bytes, {
        contentType: "application/pdf",
      });
      const result = await poller.pollUntilDone();
      assert.ok(result, "analyzeBinary should return a non-null AnalysisResult on GA");
      assert.ok(result.contents?.length, "Result should have at least one content entry");
    });
  },
);

// -----------------------------------------------------------------------------
// analyzeInline — preview only.
// -----------------------------------------------------------------------------
forEachServiceVersion(
  "analyzeInline on the preview (2026-06-01-preview) api version",
  previewOnly,
  ({ apiVersion }) => {
    let recorder: Recorder;
    let client: ContentUnderstandingClient;

    beforeEach(async (context) => {
      recorder = await createRecorder(context);
      client = createClient(recorder, apiVersion);
      assert.equal(
        apiVersion,
        KnownVersions.V20260601Preview,
        "previewOnly cell should only run under the preview api version",
      );
    });

    afterEach(async () => {
      await recorder.stop();
    });

    it("analyzeInline returns AnalysisResult under 2026-06-01-preview", async () => {
      const result = await client.analyzeInline("prebuilt-layout", [{ url: TEST_INVOICE_URL }]);
      assert.ok(result, "analyzeInline should return a non-null AnalysisResult on preview");
      assert.ok(result.contents?.length, "Result should have at least one content entry");
    });
  },
);
