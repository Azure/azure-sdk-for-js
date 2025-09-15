// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to stream text responses from Azure OpenAI.
 *
 * @summary streams text completions from Azure OpenAI.
 * @azsdk-weight 100
 */

import { AzureOpenAI } from "openai";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";

// Set AZURE_OPENAI_ENDPOINT to the endpoint of your
// OpenAI resource. You can find this in the Azure portal.
// Load the .env file if it exists
import "dotenv/config";

async function main() {
  const scope = "https://cognitiveservices.azure.com/.default";
  const azureADTokenProvider = getBearerTokenProvider(new DefaultAzureCredential(), scope);
  const deployment = "gpt-4-1106-preview";
  const apiVersion = "2025-04-01-preview";
  const client = new AzureOpenAI({ azureADTokenProvider, deployment, apiVersion });

  const runner = client.responses
    .stream({
      model: deployment,
      input: "solve 8x + 31 = 2",
    })
    .on("event", (event) => console.log(event))
    .on("response.output_text.delta", (diff) => process.stdout.write(diff.delta));

  for await (const event of runner) {
    console.log("event", event);
  }

  const result = await runner.finalResponse();
  console.log(result);
}

main();
