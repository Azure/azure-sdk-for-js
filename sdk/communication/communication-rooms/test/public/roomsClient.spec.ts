// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder, isPlaybackMode } from "@azure-tools/test-recorder";
import { createRecordedRoomsClient, createTestUser } from "./utils/recordedClient";
import { assert, expect } from "chai";
import { Context } from "mocha";
import sinon from "sinon";
import { RoomsClient } from "../../src/roomsClient";
import { CommunicationUserIdentifier } from "@azure/communication-common";
import { CreateRoomOptions, UpdateRoomOptions } from "../../src/models/options";
import { CommunicationRoom, RoomParticipantPatch } from "../../src/models/models";

describe("RoomsClient", function () {
  let recorder: Recorder;
  let client: RoomsClient;
  const validFrom = new Date();
  const validUntil = new Date(validFrom.getTime() + 5 * 60 * 1000);
  const over180DaysValidUntil = new Date(validUntil.getTime() + 288000 * 60 * 1000); // 200 days from validUntil
  const expiredValidUntil = new Date(validFrom.getTime() - 5 * 60 * 1000); // 5 days from validFrom

  describe("Room Operations", function () {
    let testUser1: CommunicationUserIdentifier;
    let testUser2: CommunicationUserIdentifier;
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

    it("successfully creates a room with no attributes", async function () {
      const options = {};

      const createRoomResult = await client.createRoom(options);
      verifyRoomsAttributes(createRoomResult, options);
      roomId = createRoomResult?.id;
    });

    it("successfully creates a room with only participants attributes", async function () {
      testUser1 = (await createTestUser(recorder)).user;
      testUser2 = (await createTestUser(recorder)).user;

      const options: CreateRoomOptions = {
        participants: [
          {
            id: testUser1,
            role: "Presenter",
          },
        ],
      };

      const createRoomResult = await client.createRoom(options);
      verifyRoomsAttributes(createRoomResult, options);
      roomId = createRoomResult.id;
      const addParticipantsResult = await client.listParticipants(roomId);
      verifyRoomsParticipantsAttributes(addParticipantsResult, 1, 1, 0, 0);
    });

    it("successfully creates a room with an invalid MRI attribute", async function () {
      testUser1 = (await createTestUser(recorder)).user;
      testUser2 = (await createTestUser(recorder)).user;
      testUser1.communicationUserId = "invalid MRI Values";

      const options: CreateRoomOptions = {
        participants: [
          {
            id: testUser1,
            role: "Presenter",
          },
          {
            id: testUser2,
            role: "Attendee",
          },
        ],
      };

      try {
        await client.createRoom(options);
      } catch (e: any) {
        expect(e.message).to.eq("Invalid format for communication identifier.");
      }
    });

    it("successfully creates a room with only valid time range attributes", async function () {
      testUser1 = (await createTestUser(recorder)).user;

      const options: CreateRoomOptions = {
        validFrom: new Date(recorder.variable("validFrom", validFrom.toString())),
        validUntil: new Date(recorder.variable("validUntil", validUntil.toString())),
      };

      const createRoomResult = await client.createRoom(options);

      verifyRoomsAttributes(createRoomResult, options);
      roomId = createRoomResult.id;
      const addParticipantsResult = await client.listParticipants(roomId);
      verifyRoomsParticipantsAttributes(addParticipantsResult, 0, 0, 0, 0);
    });

    it("successfully creates a room with an expired validUntil", async function () {
      testUser1 = (await createTestUser(recorder)).user;

      const options: CreateRoomOptions = {
        validFrom: new Date(recorder.variable("validFrom", validFrom.toString())),
        validUntil: new Date(recorder.variable("validUntil", expiredValidUntil.toString())),
      };

      try {
        await client.createRoom(options);
      } catch (e: any) {
        expect(e.message).to.eq(
          "The request could not be understood by the server due to malformed syntax.",
        );
      }
    });

    it("successfully creates a room with validUntil greater than 180 days from current date", async function () {
      testUser1 = (await createTestUser(recorder)).user;

      const options: CreateRoomOptions = {
        validFrom: new Date(recorder.variable("validFrom", validFrom.toString())),
        validUntil: new Date(recorder.variable("validUntil", over180DaysValidUntil.toString())),
      };

      try {
        await client.createRoom(options);
      } catch (e: any) {
        expect(e.message).to.eq(
          "The request could not be understood by the server due to malformed syntax.",
        );
      }
    });

    it("successfully creates a room with only PSTN Dial-Out attribute", async function () {
      testUser1 = (await createTestUser(recorder)).user;
      testUser2 = (await createTestUser(recorder)).user;

      const options: CreateRoomOptions = {
        pstnDialOutEnabled: true,
      };

      // Create rooms with pstnDialOutEnabled: true
      let createRoomResult = await client.createRoom(options);
      verifyRoomsAttributes(createRoomResult, options);

      // Create rooms with pstnDialOutEnabled: false
      options.pstnDialOutEnabled = false;
      createRoomResult = await client.createRoom(options);
      verifyRoomsAttributes(createRoomResult, options);

      roomId = createRoomResult.id;
      const addParticipantsResult = await client.listParticipants(roomId);
      verifyRoomsParticipantsAttributes(addParticipantsResult, 0, 0, 0, 0);
    });

    it("successfully creates a room with PSTN Dial-Out and valid time range attributes", async function () {
      testUser1 = (await createTestUser(recorder)).user;

      const options: CreateRoomOptions = {
        validFrom: new Date(recorder.variable("validFrom", validFrom.toString())),
        validUntil: new Date(recorder.variable("validUntil", validUntil.toString())),
        pstnDialOutEnabled: true,
      };

      // Create rooms with pstnDialOutEnabled: true
      let createRoomResult = await client.createRoom(options);
      verifyRoomsAttributes(createRoomResult, options);

      // Create rooms with pstnDialOutEnabled: false
      options.pstnDialOutEnabled = false;
      createRoomResult = await client.createRoom(options);
      verifyRoomsAttributes(createRoomResult, options);

      roomId = createRoomResult.id;
      const addParticipantsResult = await client.listParticipants(roomId);
      verifyRoomsParticipantsAttributes(addParticipantsResult, 0, 0, 0, 0);
    });

    it("successfully creates a room with PSTN Dial-Out and Valid Particpants attributes", async function () {
      testUser1 = (await createTestUser(recorder)).user;
      testUser2 = (await createTestUser(recorder)).user;

      const options: CreateRoomOptions = {
        pstnDialOutEnabled: true,
        participants: [
          {
            id: testUser1,
            role: "Presenter",
          },
        ],
      };

      // Create rooms with pstnDialOutEnabled: true
      let createRoomResult = await client.createRoom(options);
      verifyRoomsAttributes(createRoomResult, options);

      // Create rooms with pstnDialOutEnabled: false
      options.pstnDialOutEnabled = false;
      createRoomResult = await client.createRoom(options);
      verifyRoomsAttributes(createRoomResult, options);

      roomId = createRoomResult.id;
      const addParticipantsResult = await client.listParticipants(roomId);
      verifyRoomsParticipantsAttributes(addParticipantsResult, 1, 1, 0, 0);
    });

    it("successfully creates a room with all optional attributes", async function () {
      testUser1 = (await createTestUser(recorder)).user;

      const options: CreateRoomOptions = {
        validFrom: new Date(recorder.variable("validFrom", validFrom.toString())),
        validUntil: new Date(recorder.variable("validUntil", validUntil.toString())),
        pstnDialOutEnabled: false,
        participants: [
          {
            id: testUser1,
            role: "Presenter",
          },
        ],
      };

      const createRoomResult = await client.createRoom(options);
      verifyRoomsAttributes(createRoomResult, options);
      roomId = createRoomResult.id;
      const addParticipantsResult = await client.listParticipants(roomId);
      verifyRoomsParticipantsAttributes(addParticipantsResult, 1, 1, 0, 0);
    });

    it("successfully gets a valid room", async function () {
      const createRoom = await client.createRoom({});
      roomId = createRoom.id;

      await client.getRoom(roomId);
    });

    it("successfully gets an invalid room", async function () {
      try {
        await client.getRoom("non-existingroomId");
      } catch (e: any) {
        expect(e.message).to.eq("Invalid room ID.");
      }
    });

    it("successfully update room with a valid time range", async function () {
      const createRoom = await client.createRoom({});
      roomId = createRoom.id;
      testUser1 = (await createTestUser(recorder)).user;

      const options: UpdateRoomOptions = {
        validFrom: new Date(
          recorder.variable(
            "validFromUpdated",
            new Date(validFrom.getTime() + 5 * 60 * 1000).toString(),
          ),
        ),
        validUntil: new Date(
          recorder.variable(
            "validUntilUpdated",
            new Date(validUntil.getTime() + 5 * 60 * 1000).toString(),
          ),
        ),
      };

      await client.updateRoom(roomId, options);
    });

    it("successfully updates a room with validUntil greater than 180 days from current date", async function () {
      testUser1 = (await createTestUser(recorder)).user;
      const createRoom = await client.createRoom({
        validFrom: new Date(recorder.variable("validFrom", validFrom.toString())),
        validUntil: new Date(recorder.variable("validUntil", validUntil.toString())),
        participants: [
          {
            id: testUser1,
            role: "Presenter",
          },
        ],
      });
      roomId = createRoom.id;

      const options: UpdateRoomOptions = {
        validFrom: new Date(
          recorder.variable("validFrom", new Date(validFrom.getTime() + 5 * 60 * 1000).toString()),
        ),
        validUntil: new Date(recorder.variable("validUntil", over180DaysValidUntil.toString())),
      };

      try {
        await client.updateRoom(roomId, options);
      } catch (e: any) {
        expect(e.message).to.eq(
          "The request could not be understood by the server due to malformed syntax.",
        );
      }
    });

    it("successfully updates a room with an expired validUntil", async function () {
      testUser1 = (await createTestUser(recorder)).user;
      const createRoom = await client.createRoom({
        validFrom: new Date(recorder.variable("validFrom", validFrom.toString())),
        validUntil: new Date(recorder.variable("validUntil", validUntil.toString())),
        participants: [
          {
            id: testUser1,
            role: "Presenter",
          },
        ],
      });
      roomId = createRoom.id;

      const options: UpdateRoomOptions = {
        validFrom: new Date(
          recorder.variable("validFrom", new Date(validFrom.getTime() + 5 * 60 * 1000).toString()),
        ),
        validUntil: new Date(recorder.variable("validUntil", expiredValidUntil.toString())),
      };

      try {
        await client.updateRoom(roomId, options);
      } catch (e: any) {
        expect(e.message).to.eq(
          "The request could not be understood by the server due to malformed syntax.",
        );
      }
    });

    it("successfully updates a room with an empty option", async function () {
      testUser1 = (await createTestUser(recorder)).user;
      const createRoom = await client.createRoom({
        validFrom: new Date(recorder.variable("validFrom", validFrom.toString())),
        validUntil: new Date(recorder.variable("validUntil", validUntil.toString())),
        participants: [
          {
            id: testUser1,
            role: "Presenter",
          },
        ],
      });
      roomId = createRoom.id;

      const options: UpdateRoomOptions = {};

      try {
        await client.updateRoom(roomId, options);
      } catch (e: any) {
        expect(e.message).to.eq(
          "The request could not be understood by the server due to malformed syntax.",
        );
      }
    });

    it("successfully update room with an invalid room Id", async function () {
      const createRoom = await client.createRoom({});
      roomId = createRoom.id;
      testUser1 = (await createTestUser(recorder)).user;

      const options: UpdateRoomOptions = {
        validFrom: new Date(
          recorder.variable(
            "validFromUpdated",
            new Date(validFrom.getTime() + 5 * 60 * 1000).toString(),
          ),
        ),
        validUntil: new Date(
          recorder.variable(
            "validUntilUpdated",
            new Date(validUntil.getTime() + 5 * 60 * 1000).toString(),
          ),
        ),
      };

      try {
        await client.updateRoom("non-existingroomId", options);
      } catch (e: any) {
        expect(e.message).to.eq("Invalid room ID.");
      }
    });

    it("successfully update room with PSTN Dial-Out", async function () {
      const createRoom = await client.createRoom({});
      roomId = createRoom.id;
      testUser1 = (await createTestUser(recorder)).user;

      const updateOptions: UpdateRoomOptions = {
        pstnDialOutEnabled: true,
      };

      let updateRoomResult = await client.updateRoom(roomId, updateOptions);
      verifyRoomsAttributes(updateRoomResult, updateOptions);

      updateOptions.pstnDialOutEnabled = false;
      updateRoomResult = await client.updateRoom(roomId, updateOptions);
      verifyRoomsAttributes(updateRoomResult, updateOptions);
    });

    it("successfully update room with PSTN Dial-Out and valid time range", async function () {
      const createRoom = await client.createRoom({});
      roomId = createRoom.id;
      testUser1 = (await createTestUser(recorder)).user;

      const updateOptions: UpdateRoomOptions = {
        validFrom: new Date(
          recorder.variable(
            "validFromUpdated",
            new Date(validFrom.getTime() + 5 * 60 * 1000).toString(),
          ),
        ),
        validUntil: new Date(
          recorder.variable(
            "validUntilUpdated",
            new Date(validUntil.getTime() + 5 * 60 * 1000).toString(),
          ),
        ),
        pstnDialOutEnabled: true,
      };

      let updateRoomResult = await client.updateRoom(roomId, updateOptions);
      verifyRoomsAttributes(updateRoomResult, updateOptions);

      updateOptions.pstnDialOutEnabled = false;
      updateRoomResult = await client.updateRoom(roomId, updateOptions);
      verifyRoomsAttributes(updateRoomResult, updateOptions);
    });

    it("successfully list rooms", async function () {
      const roomsPages = client.listRooms().byPage();
      let counter: number = 1;
      // loop over each page
      for await (const page of roomsPages) {
        if (page) {
          for (const room of page) {
            assert.isNotNull(room.id);
            assert.isNotNull(room.createdOn);
            assert.isNotNull(room.validFrom);
            assert.isNotNull(room.validUntil);
            assert.isNotNull(room.pstnDialOutEnabled);
          }
        }

        if (counter === 3) {
          break;
        }

        counter++;
      }
    });

    it("successfully deletes a room", async function () {
      const createRoom = await client.createRoom({});
      roomId = createRoom.id;

      const getRoom = await client.getRoom(roomId);
      verifyRoomsAttributes(getRoom, {});
      await client.deleteRoom(roomId);
      roomId = "";
    });
  });
});

