// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Sample test for getResultFile.ts - Retrieve result files from video analysis.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import type { ContentUnderstandingClient } from "../../../../src/index.js";
import { type AudioVisualContent } from "../../../../src/index.js";
import { assert, describe, beforeEach, afterEach, it } from "vitest";
import {
  createRecorder,
  createClient,
  testPollingOptions,
  isLiveMode,
  TEST_VIDEO_URL,
} from "./sampleTestUtils.js";

describe("Sample: getResultFile", () => {
  let recorder: Recorder;
  let client: ContentUnderstandingClient;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = createClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should retrieve keyframe images from video analysis", async function () {
    // Video analysis takes longer, skip in playback mode
    if (!isLiveMode()) {
      console.log("Skipping video analysis test in playback mode");
      return;
    }

    console.log("Analyzing video with prebuilt-videoSearch...");
    console.log(`URL: ${TEST_VIDEO_URL}`);

    const poller = client.analyze(
      "prebuilt-videoSearch",
      [{ url: TEST_VIDEO_URL }],
      testPollingOptions,
    );

    const result = await poller.pollUntilDone();

    // Get the operation ID

    const operationId = poller.operationState?.operationId;

    console.log(`Operation ID: ${operationId ?? "(unknown)"}`);
    console.log("Analysis completed!");

    assert.ok(result, "Result should not be null");
    assert.ok(result.contents, "Result contents should not be null");

    // ========== Video analysis result verification ==========
    // . Live-only (whole test is gated by isLiveMode()).
    assert.ok(operationId, "Should have operation ID");
    assert.ok(operationId!.length > 0, "Operation ID should have length > 0");
    assert.ok(
      !operationId!.includes(" "),
      "Operation ID should not contain spaces",
    );
    assert.ok(result.contents!.length > 0, "Video analysis should have at least one content");

    const content = result.contents[0];
    // Video analysis always produces audioVisual content.
    assert.strictEqual(
      content.kind,
      "audioVisual",
      "prebuilt-videoSearch should produce audioVisual-kind content",
    );

    // For video analysis, check for audioVisual content
    if (content.kind === "audioVisual") {
      const videoContent = content as AudioVisualContent;

      // Video should always have keyframes.
      assert.ok(
        videoContent.keyFrameTimesMs,
        "Video content should have keyFrameTimesMs",
      );
      assert.ok(
        videoContent.keyFrameTimesMs!.length > 0,
        "Video content should have at least one keyframe",
      );

      // Verify every keyframe time is a non-negative number.
      for (const t of videoContent.keyFrameTimesMs!) {
        assert.ok(
          t >= 0,
          `Keyframe timestamp should be >= 0, but was ${t}`,
        );
      }

      console.log(`Total keyframes: ${videoContent.keyFrameTimesMs!.length}`);
      const firstFrameTimeMs = videoContent.keyFrameTimesMs![0];
      console.log(`First keyframe time: ${firstFrameTimeMs} ms`);
      assert.ok(
        firstFrameTimeMs >= 0,
        `First keyframe time should be >= 0, but was ${firstFrameTimeMs}`,
      );

      // Get the first keyframe as an example
      const framePath = `keyframes/${firstFrameTimeMs}`;
      console.log(`Getting result file: ${framePath}`);

      const imageBytes = await client.getResultFile(operationId!, framePath);
      assert.ok(imageBytes, "Image bytes should not be null");
      assert.ok(imageBytes.length > 0, "Image bytes should not be empty");
      console.log(`Retrieved keyframe image (${imageBytes.length.toLocaleString()} bytes)`);
    }
  });
});
