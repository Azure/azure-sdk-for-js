// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * uses Azure Active Directory (RBAC) to authenticate to the Cognitive Services endpoint
 */

import {
  TextAnalyticsClient,
  DetectLanguageResult,
  DetectLanguageErrorResult,
  DetectLanguageSuccessResult
} from "@azure/ai-text-analytics";

import { DefaultAzureCredential } from "@azure/identity";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  console.log(`Running detectLanguages sample`);

  // DefaultAzureCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const credential = new DefaultAzureCredential();

  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["COGNITIVE_SERVICES_ENDPOINT"] || "<cognitive services endpoint>";

  const client = new TextAnalyticsClient(endpoint, credential);

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