describe("Participants Operations", function () {
  let recorder: Recorder;
  let client: RoomsClient;
  let testUser1: CommunicationUserIdentifier;
  let roomId = "";
  const delayInMs = 1000;

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

  it("successfully adds participants to the room", async function () {
    testUser1 = (await createTestUser(recorder)).user;
    const participants: RoomParticipantPatch[] = [
      {
        id: testUser1,
        role: "Presenter",
      },
    ];

    // Create a room
    const createRoomResult = await client.createRoom({});
    assert.isDefined(createRoomResult);
    const curRoomId = createRoomResult.id;

    await pause(delayInMs);
    // Patch participants
    await client.addOrUpdateParticipants(curRoomId, participants);
    await pause(delayInMs);

    const addParticipantsResult = await client.listParticipants(curRoomId);
    verifyRoomsParticipantsAttributes(addParticipantsResult, 1, 1, 0, 0);

    roomId = curRoomId;
  });

  it("successfully adds participants to the room with null role", async function () {
    testUser1 = (await createTestUser(recorder)).user;
    const participants = [
      {
        id: testUser1,
        role: null,
      },
    ];

    // Create a room
    const createRoomResult = await client.createRoom({});
    assert.isDefined(createRoomResult);
    const curRoomId = createRoomResult.id;

    await pause(delayInMs);
    // Patch Participants
    await client.addOrUpdateParticipants(curRoomId, participants as any);
    await pause(delayInMs);

    const addParticipantsResult = await client.listParticipants(curRoomId);
    verifyRoomsParticipantsAttributes(addParticipantsResult, 1, 0, 1, 0);

    roomId = curRoomId;
  });

  it("successfully updates a participant with role not specified", async function () {
    testUser1 = (await createTestUser(recorder)).user;

    const participants = [
      {
        id: testUser1,
      },
    ];

    // Create a room
    const createRoomResult = await client.createRoom({});
    assert.isDefined(createRoomResult);
    const curRoomId = createRoomResult.id;

    await pause(delayInMs);

    // Patch Participants
    await client.addOrUpdateParticipants(curRoomId, participants);
    await pause(delayInMs);

    const allParticipants = await client.listParticipants(curRoomId);
    verifyRoomsParticipantsAttributes(allParticipants, 1, 0, 1, 0);

    roomId = curRoomId;
  });

  it("successfully removes participant not in the room", async function () {
    testUser1 = (await createTestUser(recorder)).user;

    // Create a room
    const createRoomResult = await client.createRoom({});
    assert.isDefined(createRoomResult);
    const curRoomId = createRoomResult.id;

    await pause(delayInMs);
    // Remove participants
    const participantIdentifiers = [testUser1];
    await client.removeParticipants(curRoomId, participantIdentifiers);

    await pause(delayInMs);

    const participants = await client.listParticipants(curRoomId);
    verifyRoomsParticipantsAttributes(participants, 0, 0, 0, 0);

    roomId = curRoomId;
  });

  it("successfully removes participants in the room", async function () {
    testUser1 = (await createTestUser(recorder)).user;

    // Create a room
    const options: CreateRoomOptions = {
      participants: [
        {
          id: testUser1,
          role: "Presenter",
        },
      ],
    };

    const createRoomResult = await client.createRoom(options);
    assert.isDefined(createRoomResult);
    const curRoomId = createRoomResult.id;

    await pause(delayInMs);

    // Remove participants
    const removeParticipants = [testUser1];
    await client.removeParticipants(curRoomId, removeParticipants);
    await pause(delayInMs);

    const participants = await client.listParticipants(curRoomId);
    verifyRoomsParticipantsAttributes(participants, 0, 0, 0, 0);

    roomId = curRoomId;
  });
});

