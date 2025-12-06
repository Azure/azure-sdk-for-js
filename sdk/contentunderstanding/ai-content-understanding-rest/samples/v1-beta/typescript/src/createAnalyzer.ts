// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Create a custom analyzer with a field schema to extract structured data.
 *
 * This sample demonstrates how to create a custom analyzer with a field schema to extract
 * structured data from documents.
 *
 * Custom analyzers allow you to:
 * - Define custom fields (string, number, date, object, array)
 * - Specify extraction methods:
 *   - extract: Values are extracted as they appear in the content (literal text extraction)
 *   - generate: Values are generated freely based on the content using AI models
 *   - classify: Values are classified against a predefined set of categories
 * - Use prebuilt analyzers as a base (prebuilt-document, prebuilt-audio, prebuilt-video, prebuilt-image)
 * - Configure analysis options (OCR, layout, formulas)
 * - Enable source and confidence tracking for extracted field values
 */

import "dotenv/config";
import { DefaultAzureCredential } from "@azure/identity";
import { AzureKeyCredential } from "@azure/core-auth";
import { ContentUnderstandingClient } from "@azure-rest/ai-content-understanding";
import type {
  ContentAnalyzer,
  ContentAnalyzerConfig,
  ContentFieldSchema,
} from "@azure-rest/ai-content-understanding";

function getCredential(): DefaultAzureCredential | AzureKeyCredential {
  const key = process.env["AZURE_CONTENT_UNDERSTANDING_KEY"];
  if (key) {
    return new AzureKeyCredential(key);
  }
  return new DefaultAzureCredential();
}

export async function main(): Promise<void> {
  console.log("== Create Analyzer Sample ==");

  const endpoint = process.env["AZURE_CONTENT_UNDERSTANDING_ENDPOINT"];
  if (!endpoint) {
    throw new Error("AZURE_CONTENT_UNDERSTANDING_ENDPOINT is required.");
  }

  const client = new ContentUnderstandingClient(endpoint, getCredential());

  // Generate a unique analyzer ID
  const analyzerId = `my_custom_analyzer_${Math.floor(Date.now() / 1000)}`;
  console.log(`Creating custom analyzer '${analyzerId}'...`);

  // Define field schema with custom fields
  // This example demonstrates three extraction methods:
  // - extract: Literal text extraction (requires estimateSourceAndConfidence)
  // - generate: AI-generated values based on content interpretation
  // - classify: Classification against predefined categories
  const fieldSchema: ContentFieldSchema = {
    name: "company_schema",
    description: "Schema for extracting company information",
    fields: {
      company_name: {
        type: "string",
        method: "extract",
        description: "Name of the company",
      },
      total_amount: {
        type: "number",
        method: "extract",
        description: "Total amount on the document",
      },
      document_summary: {
        type: "string",
        method: "generate",
        description: "A brief summary of the document content",
      },
      document_type: {
        type: "string",
        method: "classify",
        description: "Type of document",
        enum: ["invoice", "receipt", "contract", "report", "other"],
      },
    },
  };

  // Create analyzer configuration
  const config: ContentAnalyzerConfig = {
    enableFormula: true,
    enableLayout: true,
    enableOcr: true,
    estimateFieldSourceAndConfidence: true,
    returnDetails: true,
  };

  // Create the analyzer with field schema
  const analyzer: ContentAnalyzer = {
    baseAnalyzerId: "prebuilt-document",
    description: "Custom analyzer for extracting company information",
    config,
    fieldSchema,
    models: { completion: "gpt-4.1" }, // Required when using field_schema
  } as ContentAnalyzer;

  // Create the analyzer
  const poller = client.createAnalyzer(analyzerId, analyzer);
  await poller.pollUntilDone();

  // Get the full analyzer details after creation
  const result = await client.getAnalyzer(analyzerId);

  console.log(`Analyzer '${analyzerId}' created successfully!`);
  if (result.description) {
    console.log(`  Description: ${result.description}`);
  }

  if (result.fieldSchema?.fields) {
    console.log(`  Fields (${Object.keys(result.fieldSchema.fields).length}):`);
    for (const [fieldName, fieldDef] of Object.entries(result.fieldSchema.fields)) {
      const method = fieldDef.method ?? "auto";
      const fieldType = fieldDef.type ?? "unknown";
      console.log(`    - ${fieldName}: ${fieldType} (${method})`);
    }
  }

  // Clean up - delete the analyzer
  console.log(`\nCleaning up: deleting analyzer '${analyzerId}'...`);
  await client.deleteAnalyzer(analyzerId);
  console.log(`Analyzer '${analyzerId}' deleted successfully.`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
