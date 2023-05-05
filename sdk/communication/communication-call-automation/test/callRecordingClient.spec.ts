// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import sinon from "sinon";
import { assert } from "chai";
import * as RestModel from "../src/generated/src/models";
import { createRecordingClient, generateHttpClient } from "./utils/mockClient";
import {
  baseUri,
  CALL_CALLBACK_URL,
  CALL_SERVER_CALL_ID,
  CALL_TARGET_ID,
  generateToken,
  RECORDING_ID,
  RECORDING_STATE,
} from "./utils/connectionUtils";
import { CallRecording } from "../src/callRecording";
import { StartRecordingOptions } from "../src/models/options";
import { apiVersion } from "../src/generated/src/models/parameters";
import { ChannelAffinity } from "@azure/communication-call-automation";
import { CommunicationIdentifier } from "@azure/communication-common";

describe("CallRecording Unit Tests", async function () {
  let callRecording: CallRecording;

  afterEach(function () {
    sinon.restore();
  });

  it("can instantiate", async function () {
    new CallRecording(baseUri, { key: generateToken() });
  });

  it("makes successful startRecording request with channel affinity", async function () {
    const mockResponse: RestModel.RecordingStateResponse = {
      recordingId: RECORDING_ID,
      recordingState: RECORDING_STATE,
    };

    const mockHttpClient = generateHttpClient(200, mockResponse);
    callRecording = createRecordingClient(mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    const channelZeroParticipant: CommunicationIdentifier = { communicationUserId: CALL_TARGET_ID };
    const channelAffinity: ChannelAffinity = {
      targetParticipant: channelZeroParticipant,
      channel: 0,
    };

    const recOptions: StartRecordingOptions = {
      recordingStateCallbackEndpointUrl: CALL_CALLBACK_URL,
      callLocator: { id: CALL_SERVER_CALL_ID, kind: "serverCallLocator" },
      recordingChannel: "unmixed",
      recordingFormat: "wav",
      recordingContent: "audio",
      channelAffinity: [channelAffinity],
    };

    await callRecording.start(recOptions);
    const request = spy.getCall(0).args[0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.equal(data.callLocator.kind, "serverCallLocator");
    assert.equal(data.channelAffinity[0].channel, 0);
    assert.equal(data.channelAffinity[0].participant.rawId, CALL_TARGET_ID);
    assert.equal(data.channelAffinity[0].participant.kind, "communicationUser");
    assert.equal(data.channelAffinity[0].participant.communicationUser.id, CALL_TARGET_ID);
    assert.equal(data.recordingStateCallbackUri, CALL_CALLBACK_URL);
    assert.equal(request.method, "POST");
    assert.equal(
      request.url,
      `${baseUri}/calling/recordings?api-version=${apiVersion.mapper.defaultValue}`
    );
  });

  it("makes successful startRecording request", async function () {
    const mockResponse: RestModel.RecordingStateResponse = {
      recordingId: RECORDING_ID,
      recordingState: RECORDING_STATE,
    };

    const mockHttpClient = generateHttpClient(200, mockResponse);
    callRecording = createRecordingClient(mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    const recOptions: StartRecordingOptions = {
      recordingStateCallbackEndpointUrl: CALL_CALLBACK_URL,
      callLocator: { id: CALL_SERVER_CALL_ID, kind: "serverCallLocator" },
      recordingChannel: "unmixed",
      recordingFormat: "wav",
      recordingContent: "audio",
    };

    await callRecording.start(recOptions);
    const request = spy.getCall(0).args[0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.equal(data.callLocator.kind, "serverCallLocator");
    assert.equal(data.recordingStateCallbackUri, CALL_CALLBACK_URL);
    assert.equal(request.method, "POST");
    assert.equal(
      request.url,
      `${baseUri}/calling/recordings?api-version=${apiVersion.mapper.defaultValue}`
    );
  });

  it("makes successful getRecordingProperties request", async function () {
    const mockResponse: RestModel.RecordingStateResponse = {
      recordingId: RECORDING_ID,
      recordingState: RECORDING_STATE,
    };

    const mockHttpClient = generateHttpClient(200, mockResponse);
    callRecording = createRecordingClient(mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    await callRecording.getState(RECORDING_ID);
    const request = spy.getCall(0).args[0];

    assert.equal(request.method, "GET");
    assert.equal(
      request.url,
      `${baseUri}/calling/recordings/${RECORDING_ID}?api-version=${apiVersion.mapper.defaultValue}`
    );
  });

  it("Sends correct args to stop a recording", async () => {
    const mockHttpClient = generateHttpClient(204);
    callRecording = createRecordingClient(mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");
    await callRecording.stop(RECORDING_ID);
    const request = spy.getCall(0).args[0];

    assert.equal(
      request.url,
      `${baseUri}/calling/recordings/${RECORDING_ID}?api-version=${apiVersion.mapper.defaultValue}`
    );
    assert.equal(request.method, "DELETE");
  });

  it("Sends correct args to pause a recording", async () => {
    const mockHttpClient = generateHttpClient(202);
    callRecording = createRecordingClient(mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");
    await callRecording.pause(RECORDING_ID);
    const request = spy.getCall(0).args[0];

    assert.equal(
      request.url,
      `${baseUri}/calling/recordings/${RECORDING_ID}:pause?api-version=${apiVersion.mapper.defaultValue}`
    );
    assert.equal(request.method, "POST");
  });

  it("Sends correct args to resume a recording", async () => {
    const mockHttpClient = generateHttpClient(202);
    callRecording = createRecordingClient(mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");
    await callRecording.resume(RECORDING_ID);
    const request = spy.getCall(0).args[0];

    assert.equal(
      request.url,
      `${baseUri}/calling/recordings/${RECORDING_ID}:resume?api-version=${apiVersion.mapper.defaultValue}`
    );
    assert.equal(request.method, "POST");
  });
});
