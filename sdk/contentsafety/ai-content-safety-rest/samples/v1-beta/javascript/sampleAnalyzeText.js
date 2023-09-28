// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to analyze text.
 */

const ContentSafetyClient = require("@azure-rest/ai-content-safety").default,
  { isUnexpected } = require("@azure-rest/ai-content-safety");
const { AzureKeyCredential } = require("@azure/core-auth");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  const endpoint = process.env["CONTENT_SAFETY_ENDPOINT"] || "<endpoint>";
  const key = process.env["CONTENT_SAFETY_API_KEY"] || "<key>";

  const credential = new AzureKeyCredential(key);
  const client = ContentSafetyClient(endpoint, credential);

  const text = "This is a sample text";
  const analyzeTextOption = { text: text };
  const analyzeTextParameters = { body: analyzeTextOption };

  const result = await client.path("/text:analyze").post(analyzeTextParameters);

  if (isUnexpected(result)) {
    throw result;
  }

  console.log("Hate severity: ", result.body.hateResult?.severity);
  console.log("SelfHarm severity: ", result.body.selfHarmResult?.severity);
  console.log("Sexual severity: ", result.body.sexualResult?.severity);
  console.log("Violence severity: ", result.body.violenceResult?.severity);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
