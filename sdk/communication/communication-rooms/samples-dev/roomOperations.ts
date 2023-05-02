// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Perform room operations using the RoomsClient.
 */

import {
  RoomsClient,
  CommunicationRoom,
  CreateRoomOptions,
  UpdateRoomOptions,
} from "@azure/communication-rooms";
import { CommunicationIdentityClient } from "@azure/communication-identity";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  const connectionString =
    process.env["COMMUNICATION_SAMPLES_CONNECTION_STRING"] ||
    "endpoint=https://<resource-name>.communication.azure.com/;<access-key>";

  const identityClient = new CommunicationIdentityClient(connectionString);
  const user1 = await identityClient.createUserAndToken(["voip"]);

  // create RoomsClient
  const roomsClient: RoomsClient = new RoomsClient(connectionString);

  var validFrom = new Date(Date.now());
  var validUntil = new Date(validFrom.getTime() + 5 * 60 * 1000);

  // options payload to create a room
  const createRoomOptions: CreateRoomOptions = {
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
  const createRoom = await roomsClient.createRoom(createRoomOptions);
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
  const updateRoomOptions: UpdateRoomOptions = {
    validFrom,
    validUntil,
  };

  // updates the specified room with the request payload
  const updateRoom = await roomsClient.updateRoom(roomId, updateRoomOptions);
  console.log(`Updated Room`);
  printRoom(updateRoom);

  // deletes the specified room
  await roomsClient.deleteRoom(roomId);
}

/**
 * Outputs the details of a Room to console.
 * @param room - The Room being printed to console.
 */
function printRoom(room: CommunicationRoom): void {
  console.log(`Room ID: ${room.id}`);
  console.log(`Valid From: ${room.validFrom}`);
  console.log(`Valid Until: ${room.validUntil}`);
}

main().catch((error) => {
  console.error("Encountered an error while sending request: ", error);
  process.exit(1);
});
