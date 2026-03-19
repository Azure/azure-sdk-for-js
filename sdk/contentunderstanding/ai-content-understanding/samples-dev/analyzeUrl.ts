// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Analyze content from URLs across modalities (Document, Video, Audio, Image),
 * including ContentRange examples for targeting specific pages or time ranges.
 *
 * This sample demonstrates how to analyze content from publicly accessible URLs using
 * prebuilt RAG analyzers:
 * - prebuilt-documentSearch: For documents
 * - prebuilt-videoSearch: For videos
 * - prebuilt-audioSearch: For audio
 * - prebuilt-imageSearch: For images
 *
 * It also demonstrates ContentRange usage:
 * - Document: ContentRange.page(), pages(), pagesFrom(), combine()
 * - Video/Audio: ContentRange.timeRange(), timeRangeFrom(), combine(), sub-second precision
 *
 * @azsdk-weight 89
 */

import "dotenv/config";
import { DefaultAzureCredential } from "@azure/identity";
import { AzureKeyCredential } from "@azure/core-auth";
import {
  ContentUnderstandingClient,
  ContentRange,
  type DocumentContent,
  type AudioVisualContent,
} from "@azure/ai-content-understanding";

function getCredential(): DefaultAzureCredential | AzureKeyCredential {
  const key = process.env["CONTENTUNDERSTANDING_KEY"];
  if (key) {
    return new AzureKeyCredential(key);
  }
  return new DefaultAzureCredential();
}

export async function main(): Promise<void> {
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

  // 5. ContentRange: target specific pages in a document
  await analyzeDocumentWithContentRange(client);

  // 6. ContentRange: target specific time ranges in video
  await analyzeVideoWithContentRange(client);

  // 7. ContentRange: target specific time ranges in audio
  await analyzeAudioWithContentRange(client);
}

