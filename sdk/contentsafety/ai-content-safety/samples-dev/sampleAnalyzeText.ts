// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to analyze text.
 */

import { ContentSafetyClient } from "@azure/ai-content-safety";
import { AzureKeyCredential } from "@azure/core-auth";
import "dotenv/config";

async function main(): Promise<void> {
  const endpoint = process.env["CONTENT_SAFETY_ENDPOINT"] || "<endpoint>";
  const key = process.env["CONTENT_SAFETY_API_KEY"] || "<key>";

  const credential = new AzureKeyCredential(key);
  const client = new ContentSafetyClient(endpoint, credential);

  const text = "This is a sample text";
  const result = await client.analyzeText({ text });

  for (let i = 0; i < result.categoriesAnalysis.length; i++) {
    const textCategoriesAnalysisOutput = result.categoriesAnalysis[i];
    console.log(
      textCategoriesAnalysisOutput.category,
      " severity: ",
      textCategoriesAnalysisOutput.severity,
    );
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
