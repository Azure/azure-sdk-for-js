// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample shows how to extract the text content of a document using the "prebuilt-read" model.
 *
 * @summary use the prebuilt "read" model to extract information about the text content of a document
 */

const DocumentIntelligence = require("@azure-rest/ai-document-intelligence").default,
  { getLongRunningPoller, isUnexpected } = require("@azure-rest/ai-document-intelligence");

require("dotenv").config();

async function main() {
  const client = DocumentIntelligence(
    process.env["DOCUMENT_INTELLIGENCE_ENDPOINT"] || "<cognitive services endpoint>",
    { key: process.env["DOCUMENT_INTELLIGENCE_API_KEY"] || "<api key>" },
  );

  const initialResponse = await client
    .path("/documentModels/{modelId}:analyze", "prebuilt-read")
    .post({
      contentType: "application/json",
      body: {
        urlSource:
          "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/main/sdk/formrecognizer/ai-form-recognizer/assets/forms/Invoice_1.pdf",
      },
      queryParameters: { features: ["barcodes"] },
    });

  if (isUnexpected(initialResponse)) {
    throw initialResponse.body.error;
  }
  const poller = await getLongRunningPoller(client, initialResponse);
  const analyzeResult = (await poller.pollUntilDone()).body.analyzeResult;

  // The "prebuilt-read" model (`beginReadDocument` method) only extracts information about the textual content of the
  // document, such as page text elements and information about the language of the text.
  const pages = analyzeResult?.pages;
  const languages = analyzeResult?.languages;
  const styles = analyzeResult?.styles;

  if (!pages || pages.length <= 0) {
    console.log("No pages were extracted from the document.");
  } else {
    console.log("Pages:");
    for (const page of pages) {
      console.log("- Page", page.pageNumber, `(unit: ${page.unit})`);
      console.log(`  ${page.width}x${page.height}, angle: ${page.angle}`);
      console.log(
        `  ${page.lines && page.lines.length} lines, ${page.words && page.words.length} words`,
      );

      if (page.lines && page.lines.length > 0) {
        console.log("  Lines:");

        for (const line of page.lines) {
          console.log(`  - "${line.content}"`);
        }
      }
    }
  }

  if (!languages || languages.length <= 0) {
    console.log("No language spans were extracted from the document.");
  } else {
    console.log("Languages:");
    for (const languageEntry of languages) {
      console.log(
        `- Found language: ${languageEntry.locale} (confidence: ${languageEntry.confidence})`,
      );
    }
  }

  if (!styles || styles.length <= 0) {
    console.log("No text styles were extracted from the document.");
  } else {
    console.log("Styles:");
    for (const style of styles) {
      console.log(
        `- Handwritten: ${style.isHandwritten ? "yes" : "no"} (confidence=${style.confidence})`,
      );
    }
  }
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
