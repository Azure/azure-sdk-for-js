// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Perform message thread operations using the ChatThreadClient.
 */

const { ChatClient } = require("@azure/communication-chat");
const { AzureCommunicationTokenCredential } = require("@azure/communication-common");
const { CommunicationIdentityClient } = require("@azure/communication-identity");
const { DefaultAzureCredential } = require("@azure/identity");

// Load the .env file if it exists
require("dotenv/config");

async function main() {
  const endpoint =
    process.env["COMMUNICATION_ENDPOINT"] || "https://<resource-name>.communication.azure.com/";

  const identityClient = new CommunicationIdentityClient(endpoint, new DefaultAzureCredential());
  const user = await identityClient.createUser();
  const userToken = await identityClient.getToken(user, ["chat"]);

  // create ChatClient
  const chatClient = new ChatClient(
    endpoint,
    new AzureCommunicationTokenCredential(userToken.token),
  );
  const createChatThreadResult = await chatClient.createChatThread({ topic: "Hello, World!" });
  const threadId = createChatThreadResult.chatThread ? createChatThreadResult.chatThread.id : "";
  const chatThreadClient = chatClient.getChatThreadClient(threadId);

  // send a message
  const sendMessageResult = await chatThreadClient.sendMessage({ content: "Hello world." });
  console.log(`Sent message with id ${sendMessageResult.id}`);

  // get a message by id
  const message = await chatThreadClient.getMessage(sendMessageResult.id);
  console.log(`Retrieved message.`, message);

  // list all messages with newest first
  let i = 0;
  for await (const messageItem of chatThreadClient.listMessages()) {
    console.log(`Message ${++i}:`, messageItem);
  }

  // update a message
  await chatThreadClient.updateMessage(message.id, { content: "New content" });
  console.log(`Updated message.`);

  // delete a message
  await chatThreadClient.deleteMessage(sendMessageResult.id);
  console.log("Deleted message.");
}

main().catch((error) => {
  console.error("Encountered an error in message operations: ", error);
  process.exit(1);
});

module.exports = { main };
