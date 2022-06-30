// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Perform participant operations using the RoomsClient.
 */

const { RoomsClient } = require("@azure/communication-rooms");
const { CommunicationIdentityClient } = require("@azure/communication-identity");

const dotenv = require("dotenv");
const { getIdentifierKind } = require("@azure/communication-common");
dotenv.config();

async function main() {
  console.log("TEST");
  const connectionString =
    process.env["COMMUNICATION_CONNECTION_STRING"] ||
    "endpoint=https://<resource-name>.communication.azure.com/;<access-key>";

  const roomsClient = new RoomsClient(connectionString);
  const identityClient = new CommunicationIdentityClient(connectionString);

  const user1 = await identityClient.createUserAndToken(["voip"]);
  const user2 = await identityClient.createUserAndToken(["voip"]);
  const user3 = await identityClient.createUserAndToken(["voip"]);

  const today = new Date();
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
  const createRoomRequest = {
    validFrom: today,
    validUntil: tomorrow,
    participants: [
      {
        id: user1.user,
        role: "attendee",
      },
    ],
  };

  const createRoom = await roomsClient.createRoom(createRoomRequest);
  const roomId = createRoom.id;
  console.log(`Created Room with ID ${roomId}`);

  const addParticipantsRequest = {
    participants: [
      {
        id: user2.user,
        role: "consumer",
      },
    ],
  };
  const addParticipants = await roomsClient.addParticipants(roomId, addParticipantsRequest);
  console.log(`Added Participants`);
  printParticipants(addParticipants);

  const updateParticipantsRequest = {
    participants: [
      {
        id: user1.user,
        role: "presenter",
      },
      {
        id: user3.user,
        role: "attendee",
      },
    ],
  };
  console.log;
  const updateParticipants = await roomsClient.updateParticipants(
    roomId,
    updateParticipantsRequest
  );
  write(`Updated Participants`);
  printParticipants(updateParticipants);

  const deleteUser = {
    id: user1.user,
    role: "presenter",
  };

  const removeParticipantsRequest = {
    participants: [deleteUser, user2.user],
  };
  const removeParticipants = await roomsClient.removeParticipants(
    roomId,
    removeParticipantsRequest
  );
  console.log(`Removed Participants`);
  printParticipants(removeParticipants);

  await roomsClient.deleteRoom(roomId);
}

function write(message) {
  const fs = require("fs");
  fs.writeFileSync("./logs.txt", message, {
    flag: "w",
  });
}

function printParticipants(pc) {
  for (const participant of pc.participants) {
    const identifierKind = getIdentifierKind(participant.id);
    let id;
    const role = participant.role;
    switch (identifierKind.kind) {
      case "communicationUser":
        id = identifierKind.communicationUserId;
        break;
      case "microsoftTeamsUser":
        id = identifierKind.microsoftTeamsUserId;
        break;
      case "phoneNumber":
        id = identifierKind.phoneNumber;
        break;
      case "unknown":
        id = identifierKind.id;
        write("Unknown user");
        break;
    }
    write(`${id} - ${role}`);
  }
}

module.exports = { main };
