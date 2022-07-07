// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, isPlaybackMode } from "@azure-tools/test-recorder";
import { createRecordedRoomsClient, createTestUser } from "./utils/recordedClient";
import { assert } from "chai";
import { Context } from "mocha";
import sinon from "sinon";
import { RoomsClient } from "../../src/roomsClient";
import { CommunicationUserIdentifier } from "@azure/communication-common";

describe("RoomsClient", function () {
  let recorder: Recorder;
  let client: RoomsClient;
  const validFrom = new Date();
  const validUntil = new Date(validFrom.getTime() + 5 * 60 * 1000);
  let testUser: CommunicationUserIdentifier;
  let testUser2: CommunicationUserIdentifier;

  describe("Room Operations", function () {
    beforeEach(async function (this: Context) {
      ({ client, recorder } = await createRecordedRoomsClient(this));
    });

    afterEach(async function () {
      if (!this.currentTest?.isPending()) {
        await recorder.stop();
      }
      if (isPlaybackMode()) {
        sinon.restore();
      }
    });

    it("successfully creates a room with empty request", async function () {
      const request = {
        //validUntil : new Date(),
      };

      const createRoomResult = await client.createRoom(request);
      assert.isDefined(createRoomResult);
      assert.isDefined(createRoomResult?.id);
      assert.isEmpty(createRoomResult.participants);
    });

    it("successfully creates a room with payload", async function () {
      testUser = (await createTestUser(recorder)).user;

      const request = {
        validFrom: validFrom,
        validUntil: validUntil,
        roomJoinPolicy: "CommunicationServiceUsers",
        participants: [{ id: testUser, role: "Presenter" }],
      };

      await client.createRoom(request);
    });

    it("successfully gets a room", async function () {
      const createRoom = await client.createRoom({});
      const roomId = createRoom.id;

      await client.getRoom(roomId);
    });

    it("successfully updates a default room", async function () {
      const createRoom = await client.createRoom({});
      const roomId = createRoom.id;
      testUser = (await createTestUser(recorder)).user;

      const request = {
        validFrom: new Date(validFrom.getTime() + 5 * 60 * 1000),
        validUntil: new Date(validUntil.getTime() + 5 * 60 * 1000),
        roomJoinPolicy: "CommunicationServiceUsers",
        participants: [{ id: testUser, role: "Presenter" }],
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
        participants: [{ id: testUser, role: "Presenter" }],
      });
      const roomId = createRoom.id;

      const request = {
        validFrom: new Date(validFrom.getTime() + 5 * 60 * 1000),
        validUntil: new Date(validUntil.getTime() + 5 * 60 * 1000),
        roomJoinPolicy: "InviteOnly",
        participants: [
          { id: testUser, role: "Attendee" },
          { id: testUser2, role: "Presenter" },
        ],
      };

      await client.updateRoom(roomId, request);
    });

    it("successfully deletes a room", async function () {
      const createRoom = await client.createRoom({});
      const roomId = createRoom.id;

      await client.deleteRoom(roomId);
    });
  });
});