async function analyzeDocument(client: ContentUnderstandingClient): Promise<void> {
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
      const documentContent = content as DocumentContent;
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

async function analyzeVideo(client: ContentUnderstandingClient): Promise<void> {
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
        const videoContent = content as AudioVisualContent;
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

async function analyzeAudio(client: ContentUnderstandingClient): Promise<void> {
  const audioUrl =
    "https://raw.githubusercontent.com/Azure-Samples/azure-ai-content-understanding-assets/main/audio/callCenterRecording.mp3";

  console.log("\n--- Analyzing Audio from URL ---");
  console.log(`URL: ${audioUrl}`);

  const poller = client.analyze("prebuilt-audioSearch", [{ url: audioUrl }]);
  const result = await poller.pollUntilDone();

  if (result.contents && result.contents.length > 0) {
    const content = result.contents[0];
    if (content.kind === "audioVisual") {
      const audioContent = content as AudioVisualContent;
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

async function analyzeImage(client: ContentUnderstandingClient): Promise<void> {
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

async function analyzeDocumentWithContentRange(client: ContentUnderstandingClient): Promise<void> {
  const documentUrl =
    "https://raw.githubusercontent.com/Azure-Samples/azure-ai-content-understanding-assets/main/document/mixed_financial_invoices.pdf";

  console.log("\n--- Document with ContentRange ---");

  // Full document for comparison
  const fullPoller = client.analyze("prebuilt-documentSearch", [{ url: documentUrl }]);
  const fullResult = await fullPoller.pollUntilDone();
  if (fullResult.contents && fullResult.contents.length > 0) {
    const doc = fullResult.contents[0] as DocumentContent;
    console.log(`Full document: pages ${doc.startPageNumber} - ${doc.endPageNumber}`);
  }

  // Extract only page 1 using ContentRange.page(1)
  console.log("\n  page(1): Page 1 only");
  const pagePoller = client.analyze("prebuilt-documentSearch", [
    {
      url: documentUrl,
      contentRange: ContentRange.page(1),
    },
  ]);
  const pageResult = await pagePoller.pollUntilDone();
  if (pageResult.contents && pageResult.contents.length > 0) {
    const doc = pageResult.contents[0] as DocumentContent;
    console.log(`    Pages: ${doc.startPageNumber} - ${doc.endPageNumber}`);
    console.log(`    Markdown length: ${doc.markdown?.length ?? 0} chars`);
  }

  // ---- Raw string examples — pass strings directly without helpers ----

  // Raw string "1-3" for a document page range
  console.log('\n  Raw string "1-3": Pages 1 through 3');
  const rawPageRangePoller = client.analyze("prebuilt-documentSearch", [
    {
      url: documentUrl,
      contentRange: "1-3",
    },
  ]);
  const rawPageRangeResult = await rawPageRangePoller.pollUntilDone();
  if (rawPageRangeResult.contents && rawPageRangeResult.contents.length > 0) {
    const doc = rawPageRangeResult.contents[0] as DocumentContent;
    console.log(`    Pages: ${doc.startPageNumber} - ${doc.endPageNumber}`);
    console.log(`    Markdown length: ${doc.markdown?.length ?? 0} chars`);
  }

  // Raw string "9-" for all pages from page 9 onward
  console.log('\n  Raw string "9-": Page 9 onward');
  const rawPagesFromPoller = client.analyze("prebuilt-documentSearch", [
    {
      url: documentUrl,
      contentRange: "9-",
    },
  ]);
  const rawPagesFromResult = await rawPagesFromPoller.pollUntilDone();
  if (rawPagesFromResult.contents && rawPagesFromResult.contents.length > 0) {
    const doc = rawPagesFromResult.contents[0] as DocumentContent;
    console.log(`    Pages: ${doc.startPageNumber} - ${doc.endPageNumber}`);
    console.log(`    Markdown length: ${doc.markdown?.length ?? 0} chars`);
  }

  // Raw string "1-3,5,9-" for combined ranges
  console.log('\n  Raw string "1-3,5,9-": Combined ranges');
  const rawCombinedPoller = client.analyze("prebuilt-documentSearch", [
    {
      url: documentUrl,
      contentRange: "1-3,5,9-",
    },
  ]);
  const rawCombinedResult = await rawCombinedPoller.pollUntilDone();
  if (rawCombinedResult.contents && rawCombinedResult.contents.length > 0) {
    const doc = rawCombinedResult.contents[0] as DocumentContent;
    console.log(`    Pages: ${doc.startPageNumber} - ${doc.endPageNumber}`);
    console.log(`    Markdown length: ${doc.markdown?.length ?? 0} chars`);
  }
}

async function analyzeVideoWithContentRange(client: ContentUnderstandingClient): Promise<void> {
  const videoUrl =
    "https://raw.githubusercontent.com/Azure-Samples/azure-ai-content-understanding-assets/main/videos/sdk_samples/FlightSimulator.mp4";

  console.log("\n--- Video with ContentRange ---");

  // Full video for comparison
  const fullPoller = client.analyze("prebuilt-videoSearch", [{ url: videoUrl }]);
  const fullResult = await fullPoller.pollUntilDone();
  if (fullResult.contents) {
    console.log(`Full video: ${fullResult.contents.length} segment(s)`);
  }

  // ---- timeRange(0, 5000): first 5 seconds ----
  console.log("\n  timeRange(0, 5000): First 5 seconds");
  const rangePoller = client.analyze("prebuilt-videoSearch", [
    {
      url: videoUrl,
      contentRange: ContentRange.timeRange(0, 5000),
    },
  ]);
  const rangeResult = await rangePoller.pollUntilDone();
  if (rangeResult.contents) {
    for (const content of rangeResult.contents) {
      const av = content as AudioVisualContent;
      console.log(`    Segment: ${av.startTimeMs} ms - ${av.endTimeMs} ms`);
    }
  }

  // ---- timeRangeFrom(10000): from 10 seconds onward ----
  console.log("\n  timeRangeFrom(10000): From 10 seconds onward");
  const rangeFromPoller = client.analyze("prebuilt-videoSearch", [
    {
      url: videoUrl,
      contentRange: ContentRange.timeRangeFrom(10000),
    },
  ]);
  const rangeFromResult = await rangeFromPoller.pollUntilDone();
  if (rangeFromResult.contents) {
    for (const content of rangeFromResult.contents) {
      const av = content as AudioVisualContent;
      console.log(`    Segment: ${av.startTimeMs} ms - ${av.endTimeMs} ms`);
    }
  }

  // ---- Sub-second precision: timeRange(1200, 3651) ----
  console.log("\n  timeRange(1200, 3651): Sub-second precision");
  const subSecondPoller = client.analyze("prebuilt-videoSearch", [
    {
      url: videoUrl,
      contentRange: ContentRange.timeRange(1200, 3651),
    },
  ]);
  const subSecondResult = await subSecondPoller.pollUntilDone();
  if (subSecondResult.contents) {
    for (const content of subSecondResult.contents) {
      const av = content as AudioVisualContent;
      console.log(`    Segment: ${av.startTimeMs} ms - ${av.endTimeMs} ms`);
    }
  }

  // ---- combine(timeRange(0, 3000), timeRangeFrom(30000)) ----
  console.log("\n  combine(timeRange(0, 3000), timeRangeFrom(30000)): Combined");
  const combinePoller = client.analyze("prebuilt-videoSearch", [
    {
      url: videoUrl,
      contentRange: ContentRange.combine(
        ContentRange.timeRange(0, 3000),
        ContentRange.timeRangeFrom(30000),
      ),
    },
  ]);
  const combineResult = await combinePoller.pollUntilDone();
  if (combineResult.contents) {
    for (const content of combineResult.contents) {
      const av = content as AudioVisualContent;
      console.log(`    Segment: ${av.startTimeMs} ms - ${av.endTimeMs} ms`);
    }
  }

  // ---- Raw string "0-5000" — equivalent to timeRange(0, 5000) ----
  console.log('\n  Raw string "0-5000": First 5 seconds');
  const rawPoller = client.analyze("prebuilt-videoSearch", [
    {
      url: videoUrl,
      contentRange: "0-5000",
    },
  ]);
  const rawResult = await rawPoller.pollUntilDone();
  if (rawResult.contents) {
    for (const content of rawResult.contents) {
      const av = content as AudioVisualContent;
      console.log(`    Segment: ${av.startTimeMs} ms - ${av.endTimeMs} ms`);
    }
  }
}

async function analyzeAudioWithContentRange(client: ContentUnderstandingClient): Promise<void> {
  const audioUrl =
    "https://raw.githubusercontent.com/Azure-Samples/azure-ai-content-understanding-assets/main/audio/callCenterRecording.mp3";

  console.log("\n--- Audio with ContentRange ---");

  // Full audio for comparison
  const fullPoller = client.analyze("prebuilt-audioSearch", [{ url: audioUrl }]);
  const fullResult = await fullPoller.pollUntilDone();
  if (fullResult.contents && fullResult.contents.length > 0) {
    const av = fullResult.contents[0] as AudioVisualContent;
    console.log(`Full audio: ${av.startTimeMs} ms - ${av.endTimeMs} ms`);
  }

  // ---- timeRangeFrom(5000): from 5 seconds onward ----
  console.log("\n  timeRangeFrom(5000): From 5 seconds onward");
  const rangeFromPoller = client.analyze("prebuilt-audioSearch", [
    {
      url: audioUrl,
      contentRange: ContentRange.timeRangeFrom(5000),
    },
  ]);
  const rangeFromResult = await rangeFromPoller.pollUntilDone();
  if (rangeFromResult.contents && rangeFromResult.contents.length > 0) {
    const av = rangeFromResult.contents[0] as AudioVisualContent;
    console.log(`    Duration: ${av.startTimeMs} ms - ${av.endTimeMs} ms`);
    console.log(`    Markdown length: ${av.markdown?.length ?? 0} chars`);
  }

  // ---- timeRange(2000, 8000): 2s to 8s ----
  console.log("\n  timeRange(2000, 8000): 2 to 8 seconds");
  const windowPoller = client.analyze("prebuilt-audioSearch", [
    {
      url: audioUrl,
      contentRange: ContentRange.timeRange(2000, 8000),
    },
  ]);
  const windowResult = await windowPoller.pollUntilDone();
  if (windowResult.contents && windowResult.contents.length > 0) {
    const av = windowResult.contents[0] as AudioVisualContent;
    console.log(`    Duration: ${av.startTimeMs} ms - ${av.endTimeMs} ms`);
    console.log(`    Markdown length: ${av.markdown?.length ?? 0} chars`);
  }

  // ---- Sub-second precision: timeRange(1200, 3651) ----
  console.log("\n  timeRange(1200, 3651): Sub-second precision");
  const subSecondPoller = client.analyze("prebuilt-audioSearch", [
    {
      url: audioUrl,
      contentRange: ContentRange.timeRange(1200, 3651),
    },
  ]);
  const subSecondResult = await subSecondPoller.pollUntilDone();
  if (subSecondResult.contents && subSecondResult.contents.length > 0) {
    const av = subSecondResult.contents[0] as AudioVisualContent;
    console.log(`    Duration: ${av.startTimeMs} ms - ${av.endTimeMs} ms`);
    console.log(`    Markdown length: ${av.markdown?.length ?? 0} chars`);
  }

  // ---- Raw string "5000-" — equivalent to timeRangeFrom(5000) ----
  console.log('\n  Raw string "5000-": From 5 seconds onward');
  const rawPoller = client.analyze("prebuilt-audioSearch", [
    {
      url: audioUrl,
      contentRange: "5000-",
    },
  ]);
  const rawResult = await rawPoller.pollUntilDone();
  if (rawResult.contents && rawResult.contents.length > 0) {
    const av = rawResult.contents[0] as AudioVisualContent;
    console.log(`    Duration: ${av.startTimeMs} ms - ${av.endTimeMs} ms`);
    console.log(`    Markdown length: ${av.markdown?.length ?? 0} chars`);
  }

  // ---- Raw string "0-5000" — first 5 seconds ----
  console.log('\n  Raw string "0-5000": First 5 seconds');
  const rawWindowPoller = client.analyze("prebuilt-audioSearch", [
    {
      url: audioUrl,
      contentRange: "0-5000",
    },
  ]);
  const rawWindowResult = await rawWindowPoller.pollUntilDone();
  if (rawWindowResult.contents && rawWindowResult.contents.length > 0) {
    const av = rawWindowResult.contents[0] as AudioVisualContent;
    console.log(`    Duration: ${av.startTimeMs} ms - ${av.endTimeMs} ms`);
    console.log(`    Markdown length: ${av.markdown?.length ?? 0} chars`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
