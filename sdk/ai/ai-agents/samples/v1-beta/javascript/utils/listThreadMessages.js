// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Utils to list messages in a thread.
 */
const { isOutputOfType } = require("@azure/ai-agents");

async function listThreadMessages(client, threadId) {
  // Fetch and log all messages
  const messagesIterator = client.messages.list(threadId);
  console.log(`Messages:`);

  // Get the first message
  for await (const m of messagesIterator) {
    if (m.content.length > 0) {
      const agentMessage = m.content[0];
      if (isOutputOfType(agentMessage, "text")) {
        const textContent = agentMessage;
        console.log(`Text Message Content - ${textContent.text.value}`);
      }
    }
    break; // Just process the first message
  }
}

module.exports = { listThreadMessages };
