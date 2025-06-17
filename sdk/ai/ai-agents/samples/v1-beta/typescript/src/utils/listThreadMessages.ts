// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Utils to list messages in a thread.
 */
import { AgentsClient, isOutputOfType, MessageContent, MessageTextContent } from "@azure/ai-agents";

export async function listThreadMessages(client: AgentsClient, threadId: string): Promise<void> {
  // Fetch and log all messages
  const messagesIterator = client.messages.list(threadId);
  console.log(`Messages:`);

  // Get the first message
  for await (const m of messagesIterator) {
    if (m.content.length > 0) {
      const agentMessage: MessageContent = m.content[0];
      if (isOutputOfType<MessageTextContent>(agentMessage, "text")) {
        const textContent = agentMessage as MessageTextContent;
        console.log(`Text Message Content - ${textContent.text.value}`);
      }
    }
    break; // Just process the first message
  }
}
