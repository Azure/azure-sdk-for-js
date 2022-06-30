// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Perform room operations using the RoomsClient.
 */

const { RoomsClient } = require("@azure/communication-rooms");
const { CommunicationIdentityClient } = require("@azure/communication-identity");

const dotenv = require("dotenv");
const { getIdentifierKind } = require("@azure/communication-common");
dotenv.config();

async function main() {
  const connectionString =
    process.env["COMMUNICATION_CONNECTION_STRING"] ||
    "endpoint=https://<resource-name>.communication.azure.com/;<access-key>";

  const roomsClient = new RoomsClient(connectionString);
  const identityClient = new CommunicationIdentityClient(connectionString);

  const user1 = await identityClient.createUserAndToken(["voip"]);
  const user2 = await identityClient.createUserAndToken(["voip"]);

  const createRoomRequest = {
    participants: [
      {
        id: user1.user,
        role: "attendee",
      },
    ],
  };

  const createRoom = await roomsClient.createRoom(createRoomRequest);
  const roomId = createRoom.id;
  console.log(`Created Room`);
  printRoom(createRoom);

  const getRoom = await roomsClient.getRoom(roomId);
  console.log(`Retrieved Room with ID ${roomId}`);
  printRoom(getRoom);
  const from = new Date(new Date().setDate(new Date().getDate() + 1));
  const until = new Date(new Date().setDate(new Date().getDate() + 2));

  const updateRoomRequest = {
    validFrom: from,
    validUntil: until,
    roomJoinPolicy: "CommunicationServiceUsers",
    participants: [
      {
        id: user1.user,
        role: "consumer",
      },
      {
        id: user2.user,
        role: "presenter",
      },
    ],
  };
  const updateRoom = await roomsClient.updateRoom(roomId, updateRoomRequest);
  console.log(`Updated Room`);
  printRoom(updateRoom);

  await roomsClient.deleteRoom(roomId);
}

function printRoom(room) {
  console.log(`Room ID: ${room.id}`);
  console.log(`Valid From: ${room.validFrom}`);
  console.log(`Valid Until: ${room.validUntil}`);
  console.log(`Room Join Policy: ${room.roomJoinPolicy}`);
  console.log(`Participants:`);
  for (const participant of room.participants) {
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
        console.log("Unknown user");
        break;
    }
    console.log(`${id} - ${role}`);
  }
}

main().catch((error) => {
  console.error("Encountered an error while sending request: ", error);
  process.exit(1);
});

module.exports = { main };
