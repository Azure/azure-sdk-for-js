// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to run a basic chat completions operation
 * using the AIProjectClient and OpenAI clients.
 *
 * @summary Given an AIProjectClient, this sample demonstrates how to get an OpenAI client
 * and use it to run chat completions with a deployed model.
 */

import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import type { ChatCompletionMessageParam } from "openai/resources/index";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint string>";
const modelName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Give me one fun fact about the Eiffel Tower." },
  ];

  // [START chat_completions]
  const completion = await openAIClient.chat.completions.create({
    model: modelName,
    messages,
    temperature: 0,
  });
  // [END chat_completions]

  const assistantMessage = completion.choices[0].message.content;
  console.log(`Assistant: ${assistantMessage}`);

  messages.push({ role: "assistant", content: assistantMessage });
  messages.push({ role: "user", content: "Now give me one related fun fact." });

  const completion2 = await openAIClient.chat.completions.create({
    model: modelName,
    messages,
    temperature: 0,
  });

  const assistantMessage2 = completion2.choices[0].message.content;
  console.log(`Assistant: ${assistantMessage2}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
