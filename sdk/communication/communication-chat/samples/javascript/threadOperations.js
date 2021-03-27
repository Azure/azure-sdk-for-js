// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to use the ChatClient to do thread operations
 */

const { ChatClient } = require("@azure/communication-chat");
const { AzureCommunicationTokenCredential } = require("@azure/communication-common");
const { CommunicationIdentityClient } = require("@azure/communication-identity");
const dotenv = require("dotenv");
dotenv.config();

async function main(){
  const connectionString =
    process.env["COMMUNICATION_CONNECTION_STRING"] ||
    "endpoint=https://<resource-name>.communication.azure.com/;<access-key>";

  const identityClient = new CommunicationIdentityClient(connectionString);
  const user = await identityClient.createUser();
  const userToken = await identityClient.getToken(user, ["chat"]);

  //CreateChatClient
  const chatClient = new ChatClient(
    connectionString,
    new AzureCommunicationTokenCredential(userToken.token)
  );

  //CreateThread
  console.log("Creating Thread...");
  const createChatThreadRequest = {
    topic: "Hello, World!"
  };
  const createChatThreadOptions = {
    participants: [
      {
        id: user,
        displayName: "Jack"
      }
    ]
  };
  const createChatThreadResult = await chatClient.createChatThread(
    createChatThreadRequest,
    createChatThreadOptions
  );
  const threadId = createChatThreadResult.chatThread ? createChatThreadResult.chatThread.id : "";

  console.log(`Created Thread with id: ${threadId}.`);

  //GetChatThreadClient
  const chatThreadClient = chatClient.getChatThreadClient(threadId);

  //GetThreadProperties
  const chatThread = await chatThreadClient.getProperties();
  console.log(`Retrieved created thread. Topic: ${chatThread.topic}`);

  //UpdateThreadTopic
  await chatThreadClient.updateTopic("New Topic");
  console.log(`Updated thread's topic.`);

  //DeleteThread
  await chatClient.deleteChatThread(threadId);
};

main();
