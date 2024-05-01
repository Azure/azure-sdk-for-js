// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to use the AOAI assistants API with additional knowledge from uploaded files.
 * 
 *
 * @summary assistants code.
 */

import { AssistantsClient, OpenAIKeyCredential } from "@azure/openai-assistants";

const nonAzureKey = process.env["OPENAI_API_KEY"] || "<openai key>";

export async function main() {
  const assistantsClient = new AssistantsClient(new OpenAIKeyCredential(nonAzureKey));
  // File upload sample code
  const filename = "sample_file_for_upload.txt";
  const uint8array = new TextEncoder().encode("The word 'apple' uses the code 442345, while the word 'banana' uses the code 673457.");
  const uploadAssistantFile = await assistantsClient.files.uploadFile(uint8array, "assistants", { filename });
  console.log(uploadAssistantFile);
  const fileAssistantResponse = await assistantsClient.assistants.createAssistant({
    model: "gpt-4-0125-Preview",
    name: "JS SDK Test Assistant - Retrieval",
    instructions: "Please address the user as Jane Doe. The user has a premium account.",
    tools: [{ type: "retrieval" }],
    fileIds: [ uploadAssistantFile.id ]
  });
  console.log(fileAssistantResponse);

  const assistantThread = await assistantsClient.assistantThreads.createThread({});
  console.log(assistantThread);

  const question = "I need to know codes for apple and banana. Can you help me?";
  const threadResponse = await assistantsClient.threadMessages.createMessage(
    assistantThread.id,
    "user",
    question
  );
  console.log(threadResponse);
  let runResponse = await assistantsClient.threadRuns.createRun(
    assistantThread.id,
    fileAssistantResponse.id,
    {
      requestOptions: { timeout: 10000 },
      instructions: "You are a helpful assistant that can help fetch data from files you know about.",
      tools: [{ type: "retrieval" }],
    },
  );
  console.log(runResponse);

  do {
    await new Promise((r) => setTimeout(r, 500));
    runResponse = await assistantsClient.threadRuns.retrieveRun(assistantThread.id, runResponse.id);
    console.log(runResponse);
    const runSteps = await assistantsClient.runSteps.listRunSteps(
      assistantThread.id,
      runResponse.id,
      {
        requestOptions: {},
        limit: 1,
      }
    );
    console.log(runSteps);
  } while (runResponse.status === "queued" || runResponse.status === "in_progress");

  const runMessages = await assistantsClient.threadMessages.listMessages(assistantThread.id);
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
