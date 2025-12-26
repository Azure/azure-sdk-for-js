// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Delete analysis results using the deleteResult API.
 *
 * This sample demonstrates how to delete analysis results using the deleteResult API.
 * This is useful for removing temporary or sensitive analysis results immediately, rather
 * than waiting for automatic deletion after 24 hours.
 *
 * Analysis results are stored temporarily and can be deleted using the deleteResult API:
 * - Immediate deletion: Results are marked for deletion and permanently removed
 * - Automatic deletion: Results are automatically deleted after 24 hours if not manually deleted
 * - Operation ID required: You need the operation ID from the analysis operation to delete
 *
 * Important: Once deleted, results cannot be recovered. Make sure you have saved any data
 * you need before deleting.
 */

import "dotenv/config";
import { DefaultAzureCredential } from "@azure/identity";
import { AzureKeyCredential } from "@azure/core-auth";
import { ContentUnderstandingClient } from "@azure-rest/ai-content-understanding";
import type { DocumentContent } from "@azure-rest/ai-content-understanding";

function getCredential(): DefaultAzureCredential | AzureKeyCredential {
  const key = process.env["AZURE_CONTENT_UNDERSTANDING_KEY"];
  if (key) {
    return new AzureKeyCredential(key);
  }
  return new DefaultAzureCredential();
}

export async function main(): Promise<void> {
  console.log("== Delete Result Sample ==");

  const endpoint = process.env["AZURE_CONTENT_UNDERSTANDING_ENDPOINT"];
  if (!endpoint) {
    throw new Error("AZURE_CONTENT_UNDERSTANDING_ENDPOINT is required.");
  }

  const client = new ContentUnderstandingClient(endpoint, getCredential());

  const documentUrl =
    "https://github.com/Azure-Samples/azure-ai-content-understanding-python/raw/refs/heads/main/data/invoice.pdf";

  console.log("Document Analysis Workflow");
  console.log("=".repeat(60));
  console.log(`  Document URL: ${documentUrl}`);
  console.log("  Analyzer: prebuilt-invoice");
  console.log("=".repeat(60));

  // Step 1: Start the analysis operation
  console.log("\nStep 1: Starting document analysis...");
  const poller = client.analyze("prebuilt-invoice", {
    inputs: [{ url: documentUrl }],
  });

  // Get the operation ID from the poller state
  // We need to wait for at least one poll to get the operation location
  const result = await poller.pollUntilDone();
  const operationLocation = (poller as any).operationState?.config?.operationLocation;
  let operationId: string | undefined;

  if (operationLocation) {
    // Extract operation ID from the operation location URL
    const match = operationLocation.match(/analyzerResults\/([^?]+)/);
    operationId = match?.[1];
  }

  if (!operationId) {
    console.error("Error: Could not extract operation ID from response");
    return;
  }

  console.log(`  Operation ID: ${operationId}`);
  console.log("Analysis completed successfully!");

  // Display some sample results
  if (result.contents && result.contents.length > 0) {
    const content = result.contents[0];
    if (content.kind === "document") {
      const docContent = content as DocumentContent;
      if (docContent.fields) {
        console.log(`  Total fields extracted: ${Object.keys(docContent.fields).length}`);
        const customerNameField = docContent.fields["CustomerName"];
        if (customerNameField && "valueString" in customerNameField) {
          console.log(`  Customer Name: ${customerNameField.valueString ?? "(not found)"}`);
        }
      }
    }
  }

  // Step 2: Delete the result
  console.log("\nStep 2: Deleting the analysis result...");
  console.log(`  Deleting result for operation: ${operationId}...`);

  await client.deleteResult(operationId);
  console.log("  Result deleted successfully!");

  // Step 3: Verify deletion by attempting to retrieve the result
  console.log("\nStep 3: Verifying deletion...");
  try {
    await client.getResult(operationId);
    console.log("  Warning: Result still exists (may take a moment to fully delete)");
  } catch (error: unknown) {
    const err = error as { statusCode?: number; message?: string };
    if (err.statusCode === 404 || (err.message && err.message.includes("404"))) {
      console.log("  Confirmed: Result no longer exists (404 Not Found)");
    } else {
      console.log(`  Unexpected error during verification: ${err.message}`);
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log("✓ Sample completed successfully");
  console.log("=".repeat(60));
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
