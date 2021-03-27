// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to use the ChatThreadClient to do message operations
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
  const createChatThreadResult = await chatClient.createChatThread({ topic: "Hello, World!" });
  const threadId = createChatThreadResult.chatThread ? createChatThreadResult.chatThread.id : "";
  const chatThreadClient = chatClient.getChatThreadClient(threadId);

  //SendChatMessage
  const sendMessageResult = await chatThreadClient.sendMessage({ content: "Hello world." });
  console.log(`Sent message with id ${sendMessageResult.id}`);

  //GetChatMessage
  const message = await chatThreadClient.getMessage(sendMessageResult.id);
  console.log(`Retrieved message.`);

  //UpdateChatMessage
  await chatThreadClient.updateMessage("New content");
  console.log(`Updated message.`);

  //DeleteChatMessage
  await chatThreadClient.deleteMessage(sendMessageResult.id);
  console.log("Deleted message.");
};

main();
