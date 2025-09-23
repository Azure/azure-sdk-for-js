// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to stream text responses from Azure OpenAI.
 *
 * @summary streams text completions from Azure OpenAI.
 * @azsdk-weight 100
 */

import { OpenAI } from "openai";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
import "dotenv/config";

const endpoint = process.env["AZURE_OPENAI_ENDPOINT"];

async function main(): Promise<void> {
  console.log("== Stream Responses Sample ==");

  if (!endpoint) {
    throw new Error("Please set the AZURE_OPENAI_ENDPOINT environment variable.");
  }

  const scope = "https://cognitiveservices.azure.com/.default";
  const azureADTokenProvider = getBearerTokenProvider(new DefaultAzureCredential(), scope);
  const deployment = "gpt-4o";
  const client = new OpenAI({ baseURL: endpoint + "/openai/v1", apiKey: azureADTokenProvider });

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
