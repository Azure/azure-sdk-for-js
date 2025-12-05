// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Access the raw JSON response from analysis operations.
 *
 * This sample demonstrates how to access the raw JSON response from analysis operations.
 * This is useful for advanced scenarios where you need direct access to the JSON structure.
 *
 * The Content Understanding SDK provides two approaches for accessing analysis results:
 * 1. Object model approach (recommended): Returns strongly-typed AnalyzeResult objects
 * 2. Serializing to JSON: Convert the result to JSON for custom processing
 *
 * For production use, prefer the object model approach as it provides:
 * - Type safety
 * - IntelliSense support
 * - Easier navigation of results
 * - Better error handling
 *
 * Use raw JSON only when you need:
 * - Custom JSON processing
 * - Direct access to the raw response structure
 * - Integration with custom JSON parsers
 *
 * @azsdk-weight 80
 */

import "dotenv/config";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { DefaultAzureCredential } from "@azure/identity";
import { AzureKeyCredential } from "@azure/core-auth";
import { ContentUnderstandingClient } from "@azure-rest/ai-content-understanding";

function getCredential(): DefaultAzureCredential | AzureKeyCredential {
  const key = process.env["AZURE_CONTENT_UNDERSTANDING_KEY"];
  if (key) {
    return new AzureKeyCredential(key);
  }
  return new DefaultAzureCredential();
}

export async function main(): Promise<void> {
  console.log("== Analyze Return Raw JSON Sample ==");

  const endpoint = process.env["AZURE_CONTENT_UNDERSTANDING_ENDPOINT"];
  if (!endpoint) {
    throw new Error("AZURE_CONTENT_UNDERSTANDING_ENDPOINT is required.");
  }

  const client = new ContentUnderstandingClient(endpoint, getCredential());

  // Read PDF bytes from disk
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.resolve(__dirname, "./example-data", "sample_invoice.pdf");

  if (!fs.existsSync(filePath)) {
    console.error("Error: Sample file not found. Expected file:");
    console.error(`  - ${filePath}`);
    console.error(
      "\nPlease ensure sample_invoice.pdf exists in the sample's example-data directory.",
    );
    process.exit(1);
  }

  const fileBytes = fs.readFileSync(filePath);
  console.log(`Analyzing ${filePath} with prebuilt-documentSearch...`);

  // Use the standard method which returns an AnalyzeResult
  const poller = client.analyzeBinary("prebuilt-documentSearch", "application/pdf", fileBytes);
  const result = await poller.pollUntilDone();

  // Convert to JSON for raw access
  const prettyJson = JSON.stringify(result, null, 2);

  // Create output directory if it doesn't exist
  const outputDir = path.resolve(__dirname, "./sample-output");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Save to file
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const outputFilename = `analyze_result_${timestamp}.json`;
  const outputPath = path.join(outputDir, outputFilename);

  fs.writeFileSync(outputPath, prettyJson, "utf-8");

  console.log(`\nRaw JSON response saved to: ${outputPath}`);
  console.log(`File size: ${prettyJson.length.toLocaleString()} characters`);

  // Show a preview of the JSON structure
  console.log("\nJSON structure preview:");
  console.log("=".repeat(50));
  const previewLines = prettyJson.split("\n").slice(0, 30);
  console.log(previewLines.join("\n"));
  if (prettyJson.split("\n").length > 30) {
    console.log("... (truncated)");
  }
  console.log("=".repeat(50));

  // Show top-level keys
  console.log("\nTop-level properties in result:");
  for (const key of Object.keys(result)) {
    const value = (result as Record<string, unknown>)[key];
    const valueType = Array.isArray(value) ? `array[${value.length}]` : typeof value;
    console.log(`  - ${key}: ${valueType}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
