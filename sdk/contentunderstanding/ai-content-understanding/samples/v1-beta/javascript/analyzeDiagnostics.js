// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Read analysis diagnostic information from `AnalysisResult.infos`.
 *
 * Content Understanding analysis results can include diagnostic information in
 * `AnalysisResult.infos`. Diagnostics are represented as `ErrorModel` values with a
 * `code` and human-readable `message`.
 *
 * Diagnostic messages are intended for troubleshooting and can change as the service
 * evolves. Applications should:
 * - Treat messages as human-readable text, not structured telemetry.
 * - Handle unknown codes gracefully — new diagnostic codes may be introduced later.
 * - Use OpenTelemetry integration for structured monitoring / automation.
 *
 * The service currently uses the `LLMStats` code to report information about completion
 * and embedding calls made during the analysis. Example output:
 *
 * ```text
 * LLMStats: completion calls: 2; embedding calls: 1; avg completion latency: 5.75s; total completion latency: 11.50s; avg embedding latency: 0.94s; total embedding latency: 0.94s
 * ```
 *
 * Consumers should handle unknown codes because additional diagnostic codes may be
 * introduced later.
 *
 * This sample requires service API version `2026-06-01-preview`.
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
  console.log("== Analysis Diagnostics Sample ==");

  const endpoint = process.env["CONTENTUNDERSTANDING_ENDPOINT"];
  if (!endpoint) {
    throw new Error("CONTENTUNDERSTANDING_ENDPOINT is required.");
  }

  const client = new ContentUnderstandingClient(endpoint, getCredential());

  const invoiceUrl =
    "https://raw.githubusercontent.com/Azure-Samples/azure-ai-content-understanding-assets/main/document/invoice.pdf";
  console.log(`Analyzing ${invoiceUrl} with prebuilt-invoice...`);

  const poller = client.analyze("prebuilt-invoice", [{ url: invoiceUrl }]);
  const result = await poller.pollUntilDone();

  console.log(`\nAnalyzer: ${result.analyzerId}`);

  // After a completed analysis, diagnostic information is available on `result.infos`.
  // Treat messages as human-readable text. Use OpenTelemetry when you need structured
  // telemetry for monitoring or automation.
  const infos = result.infos ?? [];
  console.log(`\nDiagnostic infos: ${infos.length}`);
  if (infos.length === 0) {
    console.log("  (no diagnostics returned for this analysis)");
    return;
  }

  for (const info of infos) {
    console.log(`  ${info.code}: ${info.message}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
