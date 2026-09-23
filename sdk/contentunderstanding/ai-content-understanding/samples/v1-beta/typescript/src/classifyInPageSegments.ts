// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Classify multiple documents within one page.
 *
 * By default, document segmentation uses page boundaries. Set `allowInPageSegments`
 * together with `enableSegment` when distinct documents can appear on the same page —
 * for example, separating individual **supplemental statements** that are often appended
 * after the main form in a K-1 tax package. See the
 * [Content Understanding classifier overview](https://learn.microsoft.com/azure/ai-services/content-understanding/concepts/classifier)
 * for supported scenarios and Studio guidance.
 *
 * This sample uses a simplified synthetic one-page PDF containing an invoice in the
 * upper half and an account statement in the lower half (`mixed_financial_docs_in_page.pdf`).
 *
 * Each returned `DocumentContentSegment` carries:
 * - `category`: which `contentCategories` entry the segment matched.
 * - `startPageNumber` / `endPageNumber`: the page range for the segment.
 * - `confidence`: combined confidence of segmentation and category classification.
 * - `source`: encoded position that locates the segment within the page.
 * - `span`: offset + length in the parent document's markdown.
 *
 * ## Prerequisites
 *
 * You need a Microsoft Foundry resource with at least one completion model deployment.
 * Configure defaults via `updateDefaults.ts`, or set `analyzer.models["completion"]`
 * explicitly as shown below.
 *
 * This sample requires service API version `2026-06-01-preview`.
 */

import "dotenv/config";
import * as fs from "fs";
import * as path from "path";
import { DefaultAzureCredential } from "@azure/identity";
import { AzureKeyCredential } from "@azure/core-auth";
import { ContentUnderstandingClient } from "@azure/ai-content-understanding";
import type { ContentAnalyzer, DocumentContent } from "@azure/ai-content-understanding";

function getCredential(): DefaultAzureCredential | AzureKeyCredential {
  const key = process.env["CONTENTUNDERSTANDING_KEY"];
  if (key) {
    return new AzureKeyCredential(key);
  }
  return new DefaultAzureCredential();
}

export async function main(): Promise<void> {
  console.log("== Classify In-Page Segments Sample ==");

  const endpoint = process.env["CONTENTUNDERSTANDING_ENDPOINT"];
  if (!endpoint) {
    throw new Error("CONTENTUNDERSTANDING_ENDPOINT is required.");
  }

  const client = new ContentUnderstandingClient(endpoint, getCredential());
  const analyzerId = `in_page_classifier_${Math.floor(Date.now() / 1000)}`;

  try {
    // Create a classifier that segments the input by content categories, allowing
    // multiple distinct documents on the same page.
    console.log(`Creating analyzer '${analyzerId}'...`);
    const analyzer: ContentAnalyzer = {
      baseAnalyzerId: "prebuilt-document",
      description: "Classify financial documents that may share a page.",
      config: {
        returnDetails: true,
        enableSegment: true,
        allowInPageSegments: true,
        estimateFieldSourceAndConfidence: true,
        contentCategories: {
          Invoice: {
            description:
              "An invoice requesting payment for goods or services, with line items, totals, and payment terms.",
          },
          BankStatement: {
            description:
              "A bank account statement listing balances, deposits, withdrawals, fees, and transactions.",
          },
        },
      },
      models: {
        completion: process.env["CONTENTUNDERSTANDING_COMPLETION_MODEL"] ?? "gpt-5.2",
      },
    } as unknown as ContentAnalyzer;

    const createPoller = client.createAnalyzer(analyzerId, analyzer);
    await createPoller.pollUntilDone();
    console.log(`Analyzer '${analyzerId}' created.`);

    // Analyze a document that may contain multiple sub-documents on one page.
    const filePath = path.join("..", "..", "assets", "mixed_financial_docs_in_page.pdf");
    const bytes = fs.readFileSync(filePath);
    console.log(`\nAnalyzing ${filePath}...`);
    const analyzePoller = client.analyzeBinary(analyzerId, bytes);
    const result = await analyzePoller.pollUntilDone();

    const doc = result.contents.find((c) => c.kind === "document") as DocumentContent | undefined;
    if (!doc) {
      console.log("(no document content returned)");
      return;
    }

    const segments = doc.segments ?? [];
    console.log(`\nFound ${segments.length} segment(s).`);
    for (const segment of segments) {
      console.log(`\nCategory: ${segment.category}`);
      console.log(`  Pages: ${segment.startPageNumber}-${segment.endPageNumber}`);
      if (segment.confidence !== undefined) {
        console.log(`  Confidence: ${(segment.confidence * 100).toFixed(1)}%`);
      }
      if (segment.source) {
        console.log(`  Source: ${segment.source}`);
      }
      console.log(`  Span: offset=${segment.span.offset}, length=${segment.span.length}`);
    }
  } finally {
    console.log(`\nCleaning up: deleting analyzer '${analyzerId}'...`);
    await client.deleteAnalyzer(analyzerId);
    console.log(`Analyzer '${analyzerId}' deleted.`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
