// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, isPlaybackMode } from "@azure-tools/test-recorder";
import { createRecordedRoomsClient, createTestUser } from "./utils/recordedClient";
import { assert } from "chai";
import { Context } from "mocha";
import sinon from "sinon";
import { RoomsClient } from "../../src/roomsClient";
import { CommunicationUserIdentifier } from "@azure/communication-common";
import { CreateRoomOptions, UpdateRoomOptions } from "../../src/models/options";
import { RoomParticipantPatch } from "../../src/models/models";

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
      const options = {};

      const createRoomResult = await client.createRoom(options);
      assert.isDefined(createRoomResult);
      assert.isDefined(createRoomResult?.id);
      roomId = createRoomResult?.id;
    });

    it("successfully creates a room with payload", async function () {
      testUser = (await createTestUser(recorder)).user;

      const options: CreateRoomOptions = {
        validFrom: new Date(recorder.variable("validFrom", validFrom.toString())),
        validUntil: new Date(recorder.variable("validUntil", validUntil.toString())),
        participants: [
          {
            id: testUser,
            role: "Presenter",
          },
        ],
      };

      const createRoomResult = await client.createRoom(options);
      assert.isDefined(createRoomResult);
      assert.isDefined(createRoomResult.id);
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

      const options: UpdateRoomOptions = {
        validFrom: new Date(
          recorder.variable(
            "validFromUpdated",
            new Date(validFrom.getTime() + 5 * 60 * 1000).toString()
          )
        ),
        validUntil: new Date(
          recorder.variable(
            "validUntilUpdated",
            new Date(validUntil.getTime() + 5 * 60 * 1000).toString()
          )
        ),
      };

      await client.updateRoom(roomId, options);
    });

    it("successfully updates a room with participants", async function () {
      testUser = (await createTestUser(recorder)).user;
      testUser2 = (await createTestUser(recorder)).user;
      const createRoom = await client.createRoom({
        validFrom: new Date(recorder.variable("validFrom", validFrom.toString())),
        validUntil: new Date(recorder.variable("validUntil", validUntil.toString())),
        participants: [
          {
            id: testUser,
            role: "Presenter",
          },
        ],
      });
      roomId = createRoom.id;

      const options: UpdateRoomOptions = {
        validFrom: new Date(
          recorder.variable(
            "validFromUpdated",
            new Date(validFrom.getTime() + 5 * 60 * 1000).toString()
          )
        ),
        validUntil: new Date(
          recorder.variable(
            "validUntilUpdated",
            new Date(validUntil.getTime() + 5 * 60 * 1000).toString()
          )
        ),
      };

      await client.updateRoom(roomId, options);
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
      const participants: RoomParticipantPatch[] = [
        {
          id: testUser,
          role: "Presenter",
        },
      ];

      const createRoomResult = await client.createRoom({});
      assert.isDefined(createRoomResult);
      roomId = createRoomResult.id;

      await client.upsertParticipants(roomId, participants);
      const addParticipantsResult = await client.listParticipants(roomId);
      assert.isDefined(addParticipantsResult);
      assert.isNotEmpty(addParticipantsResult);
      for await (const participant of addParticipantsResult) {
        assert.equal(participant.id.kind, "communicationUser");
        assert.equal(participant.role, participants[0].role);
        break;
      }
    });

    it("successfully removes a participant from the room", async function () {
      testUser = (await createTestUser(recorder)).user;
      testUser2 = (await createTestUser(recorder)).user;

      const request: CreateRoomOptions = {
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

      roomId = createRoomResult.id;

      const participants = [testUser, testUser2];
      await client.removeParticipants(roomId, participants);
      let count = 0;
      for await (const participant of participants) {
        if (participant) count++;
      }
      assert.isTrue(count === 0);
    });

    it("successfully updates a participant", async function () {
      testUser = (await createTestUser(recorder)).user;
      const request: CreateRoomOptions = {
        participants: [
          {
            id: testUser,
            role: "Presenter",
          },
        ],
      };

      const createRoomResult = await client.createRoom(request);
      assert.isDefined(createRoomResult);
      roomId = createRoomResult.id;

      const participants: RoomParticipantPatch[] = [
        {
          id: testUser,
          role: "Presenter",
        },
      ];
      await client.upsertParticipants(roomId, participants);
      const allParticipants = await client.listParticipants(roomId);
      assert.isDefined(allParticipants);
      for await (const participant of allParticipants) {
        assert.equal(participant.id.kind, "communicationUser");
        assert.equal(participant.role, participants[0].role);
        break;
      }
    });
  });
});
