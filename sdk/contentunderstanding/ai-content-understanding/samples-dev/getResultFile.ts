// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Retrieve result files (such as keyframe images) from a video analysis operation.
 *
 * This sample demonstrates how to retrieve result files (such as keyframe images) from a
 * video analysis operation using the getResultFile API.
 *
 * When analyzing video content, the Content Understanding service can generate result files:
 * - Keyframe images: Extracted frames from the video at specific timestamps
 * - Other result files: Additional files generated during analysis
 *
 * The getResultFile API allows you to retrieve these files using:
 * - Operation ID: Extracted from the analysis operation
 * - File path: The path to the specific result file (e.g., "keyframes/{frameTimeMs}")
 *
 * @azsdk-weight 79
 */

import "dotenv/config";
import * as fs from "fs";
import * as path from "path";
import { DefaultAzureCredential } from "@azure/identity";
import { AzureKeyCredential } from "@azure/core-auth";
import { ContentUnderstandingClient } from "@azure/ai-content-understanding";
import type { AudioVisualContent } from "@azure/ai-content-understanding";

function getCredential(): DefaultAzureCredential | AzureKeyCredential {
  const key = process.env["CONTENTUNDERSTANDING_KEY"];
  if (key) {
    return new AzureKeyCredential(key);
  }
  return new DefaultAzureCredential();
}

export async function main(): Promise<void> {
  console.log("== Get Result File Sample ==");

  const endpoint = process.env["CONTENTUNDERSTANDING_ENDPOINT"];
  if (!endpoint) {
    throw new Error("CONTENTUNDERSTANDING_ENDPOINT is required.");
  }

  const client = new ContentUnderstandingClient(endpoint, getCredential());

  // Use a sample video URL
  const videoUrl =
    "https://github.com/Azure-Samples/azure-ai-content-understanding-assets/raw/refs/heads/main/videos/sdk_samples/FlightSimulator.mp4";

  console.log("Analyzing video with prebuilt-videoSearch...");
  console.log(`  URL: ${videoUrl}`);

  // Start the analysis operation
  const poller = client.analyze("prebuilt-videoSearch", [{ url: videoUrl }]);

  // Get the operation ID from the poller state
  // We need to wait for at least one poll to get the operation location
  const result = await poller.pollUntilDone();
  const operationId = poller.operationId;

  console.log(`  Operation ID: ${operationId ?? "(unknown)"}`);
  console.log("  Analysis completed!");

  if (!result.contents || result.contents.length === 0) {
    console.log("No content found in the analysis result.");
    return;
  }

  const content = result.contents[0];

  // For video analysis, keyframes would be found in AudioVisualContent.keyFrameTimesMs
  if (content.kind === "audioVisual") {
    const videoContent = content as AudioVisualContent;

    if (videoContent.keyFrameTimesMs && videoContent.keyFrameTimesMs.length > 0) {
      const totalKeyframes = videoContent.keyFrameTimesMs.length;
      const firstFrameTimeMs = videoContent.keyFrameTimesMs[0];

      console.log(`\nTotal keyframes: ${totalKeyframes}`);
      console.log(`First keyframe time: ${firstFrameTimeMs} ms`);

      if (operationId) {
        // Get the first keyframe as an example
        const framePath = `keyframes/${firstFrameTimeMs}`;
        console.log(`Getting result file: ${framePath}`);

        // Get the result file (keyframe image)
        const imageBytes = await client.getResultFile(operationId, framePath);
        console.log(`Retrieved keyframe image (${imageBytes.length.toLocaleString()} bytes)`);

        // Save the keyframe image to sample-output directory
        const outputDir = path.resolve(".", "sample-output");

        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }

        const outputFilename = `keyframe_${firstFrameTimeMs}.jpg`;
        const outputPath = path.join(outputDir, outputFilename);

        fs.writeFileSync(outputPath, imageBytes);
        console.log(`Keyframe image saved to: ${outputPath}`);
      } else {
        console.log("Could not extract operation ID to retrieve result files.");
      }
    } else {
      console.log("\nNo keyframes found in the video analysis.");
      console.log("Note: This sample demonstrates GetResultFile API usage.");
      console.log("      For video analysis with keyframes, use prebuilt-videoSearch analyzer.");
      console.log("      Keyframes are available in AudioVisualContent.keyFrameTimesMs.");
    }
  } else {
    console.log("\nContent is not audio/visual type.");
    console.log(`Content kind: ${content.kind}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
