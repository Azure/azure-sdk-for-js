// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RoomsClient } from "@azure/communication-rooms";
import { CommunicationIdentityClient} from "@azure/communication-identity";
import { printRoom } from "./printRoom"

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

  const createRoomRequest = {
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

  const getRoom = await roomsClient.getRoom(roomId);
  console.log(`Retrieved Room with ID ${roomId}`);
  printRoom(getRoom);
  const today = new Date();
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));

  const updateRoomRequest = {
    validFrom: today,
    validUntil: tomorrow,
    roomJoinPolicy: "CommunicationServiceUsers",
    participants: [
      {
        id: user1.user,
        role: "consumer"
      },
      {
        id: user2.user,
        role: "presenter"
      }
    ]
  };
  const updateRoom = await roomsClient.updateRoom(roomId,updateRoomRequest);
  console.log(`Updated Room`);
  printRoom(updateRoom);

  await roomsClient.deleteRoom(roomId);
}
