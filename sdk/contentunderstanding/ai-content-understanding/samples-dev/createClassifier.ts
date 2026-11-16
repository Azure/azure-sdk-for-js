// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Create and use a classifier.
 *
 * This sample demonstrates how to create a classifier analyzer to categorize documents, use
 * it to analyze documents with and without automatic segmentation, and convert classification
 * results to LLM-friendly text with `toLlmInput()`.
 *
 * Alternatively, you can create classification workflows using
 * [Content Understanding Studio](https://contentunderstanding.ai.azure.com/), a web-based UI
 * that provides a convenient way to build and test classification workflows in the same
 * interface. Content Understanding Studio allows you to create custom categories and routing
 * rules that route your data to specific analyzers, ensuring your data is always routed to
 * the best analyzer for processing.
 *
 * ## About classifiers
 *
 * Classifiers are a type of custom analyzer that create classification workflows to
 * categorize documents into predefined custom categories using `contentCategories`. They
 * allow you to perform classification and content extraction as part of a single API
 * call. Classifiers are useful for:
 * - **Content organization**: Organize large document collections by type through categorization
 * - **Data routing (optional)**: Optionally route your data to specific custom analyzers based on category, ensuring your data is routed to the best analyzer for processing when needed
 * - **Multi-document processing**: Process files containing multiple document types by automatically segmenting them
 *
 * Classifiers use **custom categories** to define the types of documents they can
 * identify. Each category has a `description` that helps the AI model understand what
 * documents belong to that category. You can define up to 200 category names and
 * descriptions. You can include an `"other"` category to handle unmatched content;
 * otherwise, all files are forced to be classified into one of your defined categories.
 *
 * The `enableSegment` property in the analyzer configuration controls whether multi-document files are split into segments:
 * - **`enableSegment: false`**: Classifies the entire file as a single category (classify only)
 * - **`enableSegment: true`**: Automatically splits the file into segments by category (classify and segment)
 *
 * For detailed information about classifiers, see the [Classifier documentation](https://learn.microsoft.com/azure/ai-services/content-understanding/concepts/classifier).
 *
 * @azsdk-weight 86
 */

import "dotenv/config";
import * as fs from "fs";
import * as path from "path";
import { DefaultAzureCredential } from "@azure/identity";
import { AzureKeyCredential } from "@azure/core-auth";
import { ContentUnderstandingClient, toLlmInput } from "@azure/ai-content-understanding";
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

  // Define content categories for classification.
  // Each category has a description that helps the AI model identify matching documents.
  // Optionally, set analyzerId on a category to route matched segments to a prebuilt
  // or custom analyzer for field extraction. For example, setting
  // analyzerId: "prebuilt-invoice" on the Invoice category will automatically extract
  // invoice fields (vendor, line items, totals, etc.) from segments classified as Invoice.
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
      analyzerId: "prebuilt-invoice", // Route Invoice segments for field extraction
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
    models: { completion: "gpt-5.2" },
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

  // ======================================================================
  // Convert classification results to LLM-friendly text.
  // ======================================================================
  // toLlmInput automatically detects classification results: it expands the parent
  // into per-segment blocks, each with its category label in the YAML front matter.
  // Segments are separated by a ***** divider.
  console.log("\nLLM-ready output:");
  console.log("=".repeat(50));
  console.log(toLlmInput(analyzeResult));
  console.log("=".repeat(50));

  // Clean up - delete the classifier
  console.log(`\nCleaning up: deleting classifier '${analyzerId}'...`);
  await client.deleteAnalyzer(analyzerId);
  console.log(`Classifier '${analyzerId}' deleted successfully.`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
