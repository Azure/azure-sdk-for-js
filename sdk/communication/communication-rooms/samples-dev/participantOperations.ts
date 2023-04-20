// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Perform participant operations using the RoomsClient.
 */

import {
  RoomsClient,
  RoomParticipantPatch,
  CreateRoomOptions,
  RoomParticipant,
} from "@azure/communication-rooms";
import { CommunicationIdentityClient } from "@azure/communication-identity";

// Load the .env file if it exists
import * as dotenv from "dotenv";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
dotenv.config();

export async function main() {
  const connectionString =
    process.env["COMMUNICATION_SAMPLES_CONNECTION_STRING"] ||
    "endpoint=https://<resource-name>.communication.azure.com/;<access-key>";

  const identityClient = new CommunicationIdentityClient(connectionString);
  const user1 = await identityClient.createUserAndToken(["voip"]);
  const user2 = await identityClient.createUserAndToken(["voip"]);

  // create RoomsClient
  const roomsClient: RoomsClient = new RoomsClient(connectionString);

  const validFrom = new Date();
  const validUntil = new Date(validFrom.getTime() + 5 * 60 * 1000);

  // Options payload to create a room
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
  console.log(`Created Room with ID ${roomId}`);

  // request payload to add participants
  const addParticipantsList: RoomParticipantPatch[] = [
    {
      id: user2.user,
      role: "Consumer",
    },
  ];

  // add user2 to the room with the request payload
  await roomsClient.addOrUpdateParticipants(roomId, addParticipantsList);
  const addedParticipants = await roomsClient.listParticipants(roomId);
  console.log(`Added Participants`);
  printParticipants(addedParticipants);

  // request payload to update user1 with a new role
  const updateParticipantsList: RoomParticipantPatch[] = [
    {
      id: user1.user,
      role: "Presenter",
    },
  ];

  // update user1 with the request payload
  await roomsClient.addOrUpdateParticipants(roomId, updateParticipantsList);
  console.log(`Updated Participants`);
  printParticipants(await roomsClient.listParticipants(roomId));

  // request payload to delete both users from the room
  // this demonstrates both objects that can be used in deleting users from rooms: RoomParticipant or CommunicationIdentifier
  const removeParticipantsList = [user1.user, user2.user];

  // remove both users from the room with the request payload
  await roomsClient.removeParticipants(roomId, removeParticipantsList);
  console.log(`Removed Participants`);
  printParticipants(await roomsClient.listParticipants(roomId));

  // deletes the room for cleanup
  await roomsClient.deleteRoom(roomId);
}

/**
 * Outputs the participants within a Participantsn to console.
 * @param pc - The Participants being printed to console.
 */
async function printParticipants(
  participants: PagedAsyncIterableIterator<Partial<RoomParticipant>>
): Promise<void> {
  for await (const participant of participants) {
    const role = participant.role;
    console.log(role);
  }
}
main().catch((error) => {
  console.error("Encountered an error while sending request: ", error);
  process.exit(1);
});
