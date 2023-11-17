// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to analyze text.
 */

import ContentSafetyClient, {
  AnalyzeTextParameters,
  AnalyzeTextOptions,
  TextCategoriesAnalysisOutput,
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

  for (let i = 0; i < result.body.categoriesAnalysis.length; i++) {
    const textCategoriesAnalysisOutput: TextCategoriesAnalysisOutput = result.body.categoriesAnalysis[i];
    console.log(textCategoriesAnalysisOutput.category, " severity: ", textCategoriesAnalysisOutput.severity)
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
