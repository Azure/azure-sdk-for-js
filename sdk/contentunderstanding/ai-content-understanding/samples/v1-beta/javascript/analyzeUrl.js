// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Analyze content from URLs across modalities.
 *
 * Another great value of Content Understanding is its rich set of prebuilt analyzers. Great
 * examples of these are the RAG analyzers that work for all modalities
 * (`prebuilt-documentSearch`, `prebuilt-imageSearch`, `prebuilt-audioSearch`, and
 * `prebuilt-videoSearch`). For brief descriptions of these RAG analyzers, see the "Prebuilt
 * analyzers" section in analyzeBinary.ts. This sample demonstrates these RAG analyzers.
 * Many more prebuilt analyzers are available (for example, `prebuilt-invoice`); see the
 * invoice sample or the prebuilt analyzer documentation to explore the full list.
 *
 * ## About analyzing URLs across modalities
 *
 * Content Understanding supports both local binary inputs (see analyzeBinary.ts) and URL
 * inputs across all modalities. This sample focuses on prebuilt RAG analyzers (the
 * `prebuilt-*Search` analyzers, such as `prebuilt-documentSearch`) with URL inputs.
 *
 * **Important**: For URL inputs, use `analyze()` with `AnalysisInput` objects that wrap the
 * URL. For binary data (local files), use `analyzeBinary()` instead. This sample demonstrates
 * `analyze()` with URL inputs.
 *
 * Documents, HTML, and images with text are returned as `DocumentContent` (derived from
 * `AnalysisContent`), while audio and video are returned as `AudioVisualContent` (also
 * derived from `AnalysisContent`). These prebuilt RAG analyzers return markdown and a
 * one-paragraph summary for each content item; `prebuilt-videoSearch` can return multiple
 * segments, so iterate over all contents rather than just the first.
 *
 * It also demonstrates content range usage with plain strings:
 * - Document: `"1"`, `"1-3"`, `"3-"`, `"1-3,5,9-"`
 * - Video/Audio: `"0-5000"`, `"10000-"`, `"1200-3651"`, `"0-3000,30000-"`
 *
 * ## `analyze` vs `analyzeInline`
 *
 * `analyzeInline` is available only in `2026-06-01-preview`.
 *
 * - Use `analyze` (LRO) for larger files/pages (see
 *   [document limits](https://aka.ms/cu-doc-limits)), broader analyzer coverage, and results
 *   retained for up to **24 hours** (or until deleted).
 * - Use `analyzeInline` (available only in `2026-06-01-preview`) for a single request/response
 *   with no polling on smaller inputs. With no polling and no wait tied to a polling interval,
 *   the inline path is faster than the corresponding `analyze*` LRO APIs under the inline
 *   size/analyzer limits. Results are not persisted. In this preview, inline supports
 *   document analyzers without field schemas and without figure analysis enabled:
 *   `prebuilt-digitalParse`, `prebuilt-read`, `prebuilt-layout`, or custom document analyzers
 *   without fields.
 *
 * For current limits, see https://aka.ms/cu-doc-limits. For a dedicated inline example,
 * see [analyzeInline.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/contentunderstanding/ai-content-understanding/samples/v1-beta/typescript/src/analyzeInline.ts).
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

  // 1. Analyze Document from URL (with content range examples)
  await analyzeDocument(client);

  // 2. Analyze Video from URL (with content range examples)
  await analyzeVideo(client);

  // 3. Analyze Audio from URL (with content range examples)
  await analyzeAudio(client);

  // 4. Analyze Image from URL
  await analyzeImage(client);
}

async function analyzeDocument(client) {
  // ========================================================================
  // DOCUMENT ANALYSIS FROM URL
  // ========================================================================
  const documentUrl =
    "https://raw.githubusercontent.com/Azure-Samples/azure-ai-content-understanding-assets/main/document/mixed_financial_docs.pdf";

  console.log("=".repeat(60));
  console.log("DOCUMENT ANALYSIS FROM URL");
  console.log("=".repeat(60));
  console.log(`Analyzing document from URL with prebuilt-documentSearch...`);
  console.log(`  URL: ${documentUrl}`);

  const docPoller = client.analyze("prebuilt-documentSearch", [{ url: documentUrl }]);
  const docResult = await docPoller.pollUntilDone();

  // Extract markdown content
  if (docResult.contents && docResult.contents.length > 0) {
    const content = docResult.contents[0];
    console.log("\nMarkdown:");
    console.log(content.markdown);

    if (content.kind === "document") {
      const documentContent = content;
      console.log(`\nPages: ${documentContent.startPageNumber} - ${documentContent.endPageNumber}`);

      if (documentContent.pages && documentContent.pages.length > 0) {
        console.log(`Number of pages: ${documentContent.pages.length}`);
        for (const page of documentContent.pages) {
          const unit = documentContent.unit ?? "units";
          console.log(`  Page ${page.pageNumber}: ${page.width} x ${page.height} ${unit}`);
        }
      }
    }
  }

  // Restrict to specific pages with a content range string.
  // Use a multi-page document to demonstrate content range filtering.
  const multiPageDocumentUrl =
    "https://raw.githubusercontent.com/Azure-Samples/azure-ai-content-understanding-assets/main/document/mixed_financial_invoices.pdf";

  // Extract only page 1 of the document.
  console.log('\nAnalyzing page 1 only with content range "1"...');
  const rangeDocPoller = client.analyze("prebuilt-documentSearch", [
    {
      url: multiPageDocumentUrl,
      contentRange: "1",
    },
  ]);
  const rangeDocResult = await rangeDocPoller.pollUntilDone();
  if (rangeDocResult.contents && rangeDocResult.contents.length > 0) {
    const doc = rangeDocResult.contents[0];
    console.log(
      `  Content range analysis returned pages ${doc.startPageNumber} - ${doc.endPageNumber}`,
    );
  }

  // Combine multiple page ranges: pages 1-3, page 5, and pages 9 onward.
  console.log('\nAnalyzing combined page ranges with content range "1-3,5,9-"...');
  const combineDocPoller = client.analyze("prebuilt-documentSearch", [
    {
      url: multiPageDocumentUrl,
      contentRange: "1-3,5,9-",
    },
  ]);
  const combineDocResult = await combineDocPoller.pollUntilDone();
  if (combineDocResult.contents && combineDocResult.contents.length > 0) {
    const doc = combineDocResult.contents[0];
    console.log(
      `  Combined range analysis returned pages ${doc.startPageNumber} - ${doc.endPageNumber}`,
    );
  }
}

async function analyzeVideo(client) {
  // ========================================================================
  // VIDEO ANALYSIS FROM URL
  // ========================================================================
  const videoUrl =
    "https://raw.githubusercontent.com/Azure-Samples/azure-ai-content-understanding-assets/main/videos/sdk_samples/FlightSimulator.mp4";

  console.log("\n" + "=".repeat(60));
  console.log("VIDEO ANALYSIS FROM URL");
  console.log("=".repeat(60));
  console.log(`Analyzing video from URL with prebuilt-videoSearch...`);
  console.log(`  URL: ${videoUrl}`);

  const videoPoller = client.analyze("prebuilt-videoSearch", [{ url: videoUrl }]);
  const videoResult = await videoPoller.pollUntilDone();

  if (videoResult.contents) {
    let segmentIndex = 1;
    for (const content of videoResult.contents) {
      if (content.kind === "audioVisual") {
        const videoContent = content;
        console.log(`\n--- Segment ${segmentIndex} ---`);
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

  // Content range examples for video (time ranges use milliseconds):

  // "0-5000" — first 5 seconds
  console.log('\nAnalyzing first 5 seconds of video with content range "0-5000"...');
  const videoRangePoller = client.analyze("prebuilt-videoSearch", [
    { url: videoUrl, contentRange: "0-5000" },
  ]);
  const videoRangeResult = await videoRangePoller.pollUntilDone();
  if (videoRangeResult.contents) {
    for (const content of videoRangeResult.contents) {
      const av = content;
      console.log(`  Content range segment: ${av.startTimeMs} ms - ${av.endTimeMs} ms`);
    }
  }

  // "10000-" — from 10 seconds onward
  console.log('\nAnalyzing video from 10 seconds onward with content range "10000-"...');
  const videoFromPoller = client.analyze("prebuilt-videoSearch", [
    { url: videoUrl, contentRange: "10000-" },
  ]);
  const videoFromResult = await videoFromPoller.pollUntilDone();
  if (videoFromResult.contents) {
    for (const content of videoFromResult.contents) {
      const av = content;
      console.log(`  '10000-' segment: ${av.startTimeMs} ms - ${av.endTimeMs} ms`);
    }
  }

  // "1200-3651" — sub-second precision (1.2s to 3.651s)
  console.log(
    '\nAnalyzing video with sub-second precision (1.2s to 3.651s) with content range "1200-3651"...',
  );
  const videoSubSecPoller = client.analyze("prebuilt-videoSearch", [
    { url: videoUrl, contentRange: "1200-3651" },
  ]);
  const videoSubSecResult = await videoSubSecPoller.pollUntilDone();
  if (videoSubSecResult.contents) {
    for (const content of videoSubSecResult.contents) {
      const av = content;
      console.log(`  '1200-3651' segment: ${av.startTimeMs} ms - ${av.endTimeMs} ms`);
    }
  }

  // "0-3000,30000-" — multiple disjoint time ranges (0-3s and 30s onward)
  console.log(
    '\nAnalyzing video with combined time ranges (0-3s and 30s onward) with content range "0-3000,30000-"...',
  );
  const videoCombinePoller = client.analyze("prebuilt-videoSearch", [
    { url: videoUrl, contentRange: "0-3000,30000-" },
  ]);
  const videoCombineResult = await videoCombinePoller.pollUntilDone();
  if (videoCombineResult.contents) {
    for (const content of videoCombineResult.contents) {
      const av = content;
      console.log(`  '0-3000,30000-' segment: ${av.startTimeMs} ms - ${av.endTimeMs} ms`);
    }
  }
}

async function analyzeAudio(client) {
  // ========================================================================
  // AUDIO ANALYSIS FROM URL
  // ========================================================================
  const audioUrl =
    "https://raw.githubusercontent.com/Azure-Samples/azure-ai-content-understanding-assets/main/audio/callCenterRecording.mp3";

  console.log("\n" + "=".repeat(60));
  console.log("AUDIO ANALYSIS FROM URL");
  console.log("=".repeat(60));
  console.log(`Analyzing audio from URL with prebuilt-audioSearch...`);
  console.log(`  URL: ${audioUrl}`);

  const audioPoller = client.analyze("prebuilt-audioSearch", [{ url: audioUrl }]);
  const audioResult = await audioPoller.pollUntilDone();

  if (audioResult.contents && audioResult.contents.length > 0) {
    const content = audioResult.contents[0];
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

  // Content range examples for audio (same 4 canonical patterns as video):

  // "0-5000" — first 5 seconds
  console.log('\nAnalyzing first 5 seconds of audio with content range "0-5000"...');
  const audioRangePoller = client.analyze("prebuilt-audioSearch", [
    { url: audioUrl, contentRange: "0-5000" },
  ]);
  const audioRangeResult = await audioRangePoller.pollUntilDone();
  if (audioRangeResult.contents && audioRangeResult.contents.length > 0) {
    const av = audioRangeResult.contents[0];
    console.log(`  Content range audio segment: ${av.startTimeMs} ms - ${av.endTimeMs} ms`);
  }

  // "10000-" — from 10 seconds onward
  console.log('\nAnalyzing audio from 10 seconds onward with content range "10000-"...');
  const audioFromPoller = client.analyze("prebuilt-audioSearch", [
    { url: audioUrl, contentRange: "10000-" },
  ]);
  const audioFromResult = await audioFromPoller.pollUntilDone();
  if (audioFromResult.contents && audioFromResult.contents.length > 0) {
    const av = audioFromResult.contents[0];
    console.log(`  '10000-': ${av.startTimeMs} ms - ${av.endTimeMs} ms`);
  }

  // "1200-3651" — sub-second precision (1.2s to 3.651s)
  console.log(
    '\nAnalyzing audio with sub-second precision (1.2s to 3.651s) with content range "1200-3651"...',
  );
  const audioSubSecPoller = client.analyze("prebuilt-audioSearch", [
    { url: audioUrl, contentRange: "1200-3651" },
  ]);
  const audioSubSecResult = await audioSubSecPoller.pollUntilDone();
  if (audioSubSecResult.contents && audioSubSecResult.contents.length > 0) {
    const av = audioSubSecResult.contents[0];
    console.log(`  '1200-3651': ${av.startTimeMs} ms - ${av.endTimeMs} ms`);
  }

  // "0-3000,30000-" — multiple disjoint time ranges (0-3s and 30s onward)
  console.log(
    '\nAnalyzing audio with combined time ranges (0-3s and 30s onward) with content range "0-3000,30000-"...',
  );
  const audioCombinePoller = client.analyze("prebuilt-audioSearch", [
    { url: audioUrl, contentRange: "0-3000,30000-" },
  ]);
  const audioCombineResult = await audioCombinePoller.pollUntilDone();
  if (audioCombineResult.contents && audioCombineResult.contents.length > 0) {
    const av = audioCombineResult.contents[0];
    console.log(`  '0-3000,30000-': ${av.startTimeMs} ms - ${av.endTimeMs} ms`);
  }
}

async function analyzeImage(client) {
  // ========================================================================
  // IMAGE ANALYSIS FROM URL
  // ========================================================================
  const imageUrl =
    "https://raw.githubusercontent.com/Azure-Samples/azure-ai-content-understanding-assets/main/image/pieChart.jpg";

  console.log("\n" + "=".repeat(60));
  console.log("IMAGE ANALYSIS FROM URL");
  console.log("=".repeat(60));
  console.log(`Analyzing image from URL with prebuilt-imageSearch...`);
  console.log(`  URL: ${imageUrl}`);

  const imagePoller = client.analyze("prebuilt-imageSearch", [{ url: imageUrl }]);
  const imageResult = await imagePoller.pollUntilDone();

  if (imageResult.contents && imageResult.contents.length > 0) {
    const content = imageResult.contents[0];
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
