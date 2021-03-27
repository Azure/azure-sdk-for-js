// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to use the ChatClient to do thread operations
 */

import { ChatClient } from "@azure/communication-chat";
import { AzureCommunicationTokenCredential } from "@azure/communication-common";
import { CommunicationIdentityClient } from "@azure/communication-identity";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export const main = async () => {
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
