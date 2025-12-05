// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Extract additional features like charts, hyperlinks, formulas, and annotations.
 *
 * This sample demonstrates how to extract additional features from documents such as charts,
 * hyperlinks, formulas, and annotations using the prebuilt-documentSearch analyzer.
 *
 * The prebuilt-documentSearch analyzer has the following configurations enabled by default:
 * - EnableFormula: Extracts mathematical formulas from documents
 * - EnableLayout: Extracts layout information (tables, figures, etc.)
 * - EnableOcr: Performs OCR on documents
 *
 * These configs enable extraction of:
 * - Charts: Chart figures with Chart.js configuration
 * - Hyperlinks: URLs and links found in the document
 * - Formulas: Mathematical formulas in LaTeX format
 * - Annotations: PDF annotations, comments, and markup
 *
 * @azsdk-weight 81
 */

import "dotenv/config";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { DefaultAzureCredential } from "@azure/identity";
import { AzureKeyCredential } from "@azure/core-auth";
import { ContentUnderstandingClient } from "@azure-rest/ai-content-understanding";
import type { DocumentContent, DocumentChartFigure } from "@azure-rest/ai-content-understanding";

function getCredential(): DefaultAzureCredential | AzureKeyCredential {
  const key = process.env["AZURE_CONTENT_UNDERSTANDING_KEY"];
  if (key) {
    return new AzureKeyCredential(key);
  }
  return new DefaultAzureCredential();
}

export async function main(): Promise<void> {
  console.log("== Analyze Configs Sample ==");

  const endpoint = process.env["AZURE_CONTENT_UNDERSTANDING_ENDPOINT"];
  if (!endpoint) {
    throw new Error("AZURE_CONTENT_UNDERSTANDING_ENDPOINT is required.");
  }

  const client = new ContentUnderstandingClient(endpoint, getCredential());

  // Read PDF bytes from disk
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.resolve(__dirname, "./example-data", "sample_document_features.pdf");

  if (!fs.existsSync(filePath)) {
    console.error("Error: Sample file not found. Expected file:");
    console.error(`  - ${filePath}`);
    console.error(
      "\nPlease ensure sample_invoice.pdf exists in the sample's example-data directory.",
    );
    process.exit(1);
  }

  const pdfBytes = fs.readFileSync(filePath);
  console.log(`Analyzing ${filePath} with prebuilt-documentSearch...`);
  console.log("Note: prebuilt-documentSearch has formulas, layout, and OCR enabled by default.");

  // Analyze with prebuilt-documentSearch which has formulas, layout, and OCR enabled
  const poller = client.analyzeBinary("prebuilt-documentSearch", "application/pdf", pdfBytes);
  const result = await poller.pollUntilDone();

  if (!result.contents || result.contents.length === 0) {
    console.log("\nNo content found in the analysis result.");
    return;
  }

  const content = result.contents[0];

  if (content.kind !== "document") {
    console.log("\nNot a document content type.");
    return;
  }

  const documentContent = content as DocumentContent;

  // Extract charts
  if (documentContent.figures && documentContent.figures.length > 0) {
    const chartFigures = documentContent.figures.filter((f) => f.kind === "chart");
    console.log(`\nFound ${chartFigures.length} chart(s)`);
    for (const chart of chartFigures) {
      console.log(`  Chart ID: ${chart.id}`);
      if (chart.description) {
        console.log(`    Description: ${chart.description}`);
      }
      if (chart.caption?.content) {
        console.log(`    Caption: ${chart.caption.content}`);
      }
      // Display chart content for chart figures
      const chartFigure = chart as DocumentChartFigure;
      if (chartFigure.content) {
        console.log(`    Content: ${JSON.stringify(chartFigure.content)}`);
      }
    }
  } else {
    console.log("\nNo figures found in the document.");
  }

  // Extract hyperlinks
  if (documentContent.hyperlinks && documentContent.hyperlinks.length > 0) {
    console.log(`\nFound ${documentContent.hyperlinks.length} hyperlink(s)`);
    for (const hyperlink of documentContent.hyperlinks) {
      console.log(`  URL: ${hyperlink.url ?? "(not available)"}`);
      console.log(`    Content: ${hyperlink.content ?? "(not available)"}`);
    }
  } else {
    console.log("\nNo hyperlinks found in the document.");
  }

  // Extract formulas
  const allFormulas: Array<{ kind: string; value: string }> = [];
  if (documentContent.pages) {
    for (const page of documentContent.pages) {
      if (page.formulas) {
        for (const formula of page.formulas) {
          allFormulas.push({ kind: formula.kind, value: formula.value });
        }
      }
    }
  }

  if (allFormulas.length > 0) {
    console.log(`\nFound ${allFormulas.length} formula(s)`);
    for (const formula of allFormulas) {
      console.log(`  Formula kind: ${formula.kind}`);
      console.log(`    LaTeX: ${formula.value}`);
    }
  } else {
    console.log("\nNo formulas found in the document.");
  }

  // Extract annotations
  if (documentContent.annotations && documentContent.annotations.length > 0) {
    console.log(`\nFound ${documentContent.annotations.length} annotation(s)`);
    for (const annotation of documentContent.annotations) {
      console.log(`  Annotation ID: ${annotation.id}`);
      console.log(`    Kind: ${annotation.kind}`);
      if (annotation.author) {
        console.log(`    Author: ${annotation.author}`);
      }
      if (annotation.comments && annotation.comments.length > 0) {
        console.log(`    Comments: ${annotation.comments.length}`);
      }
    }
  } else {
    console.log("\nNo annotations found in the document.");
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
