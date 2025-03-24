// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to use structured output parsing with Azure OpenAI.
 *
 * @summary parses mathematical solutions into structured output using Azure OpenAI.
 * @azsdk-weight 100
 */

import { AzureOpenAI } from "openai";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";

// Set AZURE_OPENAI_ENDPOINT to the endpoint of your
// OpenAI resource. You can find this in the Azure portal.
// Load the .env file if it exists
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";

const Step = z.object({
  explanation: z.string(),
  output: z.string(),
});

const MathResponse = z.object({
  steps: z.array(Step),
  final_answer: z.string(),
});

async function main() {
  const scope = "https://cognitiveservices.azure.com/.default";
  const azureADTokenProvider = getBearerTokenProvider(new DefaultAzureCredential(), scope);
  const deployment = "gpt-4-1106-preview";
  const apiVersion = "2025-03-01-preview";
  const client = new AzureOpenAI({ azureADTokenProvider, deployment, apiVersion });

  const rsp = await client.responses.parse({
    input: "solve 8x + 31 = 2",
    model: "gpt-4o-2024-08-06",
    text: {
      format: zodTextFormat(MathResponse, "math_response"),
    },
  });

  console.log(rsp.output_parsed);
  console.log("answer: ", rsp.output_parsed?.final_answer);
}

main().catch(console.error);
