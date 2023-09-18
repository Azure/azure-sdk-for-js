// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to analyze text.
 */

import ContentSafetyClient, {
  AnalyzeTextParameters,
  AnalyzeTextOptions,
  isUnexpected
} from "@azure-rest/ai-content-safety";
import { AzureKeyCredential } from "@azure/core-auth";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const endpoint = process.env["CONTENT_SAFETY_ENDPOINT"] || "<endpoint>";
  const key = process.env["CONTENT_SAFETY_API_KEY"] || "<key>";

  const credential = new AzureKeyCredential(key);
  const client = ContentSafetyClient(endpoint, credential);

  const text = "This is a sample text";
  const analyzeTextOption: AnalyzeTextOptions = { text: text };
  const analyzeTextParameters: AnalyzeTextParameters = { body: analyzeTextOption };

  const result = await client.path("/text:analyze").post(analyzeTextParameters);

  if (isUnexpected(result)) {
    throw result;
  }

  console.log("Hate severity: ", result.body.hateResult?.severity ?? "undefined");
  console.log("SelfHarm severity: ", result.body.selfHarmResult?.severity ?? "undefined");
  console.log("Sexual severity: ", result.body.sexualResult?.severity ?? "undefined");
  console.log("Violence severity: ", result.body.violenceResult?.severity ?? "undefined");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
