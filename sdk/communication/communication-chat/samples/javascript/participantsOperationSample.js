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

export const participantsOperatioinSample = async () => {
  const connectionString =
    process.env["COMMUNICATION_CONNECTION_STRING"] ||
    "endpoint=https://<resource-name>.communication.azure.com/;<access-key>";

  const identityClient = new CommunicationIdentityClient(connectionString);
  const testUser = await identityClient.createUser();
  const userToken = await identityClient.getToken(testUser, ["chat"]);
  const testUser2 = await identityClient.createUser();
  await identityClient.getToken(testUser2, ["chat"]);

  //CreateChatClient
  const chatClient = new ChatClient(
    connectionString,
    new AzureCommunicationTokenCredential(userToken.token)
  );
  const createChatTtreadResult = await chatClient.createChatThread({ topic: "Hello, World!" });
  const threadId = createChatTtreadResult.chatThread?.id!;
  const chatThreadClient = chatClient.getChatThreadClient(threadId);

  //AddParticipant
  const addParticipantsRequest = {
    participants: [
      {
        id: testUser2,
        displayName: "Test User"
      }
    ]
  };
  await chatThreadClient.addParticipants(addParticipantsRequest);
  console.log(`Added chat participant user.`);

  //DeleteChatMessge
  await chatThreadClient.removeParticipant(testUser2);
  console.log("Removed chat participant user.");
};

participantsOperatioinSample();
