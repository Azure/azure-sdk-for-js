// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to get model info using the Inference SDK.
 *
 * @summary get model info.
 */

import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<endpoint>";
const azureApiKey = process.env["AZURE_API_KEY"] || "<api key>";

export async function main() {
  console.log("== Get Model Info Sample ==");

  const client = new ModelClient(endpoint, new AzureKeyCredential(azureApiKey));
  const response = await client.path("/info").get();

  if (response.status !== "200") {
    throw response.body.error;
  }

  console.log(`Model name: ${response.body.model_name}, type: ${response.body.model_type}, provider name: ${response.body.model_provider_name}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
