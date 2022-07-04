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
  const connectionString =
    process.env["COMMUNICATION_CONNECTION_STRING"] ||
    "endpoint=https://<resource-name>.communication.azure.com/;<access-key>";

  const roomsClient = new RoomsClient(connectionString);
  const identityClient = new CommunicationIdentityClient(connectionString);
  const user1 = await identityClient.createUserAndToken(["voip"]);
  const user2 = await identityClient.createUserAndToken(["voip"]);
  const validFrom = new Date();
  const validUntil = new Date(validFrom.getTime() + 5 * 60 * 1000);

  const createRoomRequest = {
    validFrom: validFrom,
    validUntil: validUntil,
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
    ],
  };
  const updateParticipants = await roomsClient.updateParticipants(
    roomId,
    updateParticipantsRequest
  );
  console.log(`Updated Participants`);
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
