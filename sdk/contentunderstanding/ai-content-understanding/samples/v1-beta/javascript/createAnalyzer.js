// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Create a custom analyzer with a field schema to extract structured data.
 *
 * This sample demonstrates how to create a custom analyzer with a field schema to
 * extract structured data from documents. While this sample shows document modalities,
 * custom analyzers can also be created for video, audio, and image content. The same
 * concepts apply across all modalities.
 *
 * Alternatively, you can create custom analyzers using
 * [Content Understanding Studio](https://contentunderstanding.ai.azure.com/), a web-based
 * UI that provides a convenient way to build and test analyzers in the same interface.
 * Content Understanding Studio also allows you to opt-in to in-context learning by
 * providing a knowledge base of labeled data, which can further improve model quality
 * for document-based analyzers.
 *
 * ## About custom analyzers
 *
 * Custom analyzers allow you to define a field schema that specifies what structured data
 * to extract from documents. You can:
 * - Define custom fields (string, number, date, object, array)
 * - Specify extraction methods to control how field values are extracted (see
 *   [method](https://learn.microsoft.com/azure/ai-services/content-understanding/concepts/analyzer-reference#method)
 *   for details):
 *   - **`generate`** — Values are generated freely based on the content using AI models
 *     (best for complex or variable fields requiring interpretation).
 *   - **`classify`** — Values are classified against a predefined set of categories
 *     (best when using `enum` with a fixed set of possible values).
 *   - **`extract`** — Values are extracted as they appear in the content (best for literal
 *     text extraction from specific locations). **Note**: This method is only available
 *     for document content. Requires `estimateSourceAndConfidence` to be set to `true`
 *     for the field.
 *
 *   When not specified, the system automatically determines the best method based on the
 *   field type and description.
 * - Use prebuilt analyzers as a base. Supported base analyzers include:
 *   - `prebuilt-document` — for document-based custom analyzers
 *   - `prebuilt-audio` — for audio-based custom analyzers
 *   - `prebuilt-video` — for video-based custom analyzers
 *   - `prebuilt-image` — for image-based custom analyzers
 * - Configure analysis options (OCR, layout, formulas).
 * - Enable source and confidence tracking: Set `estimateFieldSourceAndConfidence` to
 *   `true` at the analyzer level (in `ContentAnalyzerConfig`) or `estimateSourceAndConfidence`
 *   to `true` at the field level to get source location (page number, bounding box) and
 *   confidence scores for extracted field values. This is required for fields with
 *   `method` = `extract` and is useful for validation, quality assurance, debugging, and
 *   highlighting source text in user interfaces. Field-level settings override analyzer-level
 *   settings.
 *
 * `estimateFieldSourceAndConfidence` can also provide confidence and grounding for `generate`
 * and `classify` fields.
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
  console.log("== Create Analyzer Sample ==");

  const endpoint = process.env["CONTENTUNDERSTANDING_ENDPOINT"];
  if (!endpoint) {
    throw new Error("CONTENTUNDERSTANDING_ENDPOINT is required.");
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
  const fieldSchema = {
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
  const config = {
    enableFormula: true,
    enableLayout: true,
    enableOcr: true,
    estimateFieldSourceAndConfidence: true,
    returnDetails: true,
  };

  // Create the analyzer with field schema
  const analyzer = {
    baseAnalyzerId: "prebuilt-document",
    description: "Custom analyzer for extracting company information",
    config,
    fieldSchema,
    models: {
      completion: "gpt-5.2",
      embedding: "text-embedding-3-large",
    },
  };

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

  // Analyze a document using the custom analyzer
  console.log("\nAnalyzing document with custom analyzer...");
  const documentUrl =
    "https://raw.githubusercontent.com/Azure-Samples/azure-ai-content-understanding-assets/main/document/invoice.pdf";

  const analyzePoller = client.analyze(analyzerId, [{ url: documentUrl }]);
  const analyzeResult = await analyzePoller.pollUntilDone();

  if (analyzeResult.contents && analyzeResult.contents.length > 0) {
    const content = analyzeResult.contents[0];

    // Extract custom fields
    if (content.fields) {
      // Extract field (literal text extraction)
      const companyNameField = content.fields["company_name"];
      if (companyNameField) {
        console.log(`Company Name (extract): ${companyNameField.value ?? "(not found)"}`);
        console.log(`  Confidence: ${companyNameField.confidence?.toFixed(2) ?? "N/A"}`);
        console.log(`  Source: ${companyNameField.source ?? "N/A"}`);
      }

      // Extract field (literal text extraction)
      const totalAmountField = content.fields["total_amount"];
      if (totalAmountField) {
        const value = typeof totalAmountField.value === "number" ? totalAmountField.value : null;
        console.log(`Total Amount (extract): ${value?.toFixed(2) ?? "(not found)"}`);
        console.log(`  Confidence: ${totalAmountField.confidence?.toFixed(2) ?? "N/A"}`);
        console.log(`  Source: ${totalAmountField.source ?? "N/A"}`);
      }

      const summaryField = content.fields["document_summary"];
      if (summaryField) {
        console.log(`Document Summary: ${summaryField.value ?? "(not found)"}`);
        console.log(`  Confidence: ${summaryField.confidence?.toFixed(2) ?? "N/A"}`);
        // `source` is the wire-format grounding string (for example
        // `D(1,0.10,0.20,0.50,0.20,0.50,0.25,0.10,0.25)` for a document page +
        // polygon, or `AV(1500,0.10,0.20,0.30,0.40)` for an audio/visual timestamp
        // + optional bounding box). Multiple regions are separated by `;`.
        // See https://aka.ms/cu-content-source for the full grammar.
        if (summaryField.source) {
          console.log(`  Source: ${summaryField.source}`);
        }
      }

      const documentTypeField = content.fields["document_type"];
      if (documentTypeField) {
        console.log(`Document Type: ${documentTypeField.value ?? "(not found)"}`);
        console.log(`  Confidence: ${documentTypeField.confidence?.toFixed(2) ?? "N/A"}`);
        if (documentTypeField.source) {
          console.log(`  Source: ${documentTypeField.source}`);
        }
      }
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

module.exports = { main };
