// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Return raw JSON from analysis.
 *
 * This sample demonstrates how to access the raw JSON response from analysis operations
 * using a custom pipeline policy. This is useful for scenarios where you need to inspect
 * the full response structure exactly as returned by the service.
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
import { ContentUnderstandingClient } from "@azure/ai-content-understanding";
import type {
  PipelinePolicy,
  PipelineResponse,
  SendRequest,
  PipelineRequest,
} from "@azure/core-rest-pipeline";

function getCredential(): DefaultAzureCredential | AzureKeyCredential {
  const key = process.env["CONTENTUNDERSTANDING_KEY"];
  if (key) {
    return new AzureKeyCredential(key);
  }
  return new DefaultAzureCredential();
}

export async function main(): Promise<void> {
  console.log("== Analyze Return Raw JSON Sample ==");

  const endpoint = process.env["CONTENTUNDERSTANDING_ENDPOINT"];
  if (!endpoint) {
    throw new Error("CONTENTUNDERSTANDING_ENDPOINT is required.");
  }

  // Step 1: Create the client
  console.log("\nStep 1: Creating Content Understanding client...");
  const credential = getCredential();
  console.log(
    `  Authentication: ${credential instanceof DefaultAzureCredential ? "DefaultAzureCredential" : "API Key"}`,
  );
  const client = new ContentUnderstandingClient(endpoint, credential);
  console.log("  Client created successfully");

  // Step 2: Read sample file
  console.log("\nStep 2: Reading sample file...");

  // Assets folder is at ../assets relative to samples/v1/javascript or samples/v1/typescript
  const filePath = path.join("..", "..", "assets", "sample_invoice.pdf");
  const fileBytes = fs.readFileSync(filePath);
  console.log(`  File: ${filePath}`);
  console.log(`  Size: ${fileBytes.length.toLocaleString()} bytes`);

  // Step 3: Analyze document with raw response capture
  // Add a pipeline policy JUST for this operation to capture raw JSON
  console.log("\nStep 3: Analyzing document with raw JSON capture...");
  const analyzerId = "prebuilt-documentSearch";
  console.log(`  Analyzer: ${analyzerId}`);

  // Create and add policy to capture raw responses for this operation only
  let rawResponse: PipelineResponse | undefined;
  const capturePolicy: PipelinePolicy = {
    name: "captureRawResponse",
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      const response = await next(request);
      rawResponse = response;
      return response;
    },
  };
  client.pipeline.addPolicy(capturePolicy);
  console.log("  Added temporary capture policy");

  const poller = client.analyzeBinary(analyzerId, fileBytes);
  console.log("  Polling for completion...");
  await poller.pollUntilDone();
  console.log("  Analysis completed successfully");

  // Remove the capture policy immediately after the operation
  client.pipeline.removePolicy({ name: "captureRawResponse" });
  console.log("  Removed capture policy (other client calls are unaffected)");

  // Step 4: Process the captured raw JSON
  console.log("\nStep 4: Processing captured raw JSON...");

  if (!rawResponse?.bodyAsText) {
    throw new Error("Failed to capture raw JSON from response");
  }

  const rawJson = rawResponse.bodyAsText;

  // Parse the raw JSON
  const operationStatusParsed = JSON.parse(rawJson);

  // Step 5: Pretty-print raw JSON
  console.log("\nStep 5: Pretty-print raw JSON...");

  // Format and display the raw JSON response
  const prettyJson = JSON.stringify(operationStatusParsed, null, 2);
  console.log(prettyJson.substring(0, 500) + "..."); // Print first 500 chars to avoid cluttering console
  console.log(`  (Total length: ${prettyJson.length.toLocaleString()} characters)`);

  // Save to file for full inspection
  const outputDir = path.resolve(".", "sample-output");
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
