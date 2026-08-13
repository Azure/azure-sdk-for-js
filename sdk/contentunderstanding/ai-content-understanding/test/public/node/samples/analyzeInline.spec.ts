// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Sample test for analyzeInline.ts - Analyze a URL via the inline (non-LRO,
 * HTTP 200) preview endpoint.
 *
 * Preview-only feature: `analyzeInline` only exists on the `2026-06-01-preview`
 * surface. Wrapped in `forEachServiceVersion({ previewOnly: true })` so the GA
 * cell is skipped by preview-only service-version scoping.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import type { ContentUnderstandingClient, DocumentContent } from "../../../../src/index.js";
import { assert, beforeEach, afterEach, it } from "vitest";
import { createRecorder, createClient, TEST_INVOICE_URL } from "./sampleTestUtils.js";
import { forEachServiceVersion, previewOnly } from "../../../utils/multiVersion.js";

forEachServiceVersion("Sample: analyzeInline", previewOnly, ({ apiVersion }) => {
  let recorder: Recorder;
  let client: ContentUnderstandingClient;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = createClient(recorder, apiVersion);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should analyze a URL inline with prebuilt-layout", async () => {
    const result = await client.analyzeInline("prebuilt-layout", [{ url: TEST_INVOICE_URL }]);

    assert.ok(result, "Analysis result should not be null");
    assert.ok(result.contents, "Result contents should not be null");
    assert.ok(result.contents.length > 0, "Result should have at least one content");

    // Verify the request actually reached the preview service surface — the test framework
    // passes `apiVersion` to `createClient` explicitly. If this assertion fails, either the
    // client did not route to preview or the recording drifted between versions.
    assert.strictEqual(
      result.apiVersion,
      apiVersion,
      "analyzeInline result should carry the api version the client was configured with",
    );

    // ========== Inline analysis verification ==========
    const content = result.contents[0];
    assert.strictEqual(
      content.kind,
      "document",
      "prebuilt-layout on a PDF URL should produce document-kind content",
    );
    if (content.kind === "document") {
      const doc = content as DocumentContent;
      assert.ok(doc.markdown, "Document should have markdown content");
      assert.ok(doc.markdown!.length > 0, "Inline markdown should not be empty");
    }

    // Usage metering assertions verify inline analysis bills the inline-specific meter.
    // Inline analysis bills documentPagesStandardInline, not the LRO meter.
    const usage = result.usage;
    if (usage) {
      assert.ok(
        usage.documentPagesStandardInline !== undefined &&
          usage.documentPagesStandardInline !== null,
        "prebuilt-layout inline should bill documentPagesStandardInline",
      );
      assert.ok(
        (usage.documentPagesStandardInline ?? 0) > 0,
        "documentPagesStandardInline meter should be positive",
      );
      // LRO meter should not be set for inline results.
      assert.ok(
        usage.documentPagesStandard === undefined || usage.documentPagesStandard === null,
        "LRO documentPagesStandard should not be set for inline analyze",
      );
      // prebuilt-layout should not bill the minimal / basic inline meters.
      assert.ok(
        usage.documentPagesMinimalInline === undefined ||
          usage.documentPagesMinimalInline === null,
        "prebuilt-layout should not bill the minimal inline meter",
      );
      assert.ok(
        usage.documentPagesBasicInline === undefined ||
          usage.documentPagesBasicInline === null,
        "prebuilt-layout should not bill the basic inline meter",
      );
    }
  });
});
