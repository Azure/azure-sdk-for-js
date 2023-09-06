// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to analyze image.
 */

import ContentSafetyClient, {
  AnalyzeImageParameters,
  AnalyzeImageOptions,
  isUnexpected,
} from "@azure-rest/ai-content-safety";
import { AzureKeyCredential } from "@azure/core-auth";
import fs from "fs";
import path from "path";

// Load the .env file if it exists  
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const endpoint = process.env["CONTENT_SAFETY_ENDPOINT"] || "<endpoint>";
  const key = process.env["CONTENT_SAFETY_API_KEY"] || "<key>";

  const credential = new AzureKeyCredential(key);
  const client = ContentSafetyClient(endpoint, credential);

  const image_path = path.resolve(__dirname, "./sample_data/image.jpg");

  const imageBuffer = fs.readFileSync(image_path);
  const base64Image = imageBuffer.toString("base64");
  const analyzeImageOption: AnalyzeImageOptions = { image: { content: base64Image } };
  const analyzeImageParameters: AnalyzeImageParameters = { body: analyzeImageOption };

  const result = await client.path("/image:analyze").post(analyzeImageParameters);

  if (isUnexpected(result)) {
    throw result;
  }

  console.log("Hate severity: ", result.body.hateResult?.severity ?? 0);
  console.log("SelfHarm severity: ", result.body.selfHarmResult?.severity ?? 0);
  console.log("Sexual severity: ", result.body.sexualResult?.severity ?? 0);
  console.log("Violence severity: ", result.body.violenceResult?.severity ?? 0);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
