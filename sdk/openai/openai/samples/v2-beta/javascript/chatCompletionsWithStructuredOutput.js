// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to get chat completions with structured output.
 *
 * @summary get chat completions with structured output.
 */

const { AzureOpenAI } = require("openai");
const { DefaultAzureCredential, getBearerTokenProvider } = require("@azure/identity");
const { z } = require("zod");
const { zodResponseFormat } = require("openai/helpers/zod");

// Set AZURE_OPENAI_ENDPOINT to the endpoint of your
// OpenAI resource. You can find this in the Azure portal.
// Load the .env file if it exists
require("dotenv/config");

async function main() {
  console.log("== Chat Completions With Structured Output Sample ==");

  const scope = "https://cognitiveservices.azure.com/.default";
  const azureADTokenProvider = getBearerTokenProvider(new DefaultAzureCredential(), scope);
  const deployment = "gpt-4o-2024-08-06";
  const apiVersion = "2025-01-01-preview";
  const client = new AzureOpenAI({ azureADTokenProvider, deployment, apiVersion });

  const Step = z.object({
    explanation: z.string(),
    output: z.string(),
  });
  const MathResponse = z.object({
    steps: z.array(Step),
    final_answer: z.string(),
  });
  const result = await client.beta.chat.completions.parse({
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

module.exports = { main };
