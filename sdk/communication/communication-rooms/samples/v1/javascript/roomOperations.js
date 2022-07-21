// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Perform room operations using the RoomsClient.
 */

const { RoomsClient } = require("@azure/communication-rooms");
const { CommunicationIdentityClient } = require("@azure/communication-identity");
const { getIdentifierRawId } = require("@azure/communication-common");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  const connectionString =
    process.env["COMMUNICATION_CONNECTION_STRING"] ||
    "endpoint=https://<resource-name>.communication.azure.com/;<access-key>";

  const identityClient = new CommunicationIdentityClient(connectionString);
  const user1 = await identityClient.createUserAndToken(["voip"]);
  const user2 = await identityClient.createUserAndToken(["voip"]);

  // create RoomsClient
  const roomsClient = new RoomsClient(connectionString);

  var validFrom = new Date(Date.now());
  var validUntil = new Date(validFrom.getTime() + 5 * 60 * 1000);

  // request payload to create a room
  const createRoomRequest = {
    validFrom: validFrom,
    validUntil: validUntil,
    participants: [
      {
        id: user1.user,
        role: "Attendee",
      },
    ],
  };

  // create a room with the request payload
  const createRoom = await roomsClient.createRoom(createRoomRequest);
  const roomId = createRoom.id;
  console.log(`Created Room`);
  printRoom(createRoom);

  // retrieves the room with corresponding ID
  const getRoom = await roomsClient.getRoom(roomId);
  console.log(`Retrieved Room with ID ${roomId}`);
  printRoom(getRoom);

  validFrom.setTime(validUntil.getTime());
  validUntil.setTime(validFrom.getTime() + 5 * 60 * 1000);

  // request payload to update a room
  const updateRoomRequest = {
    validFrom: validFrom,
    validUntil: validUntil,
    roomJoinPolicy: "CommunicationServiceUsers",
    participants: [
      {
        id: user1.user,
        role: "Consumer",
      },
      {
        id: user2.user,
        role: "Presenter",
      },
    ],
  };

  // updates the specified room with the request payload
  const updateRoom = await roomsClient.updateRoom(roomId, updateRoomRequest);
  console.log(`Updated Room`);
  printRoom(updateRoom);

  // deletes the specified room
  await roomsClient.deleteRoom(roomId);
}

/**
 * Outputs the details of a Room to console.
 * @param room - The Room being printed to console.
 */
function printRoom(room) {
  console.log(`Room ID: ${room.id}`);
  console.log(`Valid From: ${room.validFrom}`);
  console.log(`Valid Until: ${room.validUntil}`);
  console.log(`Room Join Policy: ${room.roomJoinPolicy}`);
  console.log(`Participants:`);
  for (const participant of room.participants) {
    const id = getIdentifierRawId(participant.id);
    const role = participant.role;
    console.log(`${id} - ${role}`);
  }
}

main().catch((error) => {
  console.error("Encountered an error while sending request: ", error);
  process.exit(1);
});

module.exports = { main };
