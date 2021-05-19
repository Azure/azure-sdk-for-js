// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to use the ChatThreadClient to do participant operations
 */

const { ChatClient } = require("@azure/communication-chat");
const {
  AzureCommunicationTokenCredential,
  getIdentifierKind,
  parseConnectionString
} = require("@azure/communication-common");
const { CommunicationIdentityClient } = require("@azure/communication-identity");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  const connectionString =
    process.env["COMMUNICATION_CONNECTION_STRING"] ||
    "endpoint=https://<resource-name>.communication.azure.com/;<access-key>";
  const endpoint = parseConnectionString(connectionString).endpoint;

  const identityClient = new CommunicationIdentityClient(connectionString);
  const user = await identityClient.createUser();
  const userToken = await identityClient.getToken(user, ["chat"]);
  const userSue = await identityClient.createUserAndToken(["chat"]);

  // create ChatClient
  const chatClient = new ChatClient(
    endpoint,
    new AzureCommunicationTokenCredential(userToken.token)
  );
  const createChatThreadResult = await chatClient.createChatThread({ topic: "Hello, World!" });
  const threadId = createChatThreadResult.chatThread ? createChatThreadResult.chatThread.id : "";
  const chatThreadClient = chatClient.getChatThreadClient(threadId);

  // add a new participant
  const addParticipantsRequest = {
    participants: [
      {
        id: userSue.user,
        displayName: "Sue"
      }
    ]
  };
  await chatThreadClient.addParticipants(addParticipantsRequest);
  console.log(`Added chat participant user.`);

  // list chat participants
  for await (const participant of chatThreadClient.listParticipants()) {
    const id = getIdentifierKind(participant.id);
    switch (id.kind) {
      case "communicationUser":
        console.log(`User with id ${id.communicationUserId}`);
        break;
      case "microsoftTeamsUser":
        console.log(`Microsoft Teams user with id ${id.microsoftTeamsUserId}`);
        break;
      case "phoneNumber":
        console.log(`Phone ${id.phoneNumber}`);
        break;
      case "unknown":
        console.log(`Unknown user with id ${id.id}`);
        break;
    }
  }

  // remove a participant
  await chatThreadClient.removeParticipant(userSue.user);
  console.log("Removed chat participant user.");
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
