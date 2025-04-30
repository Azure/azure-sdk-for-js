// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use agent operations with code interpreter from the Azure Agents service.
 *
 * @summary demonstrates how to use agent operations with code interpreter.
 * @azsdk-weight 100
 *
 */

import type {
  MessageDeltaChunk,
  MessageDeltaTextContent,
  MessageImageFileContent,
  MessageTextContent,
  ThreadRun,
} from "@azure/ai-agents";
import {
  AgentsClient,
  DoneEvent,
  ErrorEvent,
  isOutputOfType,
  MessageStreamEvent,
  RunStreamEvent,
  ToolUtility,
} from "@azure/ai-agents";
import { DefaultAzureCredential } from "@azure/identity";

import * as fs from "fs";
import path from "node:path";
import "dotenv/config";

const connectionString = process.env["PROJECT_ENDPOINT"] || "<project connection string>";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "gpt-4o";

export async function main(): Promise<void> {
  // Create an Azure AI Client
  const client = new AgentsClient(connectionString, new DefaultAzureCredential());

  // Upload file and wait for it to be processed
  const filePath = "./data/nifty500QuarterlyResults.csv";
  const localFileStream = fs.createReadStream(filePath);
  const localFile = await client.uploadFile(localFileStream, "assistants", {
    fileName: "myLocalFile",
  });

  console.log(`Uploaded local file, file ID : ${localFile.id}`);

  // Create code interpreter tool
  const codeInterpreterTool = ToolUtility.createCodeInterpreterTool([localFile.id]);

  // Notice that CodeInterpreter must be enabled in the agent creation, otherwise the agent will not be able to see the file attachment
  const agent = await client.createAgent(modelDeploymentName, {
    name: "my-agent",
    instructions: "You are a helpful agent",
    tools: [codeInterpreterTool.definition],
    toolResources: codeInterpreterTool.resources,
  });
  console.log(`Created agent, agent ID: ${agent.id}`);

  // Create a thread
  const thread = await client.createThread();
  console.log(`Created thread, thread ID: ${thread.id}`);

  // Create a message
  const message = await client.createMessage(
    thread.id,
    "user",
    "Could you please create a bar chart in the TRANSPORTATION sector for the operating profit from the uploaded CSV file and provide the file to me?",
  );

  console.log(`Created message, message ID: ${message.id}`);

  // Create and execute a run
  const streamEventMessages = await client.createRun(thread.id, agent.id).stream();

  for await (const eventMessage of streamEventMessages) {
    switch (eventMessage.event) {
      case RunStreamEvent.ThreadRunCreated:
        console.log(`ThreadRun status: ${(eventMessage.data as ThreadRun).status}`);
        break;
      case MessageStreamEvent.ThreadMessageDelta:
        {
          const messageDelta = eventMessage.data as MessageDeltaChunk;
          messageDelta.delta.content.forEach((contentPart) => {
            if (contentPart.type === "text") {
              const textContent = contentPart as MessageDeltaTextContent;
              const textValue = textContent.text?.value || "No text";
              console.log(`Text delta received:: ${textValue}`);
            }
          });
        }
        break;

      case RunStreamEvent.ThreadRunCompleted:
        console.log("Thread Run Completed");
        break;
      case ErrorEvent.Error:
        console.log(`An error occurred. Data ${eventMessage.data}`);
        break;
      case DoneEvent.Done:
        console.log("Stream completed.");
        break;
    }
  }

  // Delete the original file from the agent to free up space (note: this does not delete your version of the file)
  await client.deleteFile(localFile.id);
  console.log(`Deleted file, file ID : ${localFile.id}`);

  // Print the messages from the agent
  const messages = await client.listMessages(thread.id);
  console.log("Messages:", messages);

  // Get most recent message from the assistant
  const assistantMessage = messages.data.find((msg) => msg.role === "assistant");
  if (assistantMessage) {
    const textContent = assistantMessage.content.find((content) =>
      isOutputOfType<MessageTextContent>(content, "text"),
    ) as MessageTextContent;
    if (textContent) {
      console.log(`Last message: ${textContent.text.value}`);
    }
  }

  // Save the newly created file
  console.log(`Saving new files...`);
  const imageFileOutput = messages.data[0].content[0] as MessageImageFileContent;
  const imageFile = imageFileOutput.imageFile.fileId;
  const imageFileName = path.resolve(
    "./data/" + (await client.getFile(imageFile)).filename + "ImageFile.png",
  );
  console.log(`Image file name : ${imageFileName}`);

  const fileContent = await (await client.getFileContent(imageFile).asNodeStream()).body;
  if (fileContent) {
    const chunks: Buffer[] = [];
    for await (const chunk of fileContent) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
    const buffer = Buffer.concat(chunks);
    fs.writeFileSync(imageFileName, buffer);
  } else {
    console.error("Failed to retrieve file content: fileContent is undefined");
  }
  console.log(`Saved image file to: ${imageFileName}`);

  // Iterate through messages and print details for each annotation
  console.log(`Message Details:`);
  await messages.data.forEach((m) => {
    console.log(`File Paths:`);
    console.log(`Type: ${m.content[0].type}`);
    if (isOutputOfType<MessageTextContent>(m.content[0], "text")) {
      const textContent = m.content[0] as MessageTextContent;
      console.log(`Text: ${textContent.text.value}`);
    }
    console.log(`File ID: ${m.id}`);
    console.log(`Start Index: ${messages.firstId}`);
    console.log(`End Index: ${messages.lastId}`);
  });

  // Delete the agent once done
  await client.agents.deleteAgent(agent.id);
  console.log(`Deleted agent, agent ID: ${agent.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
