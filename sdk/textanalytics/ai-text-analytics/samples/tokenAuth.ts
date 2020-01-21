// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// NOTE: replace with import { TextAnalyticsClient } from "@azure/ai-text-analytics"
// in a standalone project
import {
  TextAnalyticsClient,
  DetectLanguageResult,
  DetectLanguageErrorResult,
  DetectLanguageSuccessResult
} from "../src";
import { DefaultAzureCredential } from "@azure/identity";

export async function run() {
  console.log(`Running detectLanguages sample`);

  // DefaultAzureCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const credential = new DefaultAzureCredential();

  // You will need to set this environment variable too
  const endPoint = process.env["AZ_CONFIG_ENDPOINT"]!;

  const client = new TextAnalyticsClient(endPoint, credential);

  const [result] = await client.detectLanguages(["hello world"]);

  if (result.isSuccess) {
    console.log(`Primary language detected as ${result.primaryLanguage.name}`);
  }
}

// If you want to run this sample from a console
// uncomment these lines so run() will get called
// run().catch((err) => {
//   console.log(`ERROR: ${err}`);
// });
