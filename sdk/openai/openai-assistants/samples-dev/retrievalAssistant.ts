// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to use the AOAI assistants API with additional knowledge from uploaded files.
 *
 *
 * @summary assistants code.
 * @azsdk-weight 100
 */

import { AssistantsClient, OpenAIKeyCredential } from "@azure/openai-assistants";

const nonAzureKey = process.env["OPENAI_API_KEY"] || "<openai key>";

export async function main() {
  const assistantsClient = new AssistantsClient(new OpenAIKeyCredential(nonAzureKey));
  // File upload sample code
  const filename = "sample_file_for_upload.txt";
  const uint8array = new TextEncoder().encode(
    "The word 'apple' uses the code 442345, while the word 'banana' uses the code 673457.",
  );
  const uploadAssistantFile = await assistantsClient.uploadFile(uint8array, "assistants", {
    filename,
  });
  console.log(uploadAssistantFile);
  const fileAssistant = await assistantsClient.createAssistant({
    model: "gpt-4-1106-preview",
    name: "JS SDK Test Assistant - Retrieval",
    instructions: "Please address the user as Jane Doe. The user has a premium account.",
    tools: [{ type: "retrieval" }],
    fileIds: [uploadAssistantFile.id],
  });
  console.log(fileAssistant);

  const assistantThread = await assistantsClient.createThread({});
  console.log(assistantThread);

  const question = "I need to know codes for apple and banana. Can you help me?";
  const threadResponse = await assistantsClient.createMessage(assistantThread.id, "user", question);
  console.log(threadResponse);
  let runResponse = await assistantsClient.createRun(
    assistantThread.id,
    {
      assistantId: fileAssistant.id,
      instructions:
        "You are a helpful assistant that can help fetch data from files you know about.",
      tools: [{ type: "retrieval" }],
    },
    {
      requestOptions: { timeout: 10000 },
    },
  );
  console.log(runResponse);

  do {
    await new Promise((r) => setTimeout(r, 500));
    runResponse = await assistantsClient.getRun(assistantThread.id, runResponse.id);
    console.log(runResponse);
    const runSteps = await assistantsClient.listRunSteps(assistantThread.id, runResponse.id, {
      requestOptions: {},
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
