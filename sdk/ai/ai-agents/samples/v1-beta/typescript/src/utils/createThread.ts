// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Utils to create a thread and add messages to it.
 */

import type {
  AgentThread,
  AgentsClient,
  MessageInputContent,
  MessageRole,
  ThreadMessage,
} from "@azure/ai-agents";

export async function createSimpleThread(client: AgentsClient): Promise<AgentThread> {
  // Create a thread
  const thread = await client.threads.create();
  console.log(`Created thread, thread ID : ${thread.id}`);

  // List all threads for the agent
  const threads = client.threads.list();
  for await (const t of threads) {
    console.log(`Thread ID: ${t.id}`);
    console.log(`Created at: ${t.createdAt}`);
    console.log(`Metadata: ${t.metadata}`);
    console.log(`---- `);
  }

  return thread;
}

export async function createThreadWithMessage(
  client: AgentsClient,
  content: MessageInputContent,
  role: MessageRole = "user",
): Promise<{ thread: AgentThread; message: ThreadMessage }> {
  const thread = await createSimpleThread(client);
  // Create a message to thread
  const message = await client.messages.create(thread.id, role, content);
  console.log(`Created message, message ID : ${message.id}`);
  return { thread, message };
}
