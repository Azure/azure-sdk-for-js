import { AssistantsClient, OpenAIKeyCredential } from "../src/index.js";

const nonAzureKey = process.env["OPENAI_API_KEY"] || "<openai key>";

export async function main() {
  const assistantsClient = new AssistantsClient(new OpenAIKeyCredential(nonAzureKey));

  const assistantResponse = await assistantsClient.assistants.createAssistant({
    model: "gpt-4-1106-preview",
    name: "JS Math Tutor",
    instructions: "You are a personal math tutor. Write and run code to answer math questions.",
    tools: [{ type: "code_interpreter" }],
  });
  console.log(assistantResponse);
  const assistantThread = await assistantsClient.assistantThreads.createThread({});
  console.log(assistantThread);

  const question = "I need to solve the equation '3x + 11 = 14'. Can you help me?";
  const threadResponse = await assistantsClient.threadMessages.createMessage(assistantThread.id, "user", question);
  console.log(threadResponse);
  let runResponse = await assistantsClient.threadRuns.createRun(assistantThread.id, assistantResponse.id, {
    requestOptions: { timeout: 10000 },
    instructions: "Please address the user as Jane Doe. The user has a premium account.",
  });
  console.log(runResponse);

  do {
    await new Promise((r) => setTimeout(r, 500));
    runResponse = await assistantsClient.threadRuns.retrieveRun(assistantThread.id, runResponse.id);
    const runSteps = await assistantsClient.runSteps.listRunSteps(assistantThread.id, runResponse.id, {
      requestOptions: {},
      limit: 1,
    });
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
/*
// File upload sample code
const filename = "sample_file_for_upload.txt";
const uint8array = new TextEncoder().encode("The word 'apple' uses the code 442345, while the word 'banana' uses the code 673457.");
const uploadAssistantFile = await assistantsClient.uploadFile(uint8array, "assistants", { filename });
console.log(uploadAssistantFile);
const fileAssistantResponse = await assistantsClient.createAssistant({
  model: "gpt-4-1106-preview",
  name: "JS SDK Test Assistant - Retrieval",
  instructions: "You are a helpful assistant that can help fetch data from files you know about.",
  tools: [{ type: "retrieval" }],
  fileIds: [ uploadAssistantFile.id ]
});
console.log(fileAssistantResponse);
*/
