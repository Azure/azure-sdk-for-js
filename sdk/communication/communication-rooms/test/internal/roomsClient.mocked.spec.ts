// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import sinon from "sinon";
import { assert } from "chai";
import { RoomsClient } from "../../src";
import {
  createRoomsClient,
  generateHttpClient,
  mockCreateRoomsResult,
  mockSdkModelParticipant,
  mockUpdateRoomsResult,
} from "./utils/mockedClient";

describe("[Mocked] RoomsClient", async function () {
  let roomsClient: RoomsClient;

  afterEach(function () {
    sinon.restore();
  });

  it("makes successful create Rooms request", async function () {
    const mockHttpClient = generateHttpClient(201, mockCreateRoomsResult);

    roomsClient = createRoomsClient(mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    const sendOptions = {};

    const createRoomsResult = await roomsClient.createRoom(sendOptions);

    sinon.assert.calledOnce(spy);
    assert.isDefined(createRoomsResult);
    assert.equal(createRoomsResult.id, mockCreateRoomsResult.id);
    assert.deepEqual(createRoomsResult.validFrom, mockCreateRoomsResult.validFrom);
    assert.deepEqual(createRoomsResult.validUntil, mockCreateRoomsResult.validUntil);
    assert.deepEqual(createRoomsResult.participants, [mockSdkModelParticipant]);

    const request = spy.getCall(0).args[0];
    assert.equal(request.method, "POST");
    assert.deepEqual(JSON.parse(request.body as string), {});
    assert.isNotEmpty(request.headers.get("repeatability-request-id"));
  });

  it("makes update Rooms request", async function () {
    const mockHttpClient = generateHttpClient(200, mockUpdateRoomsResult);
    roomsClient = createRoomsClient(mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");
    const sendOptions = {
      validFrom: new Date("2022-08-16T18:06:06Z"),
      validUntil: new Date("2022-08-17T18:06:06Z"),
    };

    const updateRoomResult = await roomsClient.updateRoom("id", sendOptions);

    sinon.assert.calledOnce(spy);
    assert.isDefined(updateRoomResult);
    assert.equal(updateRoomResult.id, mockUpdateRoomsResult.id);
    assert.deepEqual(updateRoomResult.validFrom, mockUpdateRoomsResult.validFrom);
    assert.deepEqual(updateRoomResult.validUntil, mockUpdateRoomsResult.validUntil);
    assert.deepEqual(updateRoomResult.participants, [mockSdkModelParticipant]);

    const request = spy.getCall(0).args[0];
    assert.equal(request.method, "PATCH");
    assert.deepEqual(request.body as string, JSON.stringify(sendOptions));
  });

  it("makes add Participant request", async function () {
    const mockHttpClient = generateHttpClient(200, mockUpdateRoomsResult);
    roomsClient = createRoomsClient(mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");
    const sendOptions = {
      validFrom: new Date("2022-08-16T18:06:06Z"),
      validUntil: new Date("2022-08-17T18:06:06Z"),
    };

    const updateRoomResult = await roomsClient.updateRoom("id", sendOptions);

    sinon.assert.calledOnce(spy);
    assert.isDefined(updateRoomResult);
    assert.equal(updateRoomResult.id, mockUpdateRoomsResult.id);
    assert.deepEqual(updateRoomResult.validFrom, mockUpdateRoomsResult.validFrom);
    assert.deepEqual(updateRoomResult.validUntil, mockUpdateRoomsResult.validUntil);
    assert.deepEqual(updateRoomResult.participants, [mockSdkModelParticipant]);

    const request = spy.getCall(0).args[0];
    assert.equal(request.method, "PATCH");
    assert.deepEqual(request.body as string, JSON.stringify(sendOptions));
  });
});
