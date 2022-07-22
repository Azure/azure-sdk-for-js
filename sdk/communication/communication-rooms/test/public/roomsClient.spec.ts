// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, isPlaybackMode } from "@azure-tools/test-recorder";
import { createRecordedRoomsClient, createTestUser } from "./utils/recordedClient";
import { assert } from "chai";
import { Context } from "mocha";
import sinon from "sinon";
import { RoomsClient } from "../../src/roomsClient";
import { CommunicationUserIdentifier, getIdentifierRawId } from "@azure/communication-common";
import {
  AddParticipantsRequest,
  CreateRoomRequest,
  UpdateRoomRequest,
  RemoveParticipantsRequest,
  UpdateParticipantsRequest,
} from "../../src/models/requests";

describe("RoomsClient", function () {
  let recorder: Recorder;
  let client: RoomsClient;
  const validFrom = new Date();
  const validUntil = new Date(validFrom.getTime() + 5 * 60 * 1000);
  let testUser: CommunicationUserIdentifier;
  let testUser2: CommunicationUserIdentifier;
  let roomId = "";

  describe("Room Operations", function () {
    beforeEach(async function (this: Context) {
      ({ client, recorder } = await createRecordedRoomsClient(this));
    });

    afterEach(async function () {
      if (roomId !== "") {
        await client.deleteRoom(roomId);
        roomId = "";
      }
      await recorder.stop();
      if (isPlaybackMode()) {
        sinon.restore();
      }
    });

    it("successfully creates a room with empty request", async function () {
      const request = {};

      const createRoomResult = await client.createRoom(request);
      assert.isDefined(createRoomResult);
      assert.isDefined(createRoomResult?.id);
      assert.isEmpty(createRoomResult.participants);
      assert.equal(createRoomResult.roomJoinPolicy, "InviteOnly");
      roomId = createRoomResult?.id;
    });

    it("successfully creates a room with payload", async function () {
      testUser = (await createTestUser(recorder)).user;

      const request: CreateRoomRequest = {
        validFrom: validFrom,
        validUntil: validUntil,
        roomJoinPolicy: "CommunicationServiceUsers",
        participants: [
          {
            id: testUser,
            role: "Presenter",
          },
        ],
      };

      const createRoomResult = await client.createRoom(request);
      assert.isDefined(createRoomResult);
      assert.isDefined(createRoomResult.id);
      assert.equal(createRoomResult.roomJoinPolicy, "CommunicationServiceUsers");
      assert.equal(createRoomResult.participants?.length, 1);
      roomId = createRoomResult.id;
    });

    it("successfully gets a room", async function () {
      const createRoom = await client.createRoom({});
      roomId = createRoom.id;

      await client.getRoom(roomId);
    });

    it("successfully updates a default room", async function () {
      const createRoom = await client.createRoom({});
      roomId = createRoom.id;
      testUser = (await createTestUser(recorder)).user;

      const request: UpdateRoomRequest = {
        validFrom: new Date(validFrom.getTime() + 5 * 60 * 1000),
        validUntil: new Date(validUntil.getTime() + 5 * 60 * 1000),
        roomJoinPolicy: "CommunicationServiceUsers",
        participants: [
          {
            id: testUser,
            role: "Presenter",
          },
        ],
      };

      await client.updateRoom(roomId, request);
    });

    it("successfully updates a room with participants", async function () {
      testUser = (await createTestUser(recorder)).user;
      testUser2 = (await createTestUser(recorder)).user;
      const createRoom = await client.createRoom({
        validFrom: validFrom,
        validUntil: validUntil,
        roomJoinPolicy: "CommunicationServiceUsers",
        participants: [
          {
            id: testUser,
            role: "Presenter",
          },
        ],
      });
      roomId = createRoom.id;

      const request: UpdateRoomRequest = {
        validFrom: new Date(validFrom.getTime() + 5 * 60 * 1000),
        validUntil: new Date(validUntil.getTime() + 5 * 60 * 1000),
        roomJoinPolicy: "InviteOnly",
        participants: [
          {
            id: testUser,
            role: "Attendee",
          },
          {
            id: testUser2,
            role: "Presenter",
          },
        ],
      };

      await client.updateRoom(roomId, request);
    });

    it("successfully deletes a room", async function () {
      const createRoom = await client.createRoom({});
      roomId = createRoom.id;

      await client.deleteRoom(roomId);
      roomId = "";
    });
  });

  describe("Participants Operations", function () {
    beforeEach(async function (this: Context) {
      ({ client, recorder } = await createRecordedRoomsClient(this));
    });

    afterEach(async function () {
      if (roomId !== "") {
        await client.deleteRoom(roomId);
        roomId = "";
      }
      await recorder.stop();
      if (isPlaybackMode()) {
        sinon.restore();
      }
    });

    it("successfully adds a participant to the room", async function () {
      testUser = (await createTestUser(recorder)).user;
      const request: AddParticipantsRequest = {
        participants: [
          {
            id: testUser,
            role: "Presenter",
          },
        ],
      };

      const createRoomResult = await client.createRoom({});
      assert.isDefined(createRoomResult);
      assert.isEmpty(createRoomResult.participants);
      roomId = createRoomResult.id;

      const updateRoomResult = await client.addParticipants(roomId, request);
      assert.isDefined(updateRoomResult);
      assert.isNotEmpty(updateRoomResult.participants);
      assert.equal(
        getIdentifierRawId(updateRoomResult.participants[0].id),
        getIdentifierRawId(request.participants[0].id)
      );
      assert.equal(updateRoomResult.participants[0].role, request.participants[0].role);
    });

    it("successfully removes a participant from the room", async function () {
      testUser = (await createTestUser(recorder)).user;
      testUser2 = (await createTestUser(recorder)).user;

      const request: CreateRoomRequest = {
        participants: [
          {
            id: testUser,
            role: "Presenter",
          },
          {
            id: testUser2,
            role: "Presenter",
          },
        ],
      };

      const createRoomResult = await client.createRoom(request);
      assert.isDefined(createRoomResult);
      assert.isNotEmpty(createRoomResult.participants);

      roomId = createRoomResult.id;

      const removeParticipants: RemoveParticipantsRequest = {
        participants: [testUser, testUser2],
      };
      await client.removeParticipants(roomId, removeParticipants);
      assert.isEmpty((await client.getRoom(roomId)).participants);
    });

    it("successfully updates a participant", async function () {
      testUser = (await createTestUser(recorder)).user;
      const request: CreateRoomRequest = {
        participants: [
          {
            id: testUser,
            role: "Presenter",
          },
        ],
      };

      const createRoomResult = await client.createRoom(request);
      assert.isDefined(createRoomResult);
      assert.isNotEmpty(createRoomResult.participants);
      roomId = createRoomResult.id;

      const updateParticipants: UpdateParticipantsRequest = {
        participants: [
          {
            id: testUser,
            role: "Presenter",
          },
        ],
      };

      await client.updateParticipants(roomId, updateParticipants);
      const testResultingRoom = await client.getRoom(roomId);
      assert.isNotEmpty(testResultingRoom.participants);
      assert.isDefined(testResultingRoom);
      if (testResultingRoom.participants != null) {
        assert.equal(
          getIdentifierRawId(testResultingRoom.participants[0].id),
          getIdentifierRawId(updateParticipants.participants[0].id)
        );
        assert.equal(
          testResultingRoom.participants[0].role,
          updateParticipants.participants[0].role
        );
      }
    });
  });
});
