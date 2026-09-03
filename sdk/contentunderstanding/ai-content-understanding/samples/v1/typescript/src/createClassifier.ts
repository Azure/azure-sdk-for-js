// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Create a classifier analyzer to categorize documents.
 *
 * This sample demonstrates how to create a classifier analyzer to categorize documents and
 * use it to analyze documents with and without automatic segmentation.
 *
 * Classifiers are a type of custom analyzer that create classification workflows to categorize
 * documents into predefined custom categories. They are useful for:
 * - Content organization: Organize large document collections by type
 * - Data routing: Route data to specific custom analyzers based on category
 * - Multi-document processing: Process files containing multiple document types by segmenting them
 */

import "dotenv/config";
import * as fs from "fs";
import * as path from "path";
import { DefaultAzureCredential } from "@azure/identity";
import { AzureKeyCredential } from "@azure/core-auth";
import { ContentUnderstandingClient } from "@azure/ai-content-understanding";
import type {
  ContentAnalyzer,
  ContentAnalyzerConfig,
  DocumentContent,
} from "@azure/ai-content-understanding";

function getCredential(): DefaultAzureCredential | AzureKeyCredential {
  const key = process.env["CONTENTUNDERSTANDING_KEY"];
  if (key) {
    return new AzureKeyCredential(key);
  }
  return new DefaultAzureCredential();
}

export async function main(): Promise<void> {
  console.log("== Create Classifier Sample ==");

  const endpoint = process.env["CONTENTUNDERSTANDING_ENDPOINT"];
  if (!endpoint) {
    throw new Error("CONTENTUNDERSTANDING_ENDPOINT is required.");
  }

  const client = new ContentUnderstandingClient(endpoint, getCredential());

  // Generate a unique analyzer ID
  const analyzerId = `my_classifier_${Math.floor(Date.now() / 1000)}`;
  console.log(`Creating classifier '${analyzerId}'...`);

  // Define content categories for classification
  const contentCategories = {
    Loan_Application: {
      description:
        "Documents submitted by individuals or businesses to request funding, " +
        "typically including personal or business details, financial history, " +
        "loan amount, purpose, and supporting documentation.",
    },
    Invoice: {
      description:
        "Billing documents issued by sellers or service providers to request " +
        "payment for goods or services, detailing items, prices, taxes, totals, " +
        "and payment terms.",
    },
    Bank_Statement: {
      description:
        "Official statements issued by banks that summarize account activity " +
        "over a period, including deposits, withdrawals, fees, and balances.",
    },
  };

  // Create analyzer configuration
  const config: ContentAnalyzerConfig = {
    returnDetails: true,
    enableSegment: true, // Enable automatic segmentation by category
    contentCategories,
  };

  // Create the classifier analyzer
  const classifier: ContentAnalyzer = {
    baseAnalyzerId: "prebuilt-document",
    description: "Custom classifier for financial document categorization",
    config,
    models: { completion: "gpt-4.1" },
  } as unknown as ContentAnalyzer;

  // Create the classifier
  const poller = client.createAnalyzer(analyzerId, classifier);
  await poller.pollUntilDone();

  // Get the full analyzer details after creation
  const result = await client.getAnalyzer(analyzerId);

  console.log(`Classifier '${analyzerId}' created successfully!`);
  if (result.description) {
    console.log(`  Description: ${result.description}`);
  }

  // Analyze a document with the classifier
  // Assets folder is at ../assets relative to samples/v1/javascript or samples/v1/typescript
  const filePath = path.join("..", "..", "assets", "mixed_financial_docs.pdf");
  const fileBytes = fs.readFileSync(filePath);
  console.log(`\nAnalyzing document with classifier '${analyzerId}'...`);

  const analyzePoller = client.analyzeBinary(analyzerId, fileBytes);
  const analyzeResult = await analyzePoller.pollUntilDone();

  // Display classification results
  if (analyzeResult.contents && analyzeResult.contents.length > 0) {
    const content = analyzeResult.contents[0];

    if (content.kind === "document") {
      const documentContent = content as DocumentContent;
      console.log(`Pages: ${documentContent.startPageNumber}-${documentContent.endPageNumber}`);

      // Display segments (classification results)
      if (documentContent.segments && documentContent.segments.length > 0) {
        console.log(`\nFound ${documentContent.segments.length} segment(s):`);
        for (const segment of documentContent.segments) {
          console.log(`  Category: ${segment.category ?? "(unknown)"}`);
          console.log(`  Pages: ${segment.startPageNumber}-${segment.endPageNumber}`);
          console.log(`  Segment ID: ${segment.segmentId ?? "(not available)"}`);
        }
      } else {
        console.log("No segments found (document classified as a single unit).");
      }
    }
  } else {
    console.log("No content found in the analysis result.");
  }

  // Clean up - delete the classifier
  console.log(`\nCleaning up: deleting classifier '${analyzerId}'...`);
  await client.deleteAnalyzer(analyzerId);
  console.log(`Classifier '${analyzerId}' deleted successfully.`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
