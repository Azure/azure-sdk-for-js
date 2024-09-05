// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to get model info using the Inference SDK.
 *
 * @summary Get model info.
 */

import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { DefaultAzureCredential } from "@azure/identity";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<endpoint>";

export async function main() {
  console.log("== Get Model Info Sample ==");

  const client = ModelClient(endpoint, new DefaultAzureCredential()));
  const response = await client.path("/info").get();

  if (isUnexpected(response)) {
    throw response.body.error;
  }

  console.log(`Model name: ${response.body.model_name}, type: ${response.body.model_type}, provider name: ${response.body.model_provider_name}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
