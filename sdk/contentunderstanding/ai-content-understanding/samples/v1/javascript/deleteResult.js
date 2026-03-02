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
  console.log("== Delete Result Sample ==");

  const endpoint = process.env["CONTENTUNDERSTANDING_ENDPOINT"];
  if (!endpoint) {
    throw new Error("CONTENTUNDERSTANDING_ENDPOINT is required.");
  }

  const client = new ContentUnderstandingClient(endpoint, getCredential());

  const documentUrl =
    "https://raw.githubusercontent.com/Azure-Samples/azure-ai-content-understanding-assets/main/document/invoice.pdf";

  console.log("Document Analysis Workflow");
  console.log("=".repeat(60));
  console.log(`  Document URL: ${documentUrl}`);
  console.log("  Analyzer: prebuilt-invoice");
  console.log("=".repeat(60));

  // Step 1: Start the analysis operation
  console.log("\nStep 1: Starting document analysis...");
  const poller = client.analyze("prebuilt-invoice", [{ url: documentUrl }]);

  // Get the operation ID from the poller state
  // We need to wait for at least one poll to get the operation location
  const result = await poller.pollUntilDone();
  const operationId = poller.operationId;

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
      const docContent = content;
      if (docContent.fields) {
        console.log(`  Total fields extracted: ${Object.keys(docContent.fields).length}`);
        const customerNameField = docContent.fields["CustomerName"];
        if (customerNameField) {
          console.log(`  Customer Name: ${customerNameField.value ?? "(not found)"}`);
        }
      }
    }
  }

  // Step 2: Delete the result
  console.log("\nStep 2: Deleting the analysis result...");
  console.log(`  Deleting result for operation: ${operationId}...`);

  await client.deleteResult(operationId);
  console.log("  Result deleted successfully!");

  // Step 3: Verify deletion by attempting to retrieve a result file
  console.log("\nStep 3: Verifying deletion...");
  try {
    // Attempt to get a result file - this will fail if the result was deleted
    await client.getResultFile(operationId, "result.json");
    console.log("  Warning: Result still exists (may take a moment to fully delete)");
  } catch (error) {
    const err = error;
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

module.exports = { main };
