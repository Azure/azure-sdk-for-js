// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Sample test for toLlmInput.ts.
 *
 * Validates the scenarios in the sample:
 *   1. Output options — fields-only, markdown-only, custom metadata
 *   2. Multi-page PDF with content range — page markers preserve original numbers
 *   3. Multi-segment video — segments separated by '*****', each with timeRange
 *   4. Audio with content range — single segment with custom metadata
 *   5. Preview: AnalysisContent.metadata surfaced as a `metadata:` front-matter block
 *
 * Each test mirrors one section of the sample, exercising the same analyzer,
 * URL, and toLlmInput options used in that section.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import type {
  ContentUnderstandingClient,
  DocumentContent,
  AudioVisualContent,
} from "../../../../src/index.js";
import { toLlmInput } from "../../../../src/index.js";
import { assert, beforeEach, afterEach, it } from "vitest";
import {
  createRecorder,
  createClient,
  testPollingOptions,
  TEST_INVOICE_URL,
  TEST_MULTI_PAGE_DOCUMENT_URL,
  TEST_VIDEO_URL,
  TEST_AUDIO_URL,
  getSampleFilePath,
} from "./sampleTestUtils.js";
import { forEachServiceVersion } from "../../../utils/multiVersion.js";
import fs from "node:fs";

