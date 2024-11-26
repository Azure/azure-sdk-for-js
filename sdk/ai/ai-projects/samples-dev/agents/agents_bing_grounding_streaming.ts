
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * 
 * FILE: agents_bing_grounding_streaming.ts
 *
 * DESCRIPTION:
 *  This sample demonstrates how to use agent operations with the Grounding with Bing Search tool from
 *  the Azure Agents service using a asynchronous client and streaming.
 *
 * USAGE:
 *  npx ts-node agents_bing_grounding_streaming.ts
 *
 *  Before running the sample:
 *
 *  npm install @azure/ai-projects @azure/identity @azure/core-util dotenv
 *
 *  Set this environment variables with your own values:
 *  AZURE_AI_PROJECTS_CONNECTION_STRING - the Azure AI Project connection string, as found in your AI Studio Project
 *  BING_CONNECTION_NAME - the name of the connection with Bing search grounding
 */

import { AIProjectsClient, DoneEvent, ErrorEvent, MessageDeltaChunk, MessageDeltaTextContent, MessageStreamEvent, RunStreamEvent, ThreadRunOutput, fromConnectionId, connectionToolType, MessageContentOutput, isOutputOfType, MessageTextContentOutput } from "@azure/ai-projects"
import { DefaultAzureCredential } from "@azure/identity";

import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "<endpoint>>;<subscription>;<resource group>;<project>";

export async function main(): Promise<void> {
  const client = AIProjectsClient.fromConnectionString(connectionString || "", new DefaultAzureCredential());
  const bingConnection = await client.connections.getConnection(process.env["BING_CONNECTION_NAME"] || "<connection-name>");
  const connectionId = bingConnection.id;

  const bingTool = fromConnectionId(connectionToolType.BingGrounding, [connectionId]);

  const agent  = await client.agents.createAgent(
    "gpt-4-0125-preview", {
      name: "my-agent", 
      instructions: "You are a helpful agent",
      tools: [bingTool]
    }, {
      headers: {"x-ms-enable-preview": "true"}
    });
  console.log(connectionId)
  console.log(`Created agent, agent ID : ${agent.id}`);

  const thread = await client.agents.createThread()
  console.log(`Created thread, thread ID: ${thread.id}`);

  const message = await client.agents.createMessage(thread.id, {role: "user", content: "How does wikipedia explain Euler's Identity?"});
  console.log(`Created message, message ID: ${message.id}`);

  const streamEventMessages = await client.agents.createRunStreaming(thread.id, agent.id);

  for await (const eventMessage of streamEventMessages) {
    switch (eventMessage.event) {
      case RunStreamEvent.ThreadRunCreated:
        console.log(`ThreadRun status: ${(eventMessage.data as ThreadRunOutput).status}`)
        break;
      case MessageStreamEvent.ThreadMessageDelta:
        {
          const messageDelta = eventMessage.data as MessageDeltaChunk;
          messageDelta.delta.content.forEach((contentPart) => {
            if (contentPart.type === "text") {
              const textContent = contentPart as MessageDeltaTextContent
              const textValue = textContent.text?.value || "No text"
              console.log(`Text delta received:: ${textValue}`)
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

  client.agents.deleteAgent(agent.id)
  console.log(`Deleted agent, agent ID: ${agent.id}`);

  // Fetch and log all messages
  const messages = await client.agents.listMessages(thread.id)
  console.log(`Messages:`);
  const agentMessage: MessageContentOutput = messages.data[0].content[0];
  if (isOutputOfType<MessageTextContentOutput>(agentMessage, "text")) {
    const textContent = agentMessage as MessageTextContentOutput;
    console.log(`Text Message Content - ${textContent.text.value}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
