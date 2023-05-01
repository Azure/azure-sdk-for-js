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

  describe("Room Operations", function () {
    let testUser: CommunicationUserIdentifier;
    let roomId = "";

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
      assert.isDefined(createRoomResult.createdOn);
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
    let testUser: CommunicationUserIdentifier;
    let roomId = "";

    beforeEach(async function (this: Context) {
      ({ client, recorder } = await createRecordedRoomsClient(this));
    });

    afterEach(async function () {
      await recorder.stop();
      if (isPlaybackMode()) {
        sinon.restore();
      }
    });

    it("successfully creates the room", async function () {
      const createRoomResult = await client.createRoom({});
      assert.isDefined(createRoomResult);
      roomId = createRoomResult.id;
    });

    it("successfully adds participants to the room", async function () {
      testUser = (await createTestUser(recorder)).user;
      const participants: RoomParticipantPatch[] = [
        {
          id: testUser,
          role: "Presenter",
        },
      ];

      await client.addOrUpdateParticipants(roomId, participants);
      await pause(500);

      const addParticipantsResult = await client.listParticipants(roomId);
      assert.isDefined(addParticipantsResult);
      assert.isNotEmpty(addParticipantsResult);

      let count = 0;
      for await (const participant of addParticipantsResult) {
        if (participant) {
          count++;

          // rawId is sanitized so skip this check in playback mode
          if (!isPlaybackMode()) {
            assert.equal(participant.id.kind, "communicationUser");
          }
        }
      }

      assert.equal(count, 1);
    });

    it("successfully adds participants to the room with null role", async function () {
      const testUser2 = (await createTestUser(recorder)).user;
      const participants = [
        {
          id: testUser2,
          role: null,
        },
      ];

      await client.addOrUpdateParticipants(roomId, participants as any);
      await pause(500);

      const addParticipantsResult = await client.listParticipants(roomId);
      assert.isDefined(addParticipantsResult);
      assert.isNotEmpty(addParticipantsResult);

      let count = 0;
      let attendeeCount = 0;
      for await (const participant of addParticipantsResult) {
        if (participant) {
          count++;

          if (participant.role === "Attendee") {
            attendeeCount++;
          }

          // rawId is sanitized so skip this check in playback mode
          if (!isPlaybackMode()) {
            assert.equal(participant.id.kind, "communicationUser");
          }
        }
      }

      assert.equal(count, 2);
      assert.equal(attendeeCount, 1);
    });

    it("successfully updates a participant", async function () {
      const participants: RoomParticipantPatch[] = [
        {
          id: testUser,
        },
      ];
      await client.addOrUpdateParticipants(roomId, participants);
      await pause(500);

      const allParticipants = await client.listParticipants(roomId);
      assert.isDefined(allParticipants);
      let attendeeCount = 0;
      for await (const participant of allParticipants) {
        if (participant.role === "Attendee") {
          attendeeCount++;
        }
      }

      assert.equal(attendeeCount, 2);
    });

    it("successfully removes a participant from the room", async function () {
      const participantIdentifiers = [testUser];
      await client.removeParticipants(roomId, participantIdentifiers);
      await pause(500);

      const participants = await client.listParticipants(roomId);
      assert.isDefined(participants);
      assert.isNotEmpty(participants);

      let count = 0;
      for await (const participant of participants) {
        if (participant) {
          count++;
        }
      }

      assert.equal(count, 1);
    });

    it("successfully cleans up", async function () {
      await client.deleteRoom(roomId);
    });
  });
});

async function pause(time: number): Promise<void> {
  if (!isPlaybackMode()) {
    await new Promise((resolve) => setTimeout(resolve, time));
  }
}
