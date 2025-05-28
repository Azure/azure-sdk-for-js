// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use agent operations with code interpreter from the Azure Agents service.
 *
 * @summary demonstrates how to use agent operations with code interpreter.
 */

import type { MessageImageFileContent, MessageTextContent } from "@azure/ai-agents";
import { AgentsClient, isOutputOfType, ToolUtility } from "@azure/ai-agents";
import { DefaultAzureCredential } from "@azure/identity";
import * as fs from "fs";
import path from "node:path";
import "dotenv/config";

const projectEndpoint = process.env["PROJECT_ENDPOINT"] || "<project endpoint>";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "gpt-4o";

export async function main(): Promise<void> {
  // Create an Azure AI Client
  const client = new AgentsClient(projectEndpoint, new DefaultAzureCredential());
  // Upload file and wait for it to be processed
  const filePath = "./data/nifty500QuarterlyResults.csv";
  const localFileStream = fs.createReadStream(filePath);
  const localFile = await client.files.upload(localFileStream, "assistants", {
    fileName: "localFile",
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
  const thread = await client.threads.create();
  console.log(`Created thread, thread ID: ${thread.id}`);

  // Create a message
  const message = await client.messages.create(
    thread.id,
    "user",
    "Could you please create a bar chart in the TRANSPORTATION sector for the operating profit from the uploaded CSV file and provide the file to me?",
    {
      attachments: [
        {
          fileId: localFile.id,
          tools: [codeInterpreterTool.definition],
        },
      ],
    },
  );

  console.log(`Created message, message ID: ${message.id}`);

  // Create and poll a run
  console.log("Creating run...");
  const run = await client.runs.createAndPoll(thread.id, agent.id, {
    pollingOptions: {
      intervalInMs: 2000,
    },
    onResponse: (response): void => {
      console.log(`Received response with status: ${response.status}`);
    },
  });
  console.log(`Run finished with status: ${run.status}`);

  // Delete the original file from the agent to free up space (note: this does not delete your version of the file)
  await client.files.delete(localFile.id);
  console.log(`Deleted file, file ID: ${localFile.id}`);

  // Print the messages from the agent
  const messagesIterator = client.messages.list(thread.id);
  const allMessages = [];
  for await (const m of messagesIterator) {
    allMessages.push(m);
  }
  console.log("Messages:", allMessages);

  // Get most recent message from the assistant
  const assistantMessage = allMessages.find((msg) => msg.role === "assistant");
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
  const imageFile = (allMessages[0].content[0] as MessageImageFileContent).imageFile;
  console.log(`Image file ID : ${imageFile.fileId}`);
  const imageFileName = path.resolve(
    "./data/" + (await client.files.get(imageFile.fileId)).filename + "ImageFile.png",
  );

  const fileContent = await (await client.files.getContent(imageFile.fileId).asNodeStream()).body;
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
  allMessages.forEach((m) => {
    console.log(`File Paths:`);
    console.log(`Type: ${m.content[0].type}`);
    if (isOutputOfType<MessageTextContent>(m.content[0], "text")) {
      const textContent = m.content[0] as MessageTextContent;
      console.log(`Text: ${textContent.text.value}`);
    }
    console.log(`File ID: ${m.id}`);
  });

  // Delete the agent once done
  await client.deleteAgent(agent.id);
  console.log(`Deleted agent, agent ID: ${agent.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
