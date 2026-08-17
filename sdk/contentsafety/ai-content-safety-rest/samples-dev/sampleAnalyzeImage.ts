// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to analyze image.
 */

import { ContentSafetyClient } from "@azure-rest/ai-content-safety";
import { AzureKeyCredential } from "@azure/core-auth";
import fs from "node:fs";
import path from "node:path";
import "dotenv/config";

async function main(): Promise<void> {
  const endpoint = process.env["CONTENT_SAFETY_ENDPOINT"] || "<endpoint>";
  const key = process.env["CONTENT_SAFETY_API_KEY"] || "<key>";

  const credential = new AzureKeyCredential(key);
  const client = new ContentSafetyClient(endpoint, credential);

  const image_path = path.resolve(__dirname, "./example-data/image.png");

  const imageBuffer = fs.readFileSync(image_path);

  const result = await client.analyzeImage({ image: { content: imageBuffer } });

  for (const categoryAnalysis of result.categoriesAnalysis) {
    console.log(categoryAnalysis.category, " severity: ", categoryAnalysis.severity);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
