// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to use the AOAI assistants API.
 *
 *
 * @summary assistants code.
 * @azsdk-weight 100
 */

import { AssistantsClient, OpenAIKeyCredential } from "@azure/openai-assistants";

const nonAzureKey = process.env["OPENAI_API_KEY"] || "<openai key>";

export async function main() {
  const assistantsClient = new AssistantsClient(new OpenAIKeyCredential(nonAzureKey));

  const assistantResponse = await assistantsClient.createAssistant({
    model: "gpt-4-1106-preview",
    name: "JS Math Tutor",
    instructions: "You are a personal math tutor. Write and run code to answer math questions.",
    tools: [{ type: "code_interpreter" }],
  });
  console.log(assistantResponse);
  const assistantThread = await assistantsClient.createThread({});
  console.log(assistantThread);

  const question = "I need to solve the equation '3x + 11 = 14'. Can you help me?";
  const threadResponse = await assistantsClient.createMessage(assistantThread.id, "user", question);
  console.log(threadResponse);
  let runResponse = await assistantsClient.createRun(
    assistantThread.id,
    {
      assistantId: assistantResponse.id,
      instructions: "Please address the user as Jane Doe. The user has a premium account.",
    },
    {
      requestOptions: { timeout: 10000 },
    },
  );
  console.log(runResponse);

  do {
    await new Promise((r) => setTimeout(r, 500));
    runResponse = await assistantsClient.getRun(assistantThread.id, runResponse.id);
    const runSteps = await assistantsClient.listRunSteps(assistantThread.id, runResponse.id, {
      limit: 1,
    });
    console.log(runSteps);
  } while (runResponse.status === "queued" || runResponse.status === "in_progress");

  const runMessages = await assistantsClient.listMessages(assistantThread.id);
  for (const runMessageDatum of runMessages.data) {
    for (const item of runMessageDatum.content) {
      if (item.type === "text") {
        console.log(item.text?.value);
      } else if (item.type === "image_file") {
        console.log(item.imageFile?.fileId);
      }
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
