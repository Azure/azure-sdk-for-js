// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to get chat completions with structured output.
 *
 * @summary get chat completions with structured output.
 * @azsdk-weight 100
 */

import { OpenAI } from "openai";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import "dotenv/config";

const endpoint = process.env["AZURE_OPENAI_ENDPOINT"];

export async function main(): Promise<void> {
  console.log("== Chat Completions With Structured Output Sample ==");

  if (!endpoint) {
    throw new Error("Please set the AZURE_OPENAI_ENDPOINT environment variable.");
  }

  const scope = "https://cognitiveservices.azure.com/.default";
  const azureADTokenProvider = getBearerTokenProvider(new DefaultAzureCredential(), scope);
  const deployment = "gpt-4o";
  const client = new OpenAI({ baseURL: endpoint + "/openai/v1", apiKey: azureADTokenProvider });

  const Step = z.object({
    explanation: z.string(),
    output: z.string(),
  });
  const MathResponse = z.object({
    steps: z.array(Step),
    final_answer: z.string(),
  });
  const result = await client.chat.completions.parse({
    model: deployment,
    messages: [
      {
        role: "system",
        content: "You are a helpful math tutor. Only use the schema for math responses.",
      },
      { role: "user", content: "solve 8x + 3 = 21" },
    ],
    response_format: zodResponseFormat(MathResponse, "mathResponse"),
  });
  const message = result.choices[0]?.message;
  if (message?.parsed) {
    console.log(message.parsed.steps);
    console.log(message.parsed.final_answer);
  } else {
    console.log(message.refusal);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
