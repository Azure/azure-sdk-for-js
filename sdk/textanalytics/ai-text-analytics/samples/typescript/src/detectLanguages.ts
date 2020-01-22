// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * detects the language of a piece of text
 */

import {
  TextAnalyticsClient,
  CognitiveServicesCredential,
  DetectLanguageResult,
  DetectLanguageErrorResult,
  DetectLanguageSuccessResult
} from "@azure/ai-text-analytics";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  console.log(`Running detectLanguages sample`);

  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["ENDPOINT"] || "<cognitive services endpoint>";
  const subscriptionKey = process.env["SUBSCRIPTION_KEY"] || "<subscription key>";

  const client = new TextAnalyticsClient(
    endpoint,
    new CognitiveServicesCredential(subscriptionKey)
  );

  const [result] = await client.detectLanguages(["hello world"]);

  if (isSuccess(result)) {
    console.log(`Primary language detected as ${result.primaryLanguage.name}`);
  }
}

function isSuccess(result: DetectLanguageResult): result is DetectLanguageSuccessResult {
  return !(result as DetectLanguageErrorResult).error;
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

