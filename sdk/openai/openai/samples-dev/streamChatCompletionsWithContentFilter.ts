// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to get completions for the provided prompt and parse output for content filter
 *
 * @summary get completions.
 * @azsdk-weight 100
 */

import { OpenAI } from "openai";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
import "@azure/openai/types";
import "dotenv/config";

const endpoint = process.env["AZURE_OPENAI_ENDPOINT"];

export async function main(): Promise<void> {
  console.log("== Streaming Chat Completions Sample ==");

  if (!endpoint) {
    throw new Error("Please set the AZURE_OPENAI_ENDPOINT environment variable.");
  }
  const scope = "https://cognitiveservices.azure.com/.default";
  const azureADTokenProvider = getBearerTokenProvider(new DefaultAzureCredential(), scope);
  const deployment = "gpt-4o";
  const client = new OpenAI({ baseURL: endpoint + "/openai/v1", apiKey: azureADTokenProvider });
  const events = await client.chat.completions.create({
    messages: [{ role: "user", content: "< a prompt with content issues >" }],
    model: deployment,
    max_tokens: 128,
    stream: true,
  });

  for await (const event of events) {
    for (const choice of event.choices) {
      const content = choice.delta?.content;
      if (content) {
        process.stdout.write(content);
      }
      const filterResults = choice.content_filter_results;
      if (!filterResults) {
        continue;
      }
      if (filterResults.error) {
        console.log(
          `\tContent filter ran into an error ${filterResults.error.code}: ${filterResults.error.message}`,
        );
      } else {
        const { hate, sexual, self_harm, violence } = filterResults;
        if (hate && hate.filtered) {
          console.log("\tHate content was filtered with severity", hate.severity);
        }
        if (sexual && sexual.filtered) {
          console.log("\tSexual content was filtered with severity", sexual.severity);
        }
        if (self_harm && self_harm.filtered) {
          console.log("\tSelf-harm content was filtered with severity", self_harm.severity);
        }
        if (violence && violence.filtered) {
          console.log("\tViolent content was filtered with severity", violence.severity);
        }
      }
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