async function pause(time: number): Promise<void> {
  if (!isPlaybackMode()) {
    await new Promise((resolve) => setTimeout(resolve, time));
  }
}

function verifyRoomsAttributes(
  actualRoom: CommunicationRoom,
  expectedValue: CreateRoomOptions,
): void {
  // Assert
  assert.isDefined(actualRoom);
  assert.isDefined(actualRoom.id);
  assert.isDefined(actualRoom.createdOn);
  assert.deepEqual(
    actualRoom.pstnDialOutEnabled,
    expectedValue.pstnDialOutEnabled != null ? expectedValue.pstnDialOutEnabled : false,
  );

  if (expectedValue.validFrom != null) {
    assert.deepEqual(actualRoom.validFrom, expectedValue.validFrom);
  }

  if (expectedValue.validUntil != null) {
    assert.deepEqual(actualRoom.validUntil, expectedValue.validUntil);
  }
}

async function verifyRoomsParticipantsAttributes(
  actualRoomParticipant: any,
  expectedCount: number,
  expectPresenter: number,
  expectAttendee: number,
  expectConsumer: number,
): Promise<void> {
  // Assert
  assert.isDefined(actualRoomParticipant);
  assert.isNotEmpty(actualRoomParticipant);

  let count = 0;
  let presenterCount = 0;
  let attendeeCount = 0;
  let consumerCount = 0;

  for await (const participant of actualRoomParticipant) {
    count++;

    if (participant.role === "Presenter") {
      presenterCount++;
    } else if (participant.role === "Attendee") {
      attendeeCount++;
    } else if (participant.role === "Consumer") {
      consumerCount++;
    }

    // rawId is sanitized so skip this check in playback mode
    if (!isPlaybackMode()) {
      assert.equal(participant.id.kind, "communicationUser");
    }
  }

  assert.equal(count, expectedCount);
  assert.equal(presenterCount, expectPresenter);
  assert.equal(attendeeCount, expectAttendee);
  assert.equal(consumerCount, expectConsumer);
}
