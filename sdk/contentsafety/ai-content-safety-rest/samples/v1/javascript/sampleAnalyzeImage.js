// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to analyze image.
 */

const ContentSafetyClient = require("@azure-rest/ai-content-safety").default,
  { isUnexpected } = require("@azure-rest/ai-content-safety");
const { AzureKeyCredential } = require("@azure/core-auth");
const fs = require("fs");
const path = require("path");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  const endpoint = process.env["CONTENT_SAFETY_ENDPOINT"] || "<endpoint>";
  const key = process.env["CONTENT_SAFETY_API_KEY"] || "<key>";

  const credential = new AzureKeyCredential(key);
  const client = ContentSafetyClient(endpoint, credential);

  const image_path = path.resolve(__dirname, "./samples-dev/example-data/image.png");

  const imageBuffer = fs.readFileSync(image_path);
  const base64Image = imageBuffer.toString("base64");
  const analyzeImageOption = { image: { content: base64Image } };
  const analyzeImageParameters = { body: analyzeImageOption };

  const result = await client.path("/image:analyze").post(analyzeImageParameters);

  if (isUnexpected(result)) {
    throw result;
  }

  for (let i = 0; i < result.body.categoriesAnalysis.length; i++) {
    const imageCategoriesAnalysisOutput = result.body.categoriesAnalysis[i];
    console.log(
      imageCategoriesAnalysisOutput.category,
      " severity: ",
      imageCategoriesAnalysisOutput.severity
    );
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
