// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Extract additional features like charts, hyperlinks, formulas, and annotations.
 *
 * This sample demonstrates how to extract additional features from documents such as charts,
 * hyperlinks, formulas, and annotations using the prebuilt-documentSearch analyzer.
 *
 * The prebuilt-documentSearch analyzer has the following configurations enabled by default:
 * - ReturnDetails: true - Returns detailed information about document elements
 * - EnableOcr: true - Performs OCR on documents
 * - EnableLayout: true - Extracts layout information (tables, figures, hyperlinks, annotations)
 * - EnableFormula: true - Extracts mathematical formulas from documents
 * - EnableFigureDescription: true - Generates descriptions for figures
 * - EnableFigureAnalysis: true - Analyzes figures including charts
 * - ChartFormat: "chartjs" - Chart figures are returned in Chart.js format
 * - TableFormat: "html" - Tables are returned in HTML format
 * - AnnotationFormat: "markdown" - Annotations are returned in markdown format
 *
 * These configs enable extraction of:
 * - Charts: Enabled by EnableFigureAnalysis - Chart figures with Chart.js configuration
 * - Hyperlinks: Enabled by EnableLayout - URLs and links found in the document
 * - Formulas: Enabled by EnableFormula - Mathematical formulas in LaTeX format
 * - Annotations: Enabled by EnableLayout - PDF annotations, comments, and markup
 */

import "dotenv/config";
import * as fs from "fs";
import * as path from "path";
import { DefaultAzureCredential } from "@azure/identity";
import { AzureKeyCredential } from "@azure/core-auth";
import { ContentUnderstandingClient } from "@azure/ai-content-understanding";
import type { DocumentContent, DocumentChartFigure } from "@azure/ai-content-understanding";

function getCredential(): DefaultAzureCredential | AzureKeyCredential {
  const key = process.env["CONTENTUNDERSTANDING_KEY"];
  if (key) {
    return new AzureKeyCredential(key);
  }
  return new DefaultAzureCredential();
}

export async function main(): Promise<void> {
  console.log("== Analyze Configs Sample ==");

  const endpoint = process.env["CONTENTUNDERSTANDING_ENDPOINT"];
  if (!endpoint) {
    throw new Error("CONTENTUNDERSTANDING_ENDPOINT is required.");
  }

  const client = new ContentUnderstandingClient(endpoint, getCredential());

  // Read PDF bytes from disk
  // Assets folder is at ../assets relative to samples/v1/javascript or samples/v1/typescript
  const filePath = path.join("..", "..", "assets", "sample_document_features.pdf");
  const pdfBytes = fs.readFileSync(filePath);
  console.log(`Analyzing ${filePath} with prebuilt-documentSearch...`);
  console.log("Note: prebuilt-documentSearch has formulas, layout, and OCR enabled by default.");

  // Analyze with prebuilt-documentSearch which has formulas, layout, and OCR enabled
  const poller = client.analyzeBinary("prebuilt-documentSearch", pdfBytes);
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
