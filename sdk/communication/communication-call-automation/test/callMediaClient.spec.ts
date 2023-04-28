// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import sinon from "sinon";
import { assert } from "chai";
import { CallMedia } from "../src/callMedia";
import { createMediaClient, generateHttpClient } from "./utils/mockClient";
import {
  CALL_CONNECTION_ID,
  CALL_TARGET_ID,
  MEDIA_UR_MP3,
  MEDIA_URL_WAV,
  baseUri,
  generateToken,
} from "./utils/connectionUtils";
import { CommunicationIdentifier } from "@azure/communication-common";
import { FileSource } from "../src/models/models";
import { CallMediaRecognizeDtmfOptions } from "../src/models/options";

describe("CallMedia Unit Tests", async function () {
  let callMedia: CallMedia;

  afterEach(function () {
    sinon.restore();
  });

  it("can instantiate", async function () {
    new CallMedia(CALL_CONNECTION_ID, baseUri, { key: generateToken() });
  });

  it("makes successful Play request", async function () {
    const mockHttpClient = generateHttpClient(202);

    callMedia = createMediaClient(mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    const playSource: FileSource = {
      url: MEDIA_UR_MP3,
      kind: "fileSource",
    };

    const playTo: CommunicationIdentifier[] = [{ communicationUserId: CALL_TARGET_ID }];

    await callMedia.play(playSource, playTo);
    const request = spy.getCall(0).args[0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.equal(data.playTo[0].rawId, CALL_TARGET_ID);
    assert.equal(data.playSourceInfo.sourceType, "file");
    assert.equal(data.playSourceInfo.fileSource.uri, playSource.url);
    assert.equal(request.method, "POST");
  });

  it("makes successful PlayToAll request", async function () {
    const mockHttpClient = generateHttpClient(202);

    callMedia = createMediaClient(mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    const playSource: FileSource = {
      url: MEDIA_URL_WAV,
      kind: "fileSource",
    };

    const playTo: CommunicationIdentifier[] = [];

    await callMedia.play(playSource, playTo);
    const request = spy.getCall(0).args[0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.equal(data.playSourceInfo.sourceType, "file");
    assert.equal(data.playSourceInfo.fileSource.uri, playSource.url);
    assert.equal(request.method, "POST");
  });

  it("makes successful StartRecognizing request", async function () {
    const mockHttpClient = generateHttpClient(202);

    callMedia = createMediaClient(mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");
    const targetParticipant: CommunicationIdentifier = { communicationUserId: CALL_TARGET_ID };
    const recognizeOptions: CallMediaRecognizeDtmfOptions = {
      kind: "callMediaRecognizeDtmfOptions",
    };
    const maxTonesToCollect = 5;

    await callMedia.startRecognizing(targetParticipant, maxTonesToCollect, recognizeOptions);
    const request = spy.getCall(0).args[0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.equal(data.recognizeInputType, "dtmf");
    assert.equal(data.recognizeOptions.dtmfOptions.maxTonesToCollect, 5);
    assert.equal(request.method, "POST");
  });

  it("makes successful CancelAllMediaOperations request", async function () {
    const mockHttpClient = generateHttpClient(202);

    callMedia = createMediaClient(mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");
    await callMedia.cancelAllOperations();

    const request = spy.getCall(0).args[0];

    assert.equal(request.method, "POST");
  });

  it("StartContinuousDtmfRecognition", async () => {
    const targetParticipant = { communicationUserId: "user1" };
    const operationContext = "testoperationcontext";

    // Call the startContinuousDtmfRecognition function
    await callMedia.startContinuousDtmfRecognition(targetParticipant, operationContext);

    // Check if the callMediaImpl.startContinuousDtmfRecognition was called with the correct arguments
    assert.isTrue(
      callMediaImpl.startContinuousDtmfRecognition.calledWith(
        callConnectionId,
        {
          targetParticipant: serializeCommunicationIdentifier(targetParticipant),
          operationContext: operationContext,
        },
        {}
      )
    );
  });

  it("StopContinuousDtmfRecognition", async () => {
    const targetParticipant = { communicationUserId: "user1" };
    const operationContext = "test_operation_context";

    // Call the stopContinuousDtmfRecognition function
    await callMedia.stopContinuousDtmfRecognition(targetParticipant, operationContext);

    // Check if the callMediaImpl.stopContinuousDtmfRecognition was called with the correct arguments
    assert.isTrue(
      callMediaImpl.stopContinuousDtmfRecognition.calledWith(
        callConnectionId,
        {
          targetParticipant: serializeCommunicationIdentifier(targetParticipant),
          operationContext: operationContext,
        },
        {}
      )
    );
  });

  it("SendDtmf", async () => {
    const targetParticipant = { communicationUserId: "user1" };
    const tones = ["one", "two", "three", "pound"];
    const operationContext = "test_operation_context";

    // Call the sendDtmf function
    await callMedia.sendDtmf(targetParticipant, tones, operationContext);

    // Check if the callMediaImpl.sendDtmf was called with the correct arguments
    assert.isTrue(
      callMediaImpl.sendDtmf.calledWith(
        callConnectionId,
        {
          targetParticipant: serializeCommunicationIdentifier(targetParticipant),
          tones: tones,
          operationContext: operationContext,
        },
        {}
      )
    );
  });
});
