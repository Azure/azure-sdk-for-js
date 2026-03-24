// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Sample test for analyzeUrl.ts - Analyze a document from a URL.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import type {
  ContentUnderstandingClient,
  DocumentContent,
  AudioVisualContent,
} from "../../../../src/index.js";
import { assert, describe, beforeEach, afterEach, it } from "vitest";
import {
  createRecorder,
  createClient,
  testPollingOptions,
  TEST_INVOICE_URL,
  TEST_DOCUMENT_URL,
  TEST_VIDEO_URL,
  TEST_AUDIO_URL,
  TEST_IMAGE_URL,
} from "./sampleTestUtils.js";

describe("Sample: analyzeUrl", () => {
  let recorder: Recorder;
  let client: ContentUnderstandingClient;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = createClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should analyze a document from URL using prebuilt-documentSearch", async () => {
    const poller = client.analyze(
      "prebuilt-documentSearch",
      [{ url: TEST_INVOICE_URL }],
      testPollingOptions,
    );

    const result = await poller.pollUntilDone();

    assert.ok(result, "Analysis result should not be null");
    assert.ok(result.contents, "Result contents should not be null");
    assert.ok(result.contents.length > 0, "Result should have at least one content");
    console.log(`Analysis result contains ${result.contents.length} content(s)`);

    const content = result.contents[0];
    assert.ok(content, "Content should not be null");
    assert.ok(content.markdown, "Markdown content should not be null");

    if (content.kind === "document") {
      const documentContent = content as DocumentContent;
      assert.ok(documentContent.pages, "Pages should not be null");
    }
  });

  it("should analyze a video from URL using prebuilt-videoSearch", async () => {
    const poller = client.analyze(
      "prebuilt-videoSearch",
      [{ url: TEST_VIDEO_URL }],
      testPollingOptions,
    );

    const result = await poller.pollUntilDone();

    assert.ok(result, "Analysis result should not be null");
    assert.ok(result.contents, "Result contents should not be null");
    assert.ok(result.contents.length > 0, "Result should have at least one content");

    const content = result.contents[0];
    assert.equal(content.kind, "audioVisual");
  });

  it("should analyze audio from URL using prebuilt-audioSearch", async () => {
    const poller = client.analyze(
      "prebuilt-audioSearch",
      [{ url: TEST_AUDIO_URL }],
      testPollingOptions,
    );

    const result = await poller.pollUntilDone();

    assert.ok(result, "Analysis result should not be null");
    assert.ok(result.contents, "Result contents should not be null");
    assert.ok(result.contents.length > 0, "Result should have at least one content");

    const content = result.contents[0];
    assert.equal(content.kind, "audioVisual");
  });

  it("should analyze an image from URL using prebuilt-imageSearch", async () => {
    const poller = client.analyze(
      "prebuilt-imageSearch",
      [{ url: TEST_IMAGE_URL }],
      testPollingOptions,
    );

    const result = await poller.pollUntilDone();

    assert.ok(result, "Analysis result should not be null");
    assert.ok(result.contents, "Result contents should not be null");
    assert.ok(result.contents.length > 0, "Result should have at least one content");

    const content = result.contents[0];
    assert.ok(content.markdown, "Markdown content should not be null");
  });

  it("should analyze document URL with content range", async () => {
    // Full analysis for comparison
    const fullPoller = client.analyze(
      "prebuilt-documentSearch",
      [{ url: TEST_DOCUMENT_URL }],
      testPollingOptions,
    );
    const fullResult = await fullPoller.pollUntilDone();
    const fullDoc = fullResult.contents[0] as DocumentContent;
    const fullPageCount = fullDoc.pages ? fullDoc.pages.length : 0;
    assert.equal(fullPageCount, 4, `Full document should return all 4 pages, got ${fullPageCount}`);
    console.log(`Full document: ${fullPageCount} pages, ${(fullDoc.markdown || "").length} chars`);

    // "1" — single page
    console.log("\nAnalyzing page 1 only with content range '1'...");
    const rangePoller = client.analyze(
      "prebuilt-documentSearch",
      [{ url: TEST_DOCUMENT_URL, contentRange: "1" }],
      testPollingOptions,
    );
    const rangeResult = await rangePoller.pollUntilDone();
    const rangeDoc = rangeResult.contents[0] as DocumentContent;
    const rangePageCount = rangeDoc.pages ? rangeDoc.pages.length : 0;
    assert.equal(rangePageCount, 1, `'1' should return only 1 page, got ${rangePageCount}`);
    assert.equal(rangeDoc.startPageNumber, 1, "'1' should start at page 1");
    assert.equal(rangeDoc.endPageNumber, 1, "'1' should end at page 1");

    // Compare full vs range-limited
    assert.ok(
      fullPageCount > rangePageCount,
      `Full document (${fullPageCount} pages) should have more pages than range-limited (${rangePageCount})`,
    );
    assert.ok(
      (fullDoc.markdown || "").length > (rangeDoc.markdown || "").length,
      "Full document markdown should exceed range-limited markdown",
    );
    console.log(`'1': ${rangePageCount} page, ${(rangeDoc.markdown || "").length} chars`);

    // "1-3,5,9-" — combined disjoint page ranges
    // Document has 4 pages, so only pages 1-3 match (no page 5 or 9+)
    console.log("\nAnalyzing combined pages (1-3, 5, 9-) with content range '1-3,5,9-'...");
    const combinePoller = client.analyze(
      "prebuilt-documentSearch",
      [{ url: TEST_DOCUMENT_URL, contentRange: "1-3,5,9-" }],
      testPollingOptions,
    );
    const combineResult = await combinePoller.pollUntilDone();
    const combineDoc = combineResult.contents[0] as DocumentContent;
    const combinePageCount = combineDoc.pages ? combineDoc.pages.length : 0;
    assert.equal(
      combinePageCount,
      3,
      `'1-3,5,9-' should return 3 pages (1-3), got ${combinePageCount}`,
    );
    assert.equal(combineDoc.startPageNumber, 1, "'1-3,5,9-' should start at page 1");
    assert.equal(combineDoc.endPageNumber, 3, "'1-3,5,9-' should end at page 3");
    const actualCombinePages = combineDoc.pages!.map((p) => p.pageNumber).sort((a, b) => a - b);
    assert.deepEqual(actualCombinePages, [1, 2, 3]);
    console.log(`'1-3,5,9-': ${combinePageCount} pages, page numbers: ${actualCombinePages}`);
  });

  it("should analyze video URL with content ranges", async () => {
    // Full analysis for comparison
    const fullPoller = client.analyze(
      "prebuilt-videoSearch",
      [{ url: TEST_VIDEO_URL }],
      testPollingOptions,
    );
    const fullResult = await fullPoller.pollUntilDone();
    assert.ok(fullResult.contents);
    assert.ok(fullResult.contents.length > 0);
    console.log(`Full video: ${fullResult.contents.length} segment(s)`);

    // "0-5000" — first 5 seconds
    console.log("\nAnalyzing first 5 seconds with content range '0-5000'...");
    const rangePoller = client.analyze(
      "prebuilt-videoSearch",
      [{ url: TEST_VIDEO_URL, contentRange: "0-5000" }],
      testPollingOptions,
    );
    const rangeResult = await rangePoller.pollUntilDone();
    assert.ok(rangeResult.contents);
    assert.ok(rangeResult.contents.length > 0, "'0-5000' should return segments");
    for (const content of rangeResult.contents) {
      const av = content as AudioVisualContent;
      assert.ok(
        (av.endTimeMs ?? 0) > (av.startTimeMs ?? 0),
        "Segment should have endTimeMs > startTimeMs",
      );
      assert.ok((av.startTimeMs ?? 0) >= 0, `'0-5000' segment startTimeMs should be >= 0`);
      assert.ok((av.endTimeMs ?? 0) <= 5000, `'0-5000' segment endTimeMs should be <= 5000`);
    }
    console.log(`'0-5000': ${rangeResult.contents.length} segment(s)`);

    // "10000-" — from 10 seconds onward
    console.log("\nAnalyzing from 10 seconds onward with content range '10000-'...");
    const fromPoller = client.analyze(
      "prebuilt-videoSearch",
      [{ url: TEST_VIDEO_URL, contentRange: "10000-" }],
      testPollingOptions,
    );
    const fromResult = await fromPoller.pollUntilDone();
    assert.ok(fromResult.contents);
    assert.ok(fromResult.contents.length > 0, "'10000-' should return segments");
    for (const content of fromResult.contents) {
      const av = content as AudioVisualContent;
      assert.ok(
        (av.endTimeMs ?? 0) > (av.startTimeMs ?? 0),
        "Segment should have endTimeMs > startTimeMs",
      );
      assert.ok(av.markdown, "Segment should have markdown");
      assert.ok((av.startTimeMs ?? 0) >= 10000, `'10000-' segment startTimeMs should be >= 10000`);
    }
    console.log(`'10000-': ${fromResult.contents.length} segment(s)`);

    // "1200-3651" — sub-second precision
    console.log(
      "\nAnalyzing with sub-second precision (1.2s to 3.651s) with content range '1200-3651'...",
    );
    const subsecPoller = client.analyze(
      "prebuilt-videoSearch",
      [{ url: TEST_VIDEO_URL, contentRange: "1200-3651" }],
      testPollingOptions,
    );
    const subsecResult = await subsecPoller.pollUntilDone();
    assert.ok(subsecResult.contents);
    assert.ok(subsecResult.contents.length > 0, "'1200-3651' should return segments");
    for (const content of subsecResult.contents) {
      const av = content as AudioVisualContent;
      assert.ok(
        (av.endTimeMs ?? 0) > (av.startTimeMs ?? 0),
        "Segment should have endTimeMs > startTimeMs",
      );
      assert.ok((av.startTimeMs ?? 0) >= 1200, `'1200-3651' segment startTimeMs should be >= 1200`);
      assert.ok((av.endTimeMs ?? 0) <= 3651, `'1200-3651' segment endTimeMs should be <= 3651`);
    }
    console.log(`'1200-3651': ${subsecResult.contents.length} segment(s)`);

    // "0-3000,30000-" — combined time ranges
    console.log(
      "\nAnalyzing with combined time ranges (0-3s and 30s onward) with content range '0-3000,30000-'...",
    );
    const combinePoller = client.analyze(
      "prebuilt-videoSearch",
      [{ url: TEST_VIDEO_URL, contentRange: "0-3000,30000-" }],
      testPollingOptions,
    );
    const combineResult = await combinePoller.pollUntilDone();
    assert.ok(combineResult.contents);
    assert.ok(combineResult.contents.length > 0, "'0-3000,30000-' should return segments");
    for (const content of combineResult.contents) {
      const av = content as AudioVisualContent;
      assert.ok(
        (av.endTimeMs ?? 0) > (av.startTimeMs ?? 0),
        "Segment should have endTimeMs > startTimeMs",
      );
      assert.ok(av.markdown, "Segment should have markdown");
      const segStart = av.startTimeMs ?? 0;
      const segEnd = av.endTimeMs ?? 0;
      const inFirstRange = segStart >= 0 && segEnd <= 3000;
      const inSecondRange = segStart >= 30000;
      assert.ok(
        inFirstRange || inSecondRange,
        `'0-3000,30000-' segment (${segStart}-${segEnd} ms) should fall within 0-3000 ms or >= 30000 ms`,
      );
    }
    console.log(`'0-3000,30000-': ${combineResult.contents.length} segment(s)`);
  });

  it("should analyze audio URL with content ranges", async () => {
    // Full analysis for comparison
    const fullPoller = client.analyze(
      "prebuilt-audioSearch",
      [{ url: TEST_AUDIO_URL }],
      testPollingOptions,
    );
    const fullResult = await fullPoller.pollUntilDone();
    assert.ok(fullResult.contents);
    const fullAudio = fullResult.contents[0] as AudioVisualContent;
    const fullDuration = (fullAudio.endTimeMs ?? 0) - (fullAudio.startTimeMs ?? 0);
    console.log(`Full audio: ${(fullAudio.markdown || "").length} chars, ${fullDuration} ms`);

    // "0-5000" — first 5 seconds
    console.log("\nAnalyzing first 5 seconds with content range '0-5000'...");
    const rangePoller = client.analyze(
      "prebuilt-audioSearch",
      [{ url: TEST_AUDIO_URL, contentRange: "0-5000" }],
      testPollingOptions,
    );
    const rangeResult = await rangePoller.pollUntilDone();
    assert.ok(rangeResult.contents);
    const rangeAudio = rangeResult.contents[0] as AudioVisualContent;
    assert.ok(
      (rangeAudio.endTimeMs ?? 0) > (rangeAudio.startTimeMs ?? 0),
      "'0-5000' should have endTimeMs > startTimeMs",
    );
    assert.ok((rangeAudio.startTimeMs ?? 0) >= 0, "'0-5000' audio startTimeMs should be >= 0");
    assert.ok((rangeAudio.endTimeMs ?? 0) <= 5000, "'0-5000' audio endTimeMs should be <= 5000");
    assert.ok(rangeAudio.markdown, "'0-5000' should have markdown");
    assert.ok(rangeAudio.markdown!.length > 0, "'0-5000' markdown should not be empty");
    const rangeDuration = (rangeAudio.endTimeMs ?? 0) - (rangeAudio.startTimeMs ?? 0);
    assert.ok(
      fullDuration >= rangeDuration,
      `Full audio duration (${fullDuration} ms) should be >= range-limited duration (${rangeDuration} ms)`,
    );
    console.log(`'0-5000': ${rangeAudio.markdown!.length} chars, ${rangeDuration} ms`);

    // "10000-" — from 10 seconds onward
    console.log("\nAnalyzing audio from 10 seconds onward with content range '10000-'...");
    const fromPoller = client.analyze(
      "prebuilt-audioSearch",
      [{ url: TEST_AUDIO_URL, contentRange: "10000-" }],
      testPollingOptions,
    );
    const fromResult = await fromPoller.pollUntilDone();
    assert.ok(fromResult.contents);
    const fromAudio = fromResult.contents[0] as AudioVisualContent;
    assert.ok(
      (fromAudio.endTimeMs ?? 0) > (fromAudio.startTimeMs ?? 0),
      "'10000-' should have endTimeMs > startTimeMs",
    );
    assert.ok(
      (fromAudio.startTimeMs ?? 0) >= 10000,
      "'10000-' audio startTimeMs should be >= 10000",
    );
    assert.ok(fromAudio.markdown, "'10000-' should have markdown");
    console.log(`'10000-': ${fromAudio.markdown!.length} chars`);

    // "1200-3651" — sub-second precision
    console.log(
      "\nAnalyzing audio with sub-second precision (1.2s to 3.651s) with content range '1200-3651'...",
    );
    const subsecPoller = client.analyze(
      "prebuilt-audioSearch",
      [{ url: TEST_AUDIO_URL, contentRange: "1200-3651" }],
      testPollingOptions,
    );
    const subsecResult = await subsecPoller.pollUntilDone();
    assert.ok(subsecResult.contents);
    const subsecAudio = subsecResult.contents[0] as AudioVisualContent;
    assert.ok(
      (subsecAudio.endTimeMs ?? 0) > (subsecAudio.startTimeMs ?? 0),
      "'1200-3651' should have endTimeMs > startTimeMs",
    );
    assert.ok(
      (subsecAudio.startTimeMs ?? 0) >= 1200,
      "'1200-3651' audio startTimeMs should be >= 1200",
    );
    assert.ok(
      (subsecAudio.endTimeMs ?? 0) <= 3651,
      "'1200-3651' audio endTimeMs should be <= 3651",
    );
    assert.ok(subsecAudio.markdown, "'1200-3651' should have markdown");
    assert.ok(subsecAudio.markdown!.length > 0, "'1200-3651' markdown should not be empty");
    const subsecDuration = (subsecAudio.endTimeMs ?? 0) - (subsecAudio.startTimeMs ?? 0);
    assert.ok(
      fullDuration >= subsecDuration,
      `Full audio duration (${fullDuration} ms) should be >= sub-second duration (${subsecDuration} ms)`,
    );
    console.log(`'1200-3651': ${subsecAudio.markdown!.length} chars, ${subsecDuration} ms`);

    // "0-3000,30000-" — combined time ranges
    console.log(
      "\nAnalyzing audio with combined time ranges (0-3s and 30s onward) with content range '0-3000,30000-'...",
    );
    const combinePoller = client.analyze(
      "prebuilt-audioSearch",
      [{ url: TEST_AUDIO_URL, contentRange: "0-3000,30000-" }],
      testPollingOptions,
    );
    const combineResult = await combinePoller.pollUntilDone();
    assert.ok(combineResult.contents);
    const combineAudio = combineResult.contents[0] as AudioVisualContent;
    assert.ok(
      (combineAudio.endTimeMs ?? 0) > (combineAudio.startTimeMs ?? 0),
      "'0-3000,30000-' should have endTimeMs > startTimeMs",
    );
    assert.ok(combineAudio.markdown, "'0-3000,30000-' should have markdown");
    console.log(`'0-3000,30000-': ${combineAudio.markdown!.length} chars`);
  });
});
