// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Analyze content from URLs across modalities (Document, Video, Audio, Image).
 *
 * This sample demonstrates how to analyze content from publicly accessible URLs using
 * prebuilt RAG analyzers:
 * - prebuilt-documentSearch: For documents
 * - prebuilt-videoSearch: For videos
 * - prebuilt-audioSearch: For audio
 * - prebuilt-imageSearch: For images
 */

require("dotenv/config");
const { DefaultAzureCredential } = require("@azure/identity");
const { AzureKeyCredential } = require("@azure/core-auth");
const { ContentUnderstandingClient } = require("@azure/ai-content-understanding");

function getCredential() {
  const key = process.env["CONTENTUNDERSTANDING_KEY"];
  if (key) {
    return new AzureKeyCredential(key);
  }
  return new DefaultAzureCredential();
}

async function main() {
  console.log("== Analyze URL Sample ==");

  const endpoint = process.env["CONTENTUNDERSTANDING_ENDPOINT"];
  if (!endpoint) {
    throw new Error("CONTENTUNDERSTANDING_ENDPOINT is required.");
  }

  const client = new ContentUnderstandingClient(endpoint, getCredential());

  // 1. Analyze Document from URL
  await analyzeDocument(client);

  // 2. Analyze Video from URL
  await analyzeVideo(client);

  // 3. Analyze Audio from URL
  await analyzeAudio(client);

  // 4. Analyze Image from URL
  await analyzeImage(client);
}

async function analyzeDocument(client) {
  const documentUrl =
    "https://raw.githubusercontent.com/Azure-Samples/azure-ai-content-understanding-assets/main/document/invoice.pdf";

  console.log("\n--- Analyzing Document from URL ---");
  console.log(`URL: ${documentUrl}`);

  const poller = client.analyze("prebuilt-documentSearch", [{ url: documentUrl }]);
  const result = await poller.pollUntilDone();

  if (result.contents && result.contents.length > 0) {
    const content = result.contents[0];
    console.log("Markdown:");
    console.log(content.markdown);

    if (content.kind === "document") {
      const documentContent = content;
      console.log(`Pages: ${documentContent.startPageNumber} - ${documentContent.endPageNumber}`);

      if (documentContent.pages && documentContent.pages.length > 0) {
        console.log(`Number of pages: ${documentContent.pages.length}`);
        for (const page of documentContent.pages) {
          const unit = documentContent.unit ?? "units";
          console.log(`  Page ${page.pageNumber}: ${page.width} x ${page.height} ${unit}`);
        }
      }
    }
  }
}

async function analyzeVideo(client) {
  const videoUrl =
    "https://raw.githubusercontent.com/Azure-Samples/azure-ai-content-understanding-assets/main/videos/sdk_samples/FlightSimulator.mp4";

  console.log("\n--- Analyzing Video from URL ---");
  console.log(`URL: ${videoUrl}`);

  const poller = client.analyze("prebuilt-videoSearch", [{ url: videoUrl }]);
  const result = await poller.pollUntilDone();

  if (result.contents) {
    let segmentIndex = 1;
    for (const content of result.contents) {
      if (content.kind === "audioVisual") {
        const videoContent = content;
        console.log(`--- Segment ${segmentIndex} ---`);
        console.log("Markdown:");
        console.log(videoContent.markdown);

        const summary = videoContent.fields?.["Summary"]?.value ?? "";
        console.log(`Summary: ${summary}`);

        console.log(`Start: ${videoContent.startTimeMs} ms, End: ${videoContent.endTimeMs} ms`);
        console.log(`Frame size: ${videoContent.width} x ${videoContent.height}`);
        console.log("---------------------");
        segmentIndex++;
      }
    }
  }
}

async function analyzeAudio(client) {
  const audioUrl =
    "https://raw.githubusercontent.com/Azure-Samples/azure-ai-content-understanding-assets/main/audio/callCenterRecording.mp3";

  console.log("\n--- Analyzing Audio from URL ---");
  console.log(`URL: ${audioUrl}`);

  const poller = client.analyze("prebuilt-audioSearch", [{ url: audioUrl }]);
  const result = await poller.pollUntilDone();

  if (result.contents && result.contents.length > 0) {
    const content = result.contents[0];
    if (content.kind === "audioVisual") {
      const audioContent = content;
      console.log("Markdown:");
      console.log(audioContent.markdown);

      const summary = audioContent.fields?.["Summary"]?.value ?? "";
      console.log(`Summary: ${summary}`);

      if (audioContent.transcriptPhrases && audioContent.transcriptPhrases.length > 0) {
        console.log("Transcript (first two phrases):");
        for (const phrase of audioContent.transcriptPhrases.slice(0, 2)) {
          console.log(`  [${phrase.speaker}] ${phrase.startTimeMs} ms: ${phrase.text}`);
        }
      }
    }
  }
}

async function analyzeImage(client) {
  const imageUrl =
    "https://raw.githubusercontent.com/Azure-Samples/azure-ai-content-understanding-assets/main/image/pieChart.jpg";

  console.log("\n--- Analyzing Image from URL ---");
  console.log(`URL: ${imageUrl}`);

  const poller = client.analyze("prebuilt-imageSearch", [{ url: imageUrl }]);
  const result = await poller.pollUntilDone();

  if (result.contents && result.contents.length > 0) {
    const content = result.contents[0];
    console.log("Markdown:");
    console.log(content.markdown);

    const summary = content.fields?.["Summary"]?.value ?? "";
    console.log(`Summary: ${summary}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
