// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to analyze image.
 */

const { ContentSafetyClient } = require("@azure/ai-content-safety");
const { AzureKeyCredential } = require("@azure/core-auth");
const fs = require("node:fs");
const path = require("node:path");
require("dotenv/config");

async function main() {
  const endpoint = process.env["CONTENT_SAFETY_ENDPOINT"] || "<endpoint>";
  const key = process.env["CONTENT_SAFETY_API_KEY"] || "<key>";

  const credential = new AzureKeyCredential(key);
  const client = new ContentSafetyClient(endpoint, credential);

  const image_path = path.resolve(__dirname, "./example-data/image.png");

  const imageBuffer = fs.readFileSync(image_path);
  const result = await client.analyzeImage({ image: { content: imageBuffer } });

  for (let i = 0; i < result.categoriesAnalysis.length; i++) {
    const imageCategoriesAnalysisOutput = result.categoriesAnalysis[i];
    console.log(
      imageCategoriesAnalysisOutput.category,
      " severity: ",
      imageCategoriesAnalysisOutput.severity,
    );
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
