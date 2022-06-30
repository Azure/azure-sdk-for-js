// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RoomsClient, RoomModel } from "@azure/communication-rooms";
import { CommunicationIdentityClient} from "@azure/communication-identity";
import { printRoom } from "./printRoom";

import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  const connectionString = 
    process.env["COMMUNICATION_CONNECTION_STRING"] ||
    "endpoint=https://<resource-name>.communication.azure.com/;<access-key>";

  const roomsClient: RoomsClient = new RoomsClient(connectionString);
  const identityClient = new CommunicationIdentityClient(connectionString);

  const user1 = await identityClient.createUserAndToken(["voip"]);
  const user2 = await identityClient.createUserAndToken(["voip"]);
  const user3 = await identityClient.createUserAndToken(["voip"]);

  const today = new Date();
  const createRoomRequest = {
    validFrom: today,
    validUntil: today.getDate() + 1,
    participants: [
      {
        id: user1.user,
        role: "attendee"
      }
    ]
  };

  const createRoom = await roomsClient.createRoom(createRoomRequest);
  const roomId = createRoom.id;
  console.log(`Created Room`);
  printRoom(createRoom);

  const addParticipantsRequest = {
    participants: [
      {
        id: user2.user,
        role: "consumer"
      }
    ]
  };
  const addParticipants = await roomsClient.addParticipants(roomId, addParticipantsRequest);
  console.log(`Added Participants`);
  printRoom(addParticipants);

  const updateParticipantsRequest = {
    participants: [
      {
        id: user1.user,
        role: "presenter"
      },
      {
        id: user3.user,
        role: "attendee"
      }
    ]
  };
  const updateParticipants = await roomsClient.updateParticipants(roomId, updateParticipantsRequest);
  console.log(`Updated Participants`);
  printRoom(updateParticipants);

  const removeParticipantsRequest = {
    participants: [
      {
        id: user1.user,
        role: "presenter"
      },
      user2.user
    ]
  }
  const removeParticipants = await roomsClient.removeParticipants(roomId, removeParticipantsRequest);
  console.log(`Removed Participants`);
  printRoom(removeParticipants);

  await roomsClient.deleteRoom(roomId);
}
