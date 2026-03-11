// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Sample test for getResultFile.ts - Retrieve result files from video analysis.
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

    const operationId = poller.operationId;

    console.log(`Operation ID: ${operationId ?? "(unknown)"}`);
    console.log("Analysis completed!");

    assert.ok(result, "Result should not be null");
    assert.ok(result.contents, "Result contents should not be null");

    if (result.contents.length > 0) {
      const content = result.contents[0];

      // For video analysis, check for audioVisual content
      if (content.kind === "audioVisual") {
        const videoContent = content as AudioVisualContent;

        if (videoContent.keyFrameTimesMs && videoContent.keyFrameTimesMs.length > 0) {
          console.log(`Total keyframes: ${videoContent.keyFrameTimesMs.length}`);
          const firstFrameTimeMs = videoContent.keyFrameTimesMs[0];
          console.log(`First keyframe time: ${firstFrameTimeMs} ms`);

          if (operationId) {
            // Get the first keyframe as an example
            const framePath = `keyframes/${firstFrameTimeMs}`;
            console.log(`Getting result file: ${framePath}`);

            const imageBytes = await client.getResultFile(operationId, framePath);
            assert.ok(imageBytes, "Image bytes should not be null");
            assert.ok(imageBytes.length > 0, "Image bytes should not be empty");
            console.log(`Retrieved keyframe image (${imageBytes.length.toLocaleString()} bytes)`);
          }
        }
      }
    }
  });
});
