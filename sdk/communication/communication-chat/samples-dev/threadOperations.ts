// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Perform thread operations using the ChatClient.
 */

import { ChatClient } from "@azure/communication-chat";
import {
  AzureCommunicationTokenCredential,
  parseConnectionString,
} from "@azure/communication-common";
import { CommunicationIdentityClient } from "@azure/communication-identity";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  const connectionString =
    process.env["COMMUNICATION_CONNECTION_STRING"] ||
    "endpoint=https://<resource-name>.communication.azure.com/;<access-key>";
  const endpoint = parseConnectionString(connectionString).endpoint;

  const identityClient = new CommunicationIdentityClient(connectionString);
  const user = await identityClient.createUser();
  const userToken = await identityClient.getToken(user, ["chat"]);

  // create ChatClient
  const chatClient = new ChatClient(
    endpoint,
    new AzureCommunicationTokenCredential(userToken.token)
  );

  // create chat thread
  console.log("Creating Thread...");
  const createChatThreadRequest = {
    topic: "Hello, World!",
  };
  const createChatThreadOptions = {
    participants: [
      {
        id: user,
        displayName: "Jack",
      },
    ],
  };
  const createChatThreadResult = await chatClient.createChatThread(
    createChatThreadRequest,
    createChatThreadOptions
  );
  const threadId = createChatThreadResult.chatThread ? createChatThreadResult.chatThread.id : "";

  console.log(`Created Thread with id: ${threadId}.`);

  // get ChatThreadClient for thread
  const chatThreadClient = chatClient.getChatThreadClient(threadId);

  // get proprerties of created chat thread
  const chatThread = await chatThreadClient.getProperties();
  console.log(`Retrieved created thread. Topic: ${chatThread.topic}`);

  // update the thread's topic
  await chatThreadClient.updateTopic("New Topic");
  console.log(`Updated thread's topic.`);

  // delete the chat thread
  await chatClient.deleteChatThread(threadId);
}

main().catch((error) => {
  console.error("Encountered an error in thread operations: ", error);
  process.exit(1);
});
