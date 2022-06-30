// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Perform room operations using the RoomsClient.
 */

import { RoomsClient, RoomModel } from "@azure/communication-rooms";
import { CommunicationIdentityClient} from "@azure/communication-identity";

import * as dotenv from "dotenv";
import { getIdentifierKind } from "@azure/communication-common";
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

function printRoom (room: RoomModel): void {
  write(`Room ID: ${room.id}`);
  write(`Valid From: ${room.validFrom}`);
  write(`Valid Until: ${room.validUntil}`);
  write(`Room Join Policy: ${room.roomJoinPolicy}`);
  write(`Participants:`);
  for (const participant of room.participants!) {
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

function write(message: string): void {
  const fs = require("fs");
  fs.writeFileSync("./logs.txt",message,{
    flag: 'w',
  });
}
