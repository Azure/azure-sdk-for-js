// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Access the raw JSON response from analysis operations.
 *
 * This sample demonstrates how to access the raw JSON response from analysis operations
 * using the protocol method and onResponse callback to capture the raw response.
 *
 * IMPORTANT NOTES:
 * - The SDK returns analysis results with an object model, which is easier to navigate and retrieve
 *   the desired results compared to parsing raw JSON
 * - This sample is ONLY for demonstration purposes to show how to access raw JSON responses
 * - For production use, prefer the object model approach shown in the analyzeBinary sample
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
  console.log("\nStep 1: Creating Content Understanding client...");
  const credential = getCredential();
  console.log(
    `  Authentication: ${credential instanceof DefaultAzureCredential ? "DefaultAzureCredential" : "API Key"}`,
  );
  const client = new ContentUnderstandingClient(endpoint, credential);
  console.log("  Client created successfully");

  // Step 2: Read PDF bytes from disk
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

  // Step 3: Analyze document using the poller
  console.log("\nStep 3: Analyzing document...");
  const analyzerId = "prebuilt-documentSearch";
  console.log(`  Analyzer: ${analyzerId}`);
  console.log("  Using protocol method to access raw JSON response");
  console.log("  Analyzing...");

  const poller = client.analyzeBinary(analyzerId, "application/pdf", fileBytes);
  await poller.pollUntilDone();
  console.log("  Analysis completed successfully");

  // Step 4: Extract operation ID and fetch raw JSON using onResponse callback
  console.log("\nStep 4: Processing raw JSON response...");

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
  const result = operationStatusParsed.result;

  // Step 5: Save raw JSON to file
  console.log("\nStep 5: Saving raw JSON to file...");

  // Create output directory if it doesn't exist
  const outputDir = path.resolve(sampleDir, "./sample-output");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Save to file
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const outputFilename = `analyze_result_${timestamp}.json`;
  const outputPath = path.join(outputDir, outputFilename);

  fs.writeFileSync(outputPath, rawJson, "utf-8");

  console.log(`  Raw JSON response saved to: ${outputPath}`);
  console.log(`  File size: ${rawJson.length.toLocaleString()} characters`);

  // Step 6: Display key information from the parsed result
  console.log("\nStep 6: Displaying key information from response...");
  if (result.analyzerId) {
    console.log(`  Analyzer ID: ${result.analyzerId}`);
  }

  if (result.contents && result.contents.length > 0) {
    console.log(`  Contents count: ${result.contents.length}`);

    const firstContent = result.contents[0];
    if (firstContent.kind) {
      console.log(`  Content kind: ${firstContent.kind}`);
    }
    if (firstContent.mimeType) {
      console.log(`  MIME type: ${firstContent.mimeType}`);
    }
  }

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