forEachServiceVersion("Sample: toLlmInput", ({ apiVersion }) => {
  let recorder: Recorder;
  let client: ContentUnderstandingClient;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = createClient(recorder, apiVersion);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  // Section 1
  it("should respect output option flags and inject custom metadata", async () => {
    const poller = client.analyze(
      "prebuilt-invoice",
      [{ url: TEST_INVOICE_URL }],
      testPollingOptions,
    );
    const result = await poller.pollUntilDone();

    assert.ok(result?.contents?.length, "Analysis should return contents");
    const content = result.contents[0] as DocumentContent;
    const markdown = content.markdown ?? "";
    assert.ok(markdown.trim().length > 0, "Invoice analysis should return non-empty markdown");
    console.log(`[PASS] Invoice analyzed (${markdown.length} markdown chars)`);

    // Default: fields + markdown
    const defaultText = toLlmInput(result);
    assert.ok(defaultText.startsWith("---"), "Default output should start with YAML front matter");
    assert.ok(defaultText.includes("\n---\n"), "Default output should close YAML front matter");
    assert.ok(
      defaultText.includes("mimeType: application/pdf"),
      "Default output should declare mimeType: application/pdf",
    );
    assert.ok(defaultText.includes("fields:"), "Default output should include 'fields:' block");
    assert.ok(defaultText.includes(markdown), "Default output should include markdown body");
    console.log(`[PASS] Default output: fields + markdown (${defaultText.length} chars)`);

    // Fields-only: includeMarkdown: false
    const fieldsOnly = toLlmInput(result, { includeMarkdown: false });
    assert.ok(
      fieldsOnly.includes("fields:"),
      "Fields-only output should still include 'fields:' block",
    );
    assert.ok(
      !fieldsOnly.includes(markdown),
      "Fields-only output should not contain the markdown body",
    );
    assert.ok(
      fieldsOnly.length < defaultText.length,
      "Fields-only output should be smaller than default",
    );
    console.log(`[PASS] Fields-only output validated (${fieldsOnly.length} chars)`);

    // Markdown-only: includeFields: false
    const markdownOnly = toLlmInput(result, { includeFields: false });
    assert.ok(
      !markdownOnly.includes("fields:"),
      "Markdown-only output should not include a 'fields:' block",
    );
    assert.ok(
      markdownOnly.includes(markdown),
      "Markdown-only output should still include the markdown body",
    );
    console.log(`[PASS] Markdown-only output validated (${markdownOnly.length} chars)`);

    // Custom metadata — nested under `customMetadata:` YAML block
    const withCustomMetadata = toLlmInput(result, {
      customMetadata: { source: "invoice.pdf", department: "finance" },
    });
    assert.ok(
      withCustomMetadata.includes("customMetadata:"),
      "customMetadata: block should appear in front matter",
    );
    assert.ok(
      withCustomMetadata.includes("  source: invoice.pdf"),
      "source key should appear nested under customMetadata",
    );
    assert.ok(
      withCustomMetadata.includes("  department: finance"),
      "department key should appear nested under customMetadata",
    );
    // customMetadata block is injected after mimeType but before fields
    assert.ok(
      withCustomMetadata.indexOf("mimeType: application/pdf") <
        withCustomMetadata.indexOf("customMetadata:"),
      "customMetadata should appear after 'mimeType' in front matter",
    );
    assert.ok(
      withCustomMetadata.indexOf("customMetadata:") < withCustomMetadata.indexOf("fields:"),
      "customMetadata should appear before the 'fields:' block in front matter",
    );
    console.log("[PASS] customMetadata injected into YAML front matter");
  });

  // Section 2
  it("should preserve original page numbers in markers when contentRange is used", async () => {
    const poller = client.analyze(
      "prebuilt-documentSearch",
      [{ url: TEST_MULTI_PAGE_DOCUMENT_URL, contentRange: "2-3,5" }],
      testPollingOptions,
    );
    const result = await poller.pollUntilDone();

    assert.ok(result?.contents?.length, "Analysis should return contents");
    const doc = result.contents[0] as DocumentContent;
    const pageNumbers = (doc.pages ?? []).map((p) => p.pageNumber).sort((a, b) => a - b);
    assert.deepEqual(
      pageNumbers,
      [2, 3, 5],
      `contentRange '2-3,5' should return pages [2, 3, 5], got ${JSON.stringify(pageNumbers)}`,
    );
    console.log(`[PASS] Range analysis returned pages ${JSON.stringify(pageNumbers)}`);

    const text = toLlmInput(result);
    assert.ok(text.startsWith("---"), "Output should start with YAML front matter");
    assert.ok(
      text.includes("mimeType: application/pdf"),
      "Output should declare mimeType: application/pdf",
    );
    // The 'pages' front matter key should reflect the original page numbers (2, 3, 5),
    // compressed by the helper as "2-3, 5" — not renumbered to 1-3 within the range.
    assert.ok(text.includes("pages:"), "Output should include a 'pages' key in front matter");
    assert.ok(
      text.includes("2-3, 5") || text.includes("'2-3, 5'"),
      `'pages' value should be '2-3, 5' (original page numbers preserved). Output:\n${text.slice(0, 500)}`,
    );

    // Page markers in the markdown body should use the original page numbers
    // (<!-- InputPageNumber: 2 -->, <!-- InputPageNumber: 3 -->, <!-- InputPageNumber: 5 -->),
    // not renumbered (1, 2, 3).
    assert(
      !text.includes("<!-- InputPageNumber: 1 -->"),
      "Page marker '<!-- InputPageNumber: 1 -->' should not appear \u2014 we only requested pages 2-3, 5",
    );
    for (const expectedPage of [2, 3, 5]) {
      assert(
        text.includes(`<!-- InputPageNumber: ${expectedPage} -->`),
        `Page marker '<!-- InputPageNumber: ${expectedPage} -->' should appear in the markdown body. Output:\n${text.slice(0, 800)}`,
      );
    }
    console.log(
      "[PASS] Page markers verified: <!-- InputPageNumber: 2 -->, <!-- InputPageNumber: 3 -->, <!-- InputPageNumber: 5 -->",
    );

    console.log(
      `[PASS] toLlmInput output validated (${text.length} chars, pages='2-3, 5' preserved)`,
    );
  });

  // Section 3
  it("should render multi-segment video with per-segment timeRange and divider", async () => {
    const poller = client.analyze(
      "prebuilt-videoSearch",
      [{ url: TEST_VIDEO_URL }],
      testPollingOptions,
    );
    const result = await poller.pollUntilDone();

    assert.ok(result?.contents?.length, "Video analysis should return contents");
    assert.ok(
      result.contents.every((c) => c.kind === "audioVisual"),
      "Video analysis should return audioVisual content",
    );
    const segments = result.contents as AudioVisualContent[];
    const segmentCount = segments.length;
    console.log(`[PASS] Video analyzed: ${segmentCount} segment(s)`);

    const text = toLlmInput(result);
    assert.ok(text.startsWith("---"), "Output should start with YAML front matter");
    assert.ok(
      text.includes("mimeType: video/mp4"),
      "Output should declare mimeType: video/mp4",
    );

    if (segmentCount > 1) {
      const expectedDividers = segmentCount - 1;
      const dividerCount = (text.match(/\*\*\*\*\*/g) ?? []).length;
      assert.equal(
        dividerCount,
        expectedDividers,
        `${segmentCount} segments should produce ${expectedDividers} '*****' dividers, got ${dividerCount}`,
      );
      const timeRangeCount = (text.match(/timeRange:/g) ?? []).length;
      assert.equal(
        timeRangeCount,
        segmentCount,
        `Each of ${segmentCount} segments should declare a 'timeRange', got ${timeRangeCount}`,
      );
      console.log(
        `[PASS] Multi-segment output: ${timeRangeCount} timeRange entries, ${dividerCount} '*****' dividers`,
      );
    } else {
      assert.ok(
        !text.includes("*****"),
        "Single-segment output should not contain '*****' divider",
      );
      console.log("[PASS] Single-segment video output validated");
    }
    console.log(`[PASS] toLlmInput output validated (${text.length} chars)`);
  });

  // Section 4
  it("should handle audio with contentRange and inject metadata", async () => {
    const poller = client.analyze(
      "prebuilt-audioSearch",
      [{ url: TEST_AUDIO_URL, contentRange: "0-10000" }],
      testPollingOptions,
    );
    const result = await poller.pollUntilDone();

    assert.ok(result?.contents?.length, "Audio analysis should return contents");
    assert.ok(
      result.contents.every((c) => c.kind === "audioVisual"),
      "Audio analysis should return audioVisual content",
    );
    console.log(`[PASS] Audio analyzed: ${result.contents.length} segment(s)`);

    const text = toLlmInput(result, {
      customMetadata: { source: "callCenterRecording.mp3" },
    });
    assert.ok(text.startsWith("---"), "Output should start with YAML front matter");
    assert.ok(
      text.includes("mimeType: audio/mpeg"),
      "Output should declare mimeType: audio/mpeg",
    );
    assert.ok(
      text.includes("customMetadata:"),
      "customMetadata: block should appear in front matter",
    );
    assert.ok(
      text.includes("  source: callCenterRecording.mp3"),
      "source key should appear nested under customMetadata",
    );
    assert.ok(
      text.indexOf("mimeType: audio/mpeg") < text.indexOf("customMetadata:"),
      "customMetadata should appear after 'mimeType' in front matter",
    );
    console.log(
      `[PASS] toLlmInput output validated (${text.length} chars, includes source metadata)`,
    );
  });

  // IN FRONT MATTER". Requires the preview API (2026-06-01-preview) and a PDF that exposes
  // embedded metadata. Live-only until a preview recording is captured.
  it(
    "should include AnalysisContent.metadata as a front-matter block (preview)",
    async () => {
      const pdfPath = getSampleFilePath("sample_metadata.pdf");
      if (!fs.existsSync(pdfPath)) {
        console.warn(`Metadata sample PDF not found at ${pdfPath}, skipping test`);
        return;
      }

      const pdfBytes = fs.readFileSync(pdfPath);
      const poller = client.analyzeBinary(
        "prebuilt-layout",
        pdfBytes,
        testPollingOptions,
      );
      const result = await poller.pollUntilDone();

      assert.ok(result?.contents?.length, "Preview metadata analysis should return contents");
      const text = toLlmInput(result);

      assert.ok(text.startsWith("---"), "Output should start with YAML front matter");
      assert.ok(
        text.includes("mimeType: application/pdf"),
        "Output should declare mimeType: application/pdf",
      );
      // When the service returns metadata, toLlmInput renders a "metadata:" block after
      // mimeType and before pages. When metadata is empty, the block is omitted.
      // sample_metadata.pdf is a Contoso Metadata Team fixture with rich embedded
      // metadata (contentType, language, title, etc.) so the block should be present
      // and the metadata block itself should contain `contentType: application/pdf`.
      const doc = result.contents[0] as DocumentContent;
      if (doc.metadata && Object.keys(doc.metadata).length > 0) {
        assert.ok(text.includes("metadata:"), "Output should include a metadata: front-matter key");
        assert.isAbove(
          text.indexOf("metadata:"),
          text.indexOf("mimeType:"),
          "metadata: should appear after mimeType:",
        );
        assert.ok(
          text.includes("contentType: application/pdf"),
          "metadata: block should contain the PDF's own contentType",
        );
      }
      console.log(
        `[PASS] Preview metadata scenario validated (${text.length} chars, ${
          Object.keys(doc.metadata ?? {}).length
        } metadata key(s))`,
      );
    },
  );
});
