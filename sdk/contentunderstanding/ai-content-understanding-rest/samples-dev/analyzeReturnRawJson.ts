// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Return raw JSON from analysis.
 *
 * This sample demonstrates how to access the raw JSON response from analysis operations.
 * This is useful for scenarios where you need to inspect the full response structure exactly as returned by the service.
 *
 * About returning raw JSON:
 * The Content Understanding SDK provides a convenient object model approach that returns strongly-typed objects
 * with deeper navigation through the object model. However, sometimes you may need access to the raw JSON response for:
 *
 * - Easy inspection: View the complete response structure in the exact format returned by the service,
 *   making it easier to understand the full data model and discover available fields
 * - Debugging: Inspect the raw response to troubleshoot issues, verify service behavior, or understand unexpected results
 * - Advanced scenarios: Work with response structures that may change or include additional metadata not captured in the typed model
 *
 * Note: For most production scenarios, the object model approach is recommended as it provides type safety,
 * IntelliSense support, and easier navigation. Use raw JSON access when you specifically need the benefits listed above.
 *
 * @azsdk-weight 80
 */

import "dotenv/config";
import * as fs from "fs";
import * as path from "path";
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

  // Step 1: Create the client
  // For full client setup details, see the "Configure model deployment defaults" sample.
  console.log("\nStep 1: Creating Content Understanding client...");
  const credential = getCredential();
  console.log(
    `  Authentication: ${credential instanceof DefaultAzureCredential ? "DefaultAzureCredential" : "API Key"}`,
  );
  const client = new ContentUnderstandingClient(endpoint, credential);
  console.log("  Client created successfully");

  // Step 2: Analyze and return raw JSON
  // We first read the file bytes, then use the convenience method to analyze the document,
  // and finally access the raw response.
  console.log("\nStep 2: Reading sample file...");
  // Helper to get the directory of the current file (works in both ESM and CommonJS)
  const sampleDir = ((): string => {
    if (typeof __dirname !== "undefined") return __dirname;
    if (typeof process !== "undefined" && process.argv && process.argv[1]) {
      return path.dirname(process.argv[1]);
    }
    return path.resolve(process.cwd(), "samples-dev");
  })();
  const filePath = path.resolve(sampleDir, "./example-data", "sample_invoice.pdf");

  if (!fs.existsSync(filePath)) {
    console.error("Error: Sample file not found. Expected file:");
    console.error(`  - ${filePath}`);
    console.error(
      "\nPlease ensure sample_invoice.pdf exists in the sample's example-data directory.",
    );
    process.exit(1);
  }

  const fileBytes = fs.readFileSync(filePath);
  console.log(`  File: ${filePath}`);
  console.log(`  Size: ${fileBytes.length.toLocaleString()} bytes`);

  // Step 3: Analyze document
  console.log("\nStep 3: Analyzing document...");
  const analyzerId = "prebuilt-documentSearch";
  console.log(`  Analyzer: ${analyzerId}`);
  console.log("  Using protocol method to access raw JSON response");
  console.log("  Analyzing...");

  const poller = client.analyzeBinary(analyzerId, "application/pdf", fileBytes);
  await poller.pollUntilDone();
  console.log("  Analysis completed successfully");

  // Step 4: Get the raw JSON response
  console.log("\nStep 4: Getting raw JSON response...");

  // Get the operation ID from the poller to retrieve the full result
  // The poller's operationState contains internal configuration we can use
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const operationLocation = (poller as any).operationState?.config?.operationLocation;
  if (!operationLocation) {
    throw new Error("Could not retrieve operation location from poller");
  }

  const operationIdMatch = operationLocation.match(/analyzerResults\/([^?]+)/);
  if (!operationIdMatch) {
    throw new Error("Could not extract operation ID from operation location");
  }
  const operationId = operationIdMatch[1];

  // Variable to capture raw JSON from onResponse callback
  let rawJson: string | undefined;

  // Get the full operation status which includes the complete result
  await client.getResult(operationId, {
    onResponse: (response) => {
      rawJson = response.bodyAsText;
    },
  });

  // Use the raw JSON captured from onResponse
  if (!rawJson) {
    throw new Error("Failed to capture raw JSON from response");
  }

  // Parse the raw JSON to get the operation status and result
  const operationStatusParsed = JSON.parse(rawJson);

  // Step 5: Pretty-print raw JSON
  console.log("\nStep 5: Pretty-print raw JSON...");

  // Format and display the raw JSON response
  const prettyJson = JSON.stringify(operationStatusParsed, null, 2);
  console.log(prettyJson.substring(0, 500) + "..."); // Print first 500 chars to avoid cluttering console
  console.log(`  (Total length: ${prettyJson.length.toLocaleString()} characters)`);

  // Save to file for full inspection
  const outputDir = path.resolve(sampleDir, "./sample-output");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const outputFilename = `analyze_result_${timestamp}.json`;
  const outputPath = path.join(outputDir, outputFilename);

  fs.writeFileSync(outputPath, prettyJson, "utf-8");
  console.log(`  Full raw JSON response saved to: ${outputPath}`);

  console.log("\n" + "=".repeat(50));
  console.log("✓ Sample completed successfully");
  console.log("=".repeat(50));
  console.log("\nNOTE: For easier data access, prefer using the object model");
  console.log("      approach shown in the analyzeBinary sample instead of");
  console.log("      parsing raw JSON manually.");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
