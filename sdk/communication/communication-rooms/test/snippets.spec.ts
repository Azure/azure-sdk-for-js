// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import {
  CreateRoomOptions,
  RoomParticipantPatch,
  RoomsClient,
  UpdateRoomOptions,
} from "@azure/communication-rooms";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";
import { CommunicationIdentityClient } from "@azure/communication-identity";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_KeyCredential", async () => {
    const credential = new AzureKeyCredential("<key-from-resource>");
    const client = new RoomsClient("<endpoint-from-resource>", credential);
  });

  it("ReadmeSampleCreateClient_ConnectionString", async () => {
    const connectionString = `endpoint=ENDPOINT;accessKey=KEY`;
    const client = new RoomsClient(connectionString);
  });

  it("ReadmeSampleCreateClient_TokenCredential", async () => {
    const credential = new DefaultAzureCredential();
    const client = new RoomsClient("<endpoint-from-resource>", credential);
  });

  it("ReadmeSampleCreateRoom", async () => {
    const credential = new DefaultAzureCredential();
    const client = new RoomsClient("<endpoint-from-resource>", credential);
    // @ts-preserve-whitespace
    const identityClient = new CommunicationIdentityClient("<endpoint-from-resource>", credential);
    const { user } = await identityClient.createUserAndToken(["voip"]);
    // @ts-preserve-whitespace
    const validFrom = new Date(Date.now());
    const validForDays = 10;
    const validUntil = new Date(validFrom.getTime());
    validUntil.setDate(validFrom.getDate() + validForDays);
    const pstnDialOutEnabled = true;
    // @ts-preserve-whitespace
    // options payload to create a room
    const createRoomOptions: CreateRoomOptions = {
      validFrom,
      validUntil,
      pstnDialOutEnabled,
      participants: [
        {
          id: user,
          role: "Attendee",
        },
      ],
    };
    // @ts-preserve-whitespace
    // create room
    const room = await client.createRoom(createRoomOptions);
  });

  it("ReadmeSampleUpdateRoom", async () => {
    const credential = new DefaultAzureCredential();
    const client = new RoomsClient("<endpoint-from-resource>", credential);
    // @ts-preserve-whitespace
    const validFrom = new Date();
    const validForDays = 60;
    const validUntil = new Date(validFrom.getTime());
    validUntil.setDate(validFrom.getDate() + validForDays);
    const pstnDialOutEnabled = false;
    // @ts-preserve-whitespace
    const updateRoomOptions: UpdateRoomOptions = {
      validFrom,
      validUntil,
      pstnDialOutEnabled,
    };
    // @ts-preserve-whitespace
    // update the room using the room id from the creation operation
    const updatedRoom = await client.updateRoom("<room-id>", updateRoomOptions);
  });

  it("ReadmeSampleGetRoom", async () => {
    const credential = new DefaultAzureCredential();
    const client = new RoomsClient("<endpoint-from-resource>", credential);
    // @ts-preserve-whitespace
    const roomId = "ROOM_ID";
    const room = await client.getRoom(roomId);
  });

  it("ReadmeSampleListRooms", async () => {
    const credential = new DefaultAzureCredential();
    const client = new RoomsClient("<endpoint-from-resource>", credential);
    // @ts-preserve-whitespace
    const roomsList = client.listRooms();
    for await (const currentRoom of roomsList) {
      // access room data
      console.log(`The room id is ${currentRoom.id}.`);
    }
  });

  it("ReadmeSampleAddOrUpdateParticipants", async () => {
    const credential = new DefaultAzureCredential();
    const client = new RoomsClient("<endpoint-from-resource>", credential);
    // @ts-preserve-whitespace
    const identityClient = new CommunicationIdentityClient("<endpoint-from-resource>", credential);
    const { user: user1 } = await identityClient.createUserAndToken(["voip"]);
    // @ts-preserve-whitespace
    // Create a new user to add to the room
    const { user: user2 } = await identityClient.createUserAndToken(["voip"]);
    const updateParticipantsList: RoomParticipantPatch[] = [
      {
        id: user1,
        role: "Presenter",
      },
      {
        id: user2,
      },
    ];
    // @ts-preserve-whitespace
    // run addOrUpdate operation
    await client.addOrUpdateParticipants("<room-id>", updateParticipantsList);
  });

  it("ReadmeSampleRemoveParticipants", async () => {
    const credential = new DefaultAzureCredential();
    const client = new RoomsClient("<endpoint-from-resource>", credential);
    // @ts-preserve-whitespace
    const identityClient = new CommunicationIdentityClient("<endpoint-from-resource>", credential);
    const { user: user1 } = await identityClient.createUserAndToken(["voip"]);
    const { user: user2 } = await identityClient.createUserAndToken(["voip"]);
    // @ts-preserve-whitespace
    const participantsToRemove = [user1, user2];
    await client.removeParticipants("<room-id>", participantsToRemove);
  });

  it("ReadmeSampleListParticipants", async () => {
    const credential = new DefaultAzureCredential();
    const client = new RoomsClient("<endpoint-from-resource>", credential);
    // @ts-preserve-whitespace
    const participantsList = client.listParticipants("<room-id>");
    for await (const participant of participantsList) {
      // access participant data
      console.log(`The participant's role is ${participant.role}.`);
    }
  });

  it("ReadmeSampleDeleteRoom", async () => {
    const credential = new DefaultAzureCredential();
    const client = new RoomsClient("<endpoint-from-resource>", credential);
    // @ts-preserve-whitespace
    await client.deleteRoom("<room-id>");
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
