// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Perform participant operations using the RoomsClient.
 */

import {
  RoomsClient,
  ParticipantsCollection,
  CreateRoomRequest,
  AddParticipantsRequest,
  UpdateParticipantsRequest,
} from "@azure/communication-rooms";
import { CommunicationIdentityClient } from "@azure/communication-identity";
import { getIdentifierRawId } from "@azure/communication-common";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  const connectionString =
    process.env["COMMUNICATION_CONNECTION_STRING"] ||
    "endpoint=https://<resource-name>.communication.azure.com/;<access-key>";

  const identityClient = new CommunicationIdentityClient(connectionString);
  const user1 = await identityClient.createUserAndToken(["voip"]);
  const user2 = await identityClient.createUserAndToken(["voip"]);

  // create RoomsClient
  const roomsClient: RoomsClient = new RoomsClient(connectionString);

  const validFrom = new Date();
  const validUntil = new Date(validFrom.getTime() + 5 * 60 * 1000);

  // request payload to create a room
  const createRoomRequest: CreateRoomRequest = {
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
  console.log(`Created Room with ID ${roomId}`);

  // request payload to add participants
  const addParticipantsRequest: AddParticipantsRequest = {
    participants: [
      {
        id: user2.user,
        role: "Consumer",
      },
    ],
  };

  // add user2 to the room with the request payload
  const addParticipants = await roomsClient.addParticipants(roomId, addParticipantsRequest);
  console.log(`Added Participants`);
  printParticipants(addParticipants);

  // request payload to update user1 with a new role
  const updateParticipantsRequest: UpdateParticipantsRequest = {
    participants: [
      {
        id: user1.user,
        role: "Presenter",
      },
    ],
  };

  // update user1 with the request payload
  await roomsClient.updateParticipants(roomId, updateParticipantsRequest);
  console.log(`Updated Participants`);
  printParticipants(await roomsClient.getParticipants(roomId));

  // request payload to delete both users from the room
  // this demonstrates both objects that can be used in deleting users from rooms: RoomParticipant or CommunicationIdentifier
  const removeParticipantsRequest = {
    participants: [user1.user, user2.user],
  };

  // remove both users from the room with the request payload
  await roomsClient.removeParticipants(roomId, removeParticipantsRequest);
  console.log(`Removed Participants`);
  printParticipants(await roomsClient.getParticipants(roomId));

  // deletes the room for cleanup
  await roomsClient.deleteRoom(roomId);
}

/**
 * Outputs the participants within a ParticipantsCollection to console.
 * @param pc - The ParticipantsCollection being printed to console.
 */
function printParticipants(pc: ParticipantsCollection): void {
  console.log(`Number of Participants: ${pc.participants.length}`);
  for (const participant of pc.participants!) {
    const id = getIdentifierRawId(participant.id);
    const role = participant.role;
    console.log(`${id} - ${role}`);
  }
}
main().catch((error) => {
  console.error("Encountered an error while sending request: ", error);
  process.exit(1);
});
