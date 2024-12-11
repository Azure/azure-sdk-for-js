// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {AIProjectsClient, MessageTextContentOutput} from "@azure/ai-projects"
import { DefaultAzureCredential } from "@azure/identity";

import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "<endpoint>>;<subscription>;<resource group>;<project>";

export async function main(): Promise<void> {
  const client = AIProjectsClient.fromConnectionString(connectionString || "", new DefaultAzureCredential());
  const agent  = await client.agents.createAgent("gpt-4o",{ name:"my-agent", instructions:"You are helpful agent"});
  const thread = await client.agents.createThread();

  const message = await client.agents.createMessage(thread.id, { role: "user", content: "hello, world!" });
  console.log(`Created message, message ID: ${message.id}`);

  const messages = await client.agents.listMessages(thread.id);
  console.log(`Message ${message.id} contents: ${(messages.data[0].content[0] as MessageTextContentOutput).text.value}`);

  const updatedMessage = await client.agents.updateMessage(thread.id, message.id, { metadata: {"introduction": "true"} });
  console.log(`Updated message metadata - introduction: ${updatedMessage.metadata?.introduction}`);

  await client.agents.deleteThread(thread.id);
  await client.agents.deleteAgent(agent.id);
  console.log(`Deleted thread and agent`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
