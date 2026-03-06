// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Sample test for analyzeUrl.ts - Analyze a document from a URL.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import type { ContentUnderstandingClient } from "../../../../src/index.js";
import { type DocumentContent } from "../../../../src/index.js";
import { assert, describe, beforeEach, afterEach, it } from "vitest";
import {
  createRecorder,
  createClient,
  testPollingOptions,
  TEST_INVOICE_URL,
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
    // Use the analyze method with inputs containing the URL
    const poller = client.analyze(
      "prebuilt-documentSearch",
      [{ url: TEST_INVOICE_URL }],
      testPollingOptions,
    );

    const result = await poller.pollUntilDone();

    // Assertions: Verify operation completed
    assert.ok(result, "Analysis result should not be null");
    assert.ok(result.contents, "Result contents should not be null");
    assert.ok(result.contents.length > 0, "Result should have at least one content");
    console.log(`Analysis result contains ${result.contents.length} content(s)`);

    // Verify content structure
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
});
