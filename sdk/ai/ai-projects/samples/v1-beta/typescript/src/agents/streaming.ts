// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use agent operations in streaming from the Azure Agents service.
 *
 * @summary demonstrates how to use agent operations in streaming.
 */

import type {
  MessageDeltaChunk,
  MessageDeltaTextContent,
  ThreadRun,
} from "@azure/ai-projects";
import {
  AIProjectClient,
  DoneEventEnum,
  ErrorEventEnum,
  MessageStreamEventEnum,
  RunStreamEventEnum,
} from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";

import * as dotenv from "dotenv";
dotenv.config();

const connectionString =
  process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "<project connection string>";

export async function main(): Promise<void> {
  const client = AIProjectClient.fromConnectionString(
    connectionString || "",
    new DefaultAzureCredential(),
  );

  const agent = await client.agents.createAgent("gpt-4o", {
    name: "my-assistant",
    instructions: "You are helpful agent",
  });

  console.log(`Created agent, agent ID : ${agent.id}`);

  const thread = await client.agents.createThread();

  console.log(`Created thread, thread ID : ${agent.id}`);

  await client.agents.createMessage(thread.id, { role: "user", content: "Hello, tell me a joke" });

  console.log(`Created message, thread ID : ${agent.id}`);

  const streamEventMessages = await client.agents.createRun(thread.id, agent.id).stream();

  for await (const eventMessage of streamEventMessages) {
    switch (eventMessage.event) {
      case RunStreamEventEnum.ThreadRunCreated:
        console.log(`ThreadRun status: ${(eventMessage.data as ThreadRun).status}`);
        break;
      case MessageStreamEventEnum.ThreadMessageDelta:
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

      case RunStreamEventEnum.ThreadRunCompleted:
        console.log("Thread Run Completed");
        break;
      case ErrorEventEnum.Error:
        console.log(`An error occurred. Data ${eventMessage.data}`);
        break;
      case DoneEventEnum.Done:
        console.log("Stream completed.");
        break;
    }
  }

  await client.agents.deleteAgent(agent.id);
  console.log(`Delete agent, agent ID : ${agent.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
