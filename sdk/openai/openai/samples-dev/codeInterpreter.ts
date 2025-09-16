// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to use the Responses API with the code interpreter tool
 *
 *
 * @summary interpreting code.
 * @azsdk-weight 100
 */

import { OpenAI } from "openai";
import { getBearerTokenProvider, DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const endpoint = process.env["AZURE_OPENAI_ENDPOINT"];

export async function main(): Promise<void> {
  if (!endpoint) {
    throw new Error("Please set the AZURE_OPENAI_ENDPOINT environment variable.");
  }
  // Create AzureOpenAI client with Microsoft Entra ID
  const credential = new DefaultAzureCredential();
  const scope = "https://cognitiveservices.azure.com/.default";
  const azureADTokenProvider = getBearerTokenProvider(credential, scope);

  const client = new OpenAI({
    baseURL: endpoint + "/openai/v1",
    apiKey: azureADTokenProvider,
  });

  const runner = client.responses.stream({
    model: "gpt-4o",
    input: "solve 8x + 31 = 2",
    tools: [{ type: "code_interpreter", container: { type: "auto" } }],
    background: true,
  });

  let response_id: string | undefined = undefined;

  for await (const event of runner) {
    if (event.type === "response.created") {
      response_id = event.response.id;
    }

    console.log("event", event);
    if (event.sequence_number === 10) {
      break;
    }
  }

  if (!response_id) {
    throw new Error("Response ID not found");
  }

  console.log("Interrupted. Continuing...");

  const runner2 = client.responses.stream({
    response_id,
    starting_after: 10,
  });

  for await (const event of runner2) {
    console.log("event", event);
  }

  const result = await runner2.finalResponse();
  for (const output of result.output) {
    switch (output.type) {
      case "message": {
        console.log("Message:", output.content);
        break;
      }
      default:
        console.log("Output:", JSON.stringify(output, null, 2));
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
