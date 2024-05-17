// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to use the AOAI assistants API with the code interpreter tool
 *
 *
 * @summary interpreting code.
 */

import { AzureOpenAI } from "openai";
import { getBearerTokenProvider, DefaultAzureCredential } from "@azure/identity";

export async function main() {
  // Create AzureOpenAI client with Microsoft Entra ID 
  const credential = new DefaultAzureCredential();
  const scope = "https://cognitiveservices.azure.com/.default";

  const client = new AzureOpenAI({
    azureADTokenProvider: getBearerTokenProvider(credential, scope),
  });

  // Create an assistant using code interpreter tool
  const assistant = await client.beta.assistants.create({
    tools: [{ type: "code_interpreter" }],
    model: "gpt-4-1106-preview",
    name: "JS CI Math Tutor",
    description: "Math Tutor for Math Problems",
    instructions: "You are a personal math tutor. Write and run code to answer math questions.",
    metadata: { foo: "bar" },
  });

  // Create a new thread
  const thread = await client.beta.threads.create();
  const question = "I need to solve the equation '3x + 11 = 14'. Can you help me?";
  const role = "user";

  // Create a message on the thread
  await client.beta.threads.messages.create(thread.id, {
    role,
    content: question,
  });

  // Start a new run with instructions
  const instructions = "Please address the user as Jane Doe. The user has a premium account.";
  let run = await client.beta.threads.runs.create(thread.id, {
    assistant_id: assistant.id,
    instructions,
  });

  // Wait for the run to complete by checking the status
  while (run.status === "queued" || run.status === "in_progress") {
    await new Promise((resolve) => setTimeout(resolve, 500));
    run = await client.beta.threads.runs.retrieve(thread.id, run.id);
  }

  // Check for potential error
  if (run.status === "failed") {
    throw new Error(run.last_error?.message)
  }

  // Retrieve the messages from the run
  const runMessages = await client.beta.threads.messages.list(thread.id);
  for (const runMessageDatum of runMessages.data) {
    for (const item of runMessageDatum.content) {
      switch(item.type) {
        case "text": {
          console.log(`${runMessageDatum.role}: ${item.text.value}`)
          break;
        } default: {
          console.log(`Unhandled item type: ${item.type}`)
        }
      }
    }
  }
}


main().catch((err) => {
  console.error("The sample encountered an error:", err);
});