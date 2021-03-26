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

export const threadOperatioinSample = async () => {
  const connectionString =
    process.env["COMMUNICATION_CONNECTION_STRING"] ||
    "endpoint=https://<resource-name>.communication.azure.com/;<access-key>";

  const identityClient = new CommunicationIdentityClient(connectionString);
  const testUser = await identityClient.createUser();
  const userToken = await identityClient.getToken(testUser, ["chat"]);

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
        id: testUser,
        displayName: "Test User"
      }
    ]
  };
  const createChatTtreadResult = await chatClient.createChatThread(
    createChatThreadRequest,
    createChatThreadOptions
  );
  const threadId = createChatTtreadResult.chatThread ? createChatTtreadResult.chatThread.id : "";

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

threadOperatioinSample();
