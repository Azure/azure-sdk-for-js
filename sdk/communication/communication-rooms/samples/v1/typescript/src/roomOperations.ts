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
  console.log("Room Operations JavaScript Sample");
  console.log("_________________________________\n\n");

  const connectionString =
    process.env["COMMUNICATION_SAMPLES_CONNECTION_STRING"] ||
    "endpoint=https://<resource-name>.communication.azure.com/;<access-key>";

  const identityClient = new CommunicationIdentityClient(connectionString);
  const user1 = await identityClient.createUserAndToken(["voip"]);

  console.log("Creating room...");

  // create RoomsClient
  const roomsClient: RoomsClient = new RoomsClient(connectionString);

  var validFrom = new Date(Date.now());
  var validForDays = 10;
  var validUntil = addDays(validFrom, validForDays);
  var pstnDialOutEnabled = true;

  // options payload to create a room
  const createRoomOptions: CreateRoomOptions = {
    validFrom: validFrom,
    validUntil: validUntil,
    pstnDialOutEnabled: pstnDialOutEnabled,
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
  console.log("Successfully created room with following properties:");
  printRoom(createRoom);

  console.log(`Fetching room with id: ${roomId}...`);

  // retrieves the room with corresponding ID
  const getRoom = await roomsClient.getRoom(roomId);
  console.log(`Successfully fetched room with id: ${roomId}. Room details:`);
  printRoom(getRoom);

  console.log(`Updating room with id: ${roomId}...`);

  // request payload to update a room
  const updateRoomOptions: UpdateRoomOptions = {
    validFrom,
    validUntil: addDays(validUntil, 10),
    pstnDialOutEnabled: pstnDialOutEnabled,
  };

  // updates the specified room with the request payload
  const updateRoom = await roomsClient.updateRoom(roomId, updateRoomOptions);
  console.log(`Successfully updated room with id: ${roomId}. Room details:`);
  printRoom(updateRoom);

  console.log(`Deleting room with id: ${roomId}...`);

  // list available rooms
  console.log("List all active rooms");
  const listRooms = await roomsClient.listRooms();
  for await (const roomModel of listRooms) {
    printRoom(roomModel);
  }

  console.log("Successfully list all active rooms.");

  // deletes the specified room
  await roomsClient.deleteRoom(roomId);

  console.log(`Successfully deleted room with id: ${roomId}.`);
}

/**
 * Outputs the details of a Room to console.
 * @param room - The Room being printed to console.
 */
function printRoom(room: CommunicationRoom): void {
  console.log(`Room ID: ${room.id}`);
  console.log(`Valid From: ${room.validFrom}`);
  console.log(`Valid Until: ${room.validUntil}`);
  console.log(`PstnDialOutEnabled: ${room.pstnDialOutEnabled}\n\n`);
}

/**
 * Adds the specified ampunt of days
 * @param current - The original date
 * @param days - The number of days to add
 */
function addDays(current: Date, days: number): Date {
  const copied = new Date(current.getTime());
  copied.setDate(copied.getDate() + days);
  return copied;
}

main().catch((error) => {
  console.error("Encountered an error while sending request: ", error);
  process.exit(1);
});
