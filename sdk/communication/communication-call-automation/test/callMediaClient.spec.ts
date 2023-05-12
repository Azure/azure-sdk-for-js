// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
// External module imports
import { Context } from "mocha";

// Internal module imports
import { Recorder } from "@azure-tools/test-recorder";
import {
  CommunicationIdentifier,
  CommunicationUserIdentifier,
  serializeCommunicationIdentifier,
} from "@azure/communication-common";

// Parent directory imports
import { CallMedia } from "../src/callMedia";
import { FileSource } from "../src/models/models";
import {
  CallMediaRecognizeDtmfOptions,
  CallAutomationClient,
  CallConnection,
  CallInvite,
  ContinuousDtmfRecognitionOptions,
  SendDtmfOptions,
} from "../src";

// Current directory imports
import {
  createRecorder,
  createTestUser,
  dispatcherCallback,
  serviceBusWithNewCall,
  createCallAutomationClient,
  waitForIncomingCallContext,
  waitForEvent,
  events,
  serviceBusReceivers,
  incomingCallContexts,
  loadPersistedEvents,
  persistEvents,
  fileSourceUrl,
} from "./utils/recordedClient";
import sinon from "sinon";
import { assert } from "chai";
import { createMediaClient, generateHttpClient } from "./utils/mockClient";
import {
  CALL_CONNECTION_ID,
  CALL_TARGET_ID,
  MEDIA_UR_MP3,
  MEDIA_URL_WAV,
  baseUri,
  generateToken,
} from "./utils/connectionUtils";

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

  it("makes successful StartContinuousDtmfRecognition request", async function () {
    const mockHttpClient = generateHttpClient(200);

    callMedia = createMediaClient(mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");
    const targetParticipant: CommunicationIdentifier = { communicationUserId: CALL_TARGET_ID };
    const continuousDtmfRecognitionOptions: ContinuousDtmfRecognitionOptions = {
      operationContext: "test_operation_context",
    };

    await callMedia.startContinuousDtmfRecognition(
      targetParticipant,
      continuousDtmfRecognitionOptions
    );
    const request = spy.getCall(0).args[0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.deepEqual(data.targetParticipant, serializeCommunicationIdentifier(targetParticipant));
    assert.equal(data.operationContext, continuousDtmfRecognitionOptions.operationContext);
    assert.equal(request.method, "POST");
  });

  it("makes successful StopContinuousDtmfRecognition request", async function () {
    const mockHttpClient = generateHttpClient(200);

    callMedia = createMediaClient(mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");
    const targetParticipant: CommunicationIdentifier = { communicationUserId: CALL_TARGET_ID };
    const continuousDtmfRecognitionOptions: ContinuousDtmfRecognitionOptions = {
      operationContext: "test_operation_context",
    };

    await callMedia.stopContinuousDtmfRecognition(
      targetParticipant,
      continuousDtmfRecognitionOptions
    );
    const request = spy.getCall(0).args[0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.deepEqual(data.targetParticipant, serializeCommunicationIdentifier(targetParticipant));
    assert.equal(data.operationContext, continuousDtmfRecognitionOptions.operationContext);
    assert.equal(request.method, "POST");
  });

  it("makes successful SendDtmf request", async function () {
    const mockHttpClient = generateHttpClient(202);

    callMedia = createMediaClient(mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");
    const targetParticipant: CommunicationIdentifier = { communicationUserId: CALL_TARGET_ID };
    const sendDtmfOptions: SendDtmfOptions = {
      operationContext: "test_operation_context",
    };
    const tones = ["one", "two", "three", "pound"];

    await callMedia.sendDtmf(targetParticipant, tones, sendDtmfOptions);
    const request = spy.getCall(0).args[0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.deepEqual(data.targetParticipant, serializeCommunicationIdentifier(targetParticipant));
    assert.deepEqual(data.tones, tones);
    assert.equal(data.operationContext, sendDtmfOptions.operationContext);
    assert.equal(request.method, "POST");
  });
});

describe("Call Media Client Live Tests", function () {
  let recorder: Recorder;
  let callerCallAutomationClient: CallAutomationClient;
  let receiverCallAutomationClient: CallAutomationClient;
  let callConnection: CallConnection;
  let testUser: CommunicationUserIdentifier;
  let testUser2: CommunicationUserIdentifier;
  let testName: string;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this.currentTest);
    testUser = await createTestUser(recorder);
    testUser2 = await createTestUser(recorder);
    callerCallAutomationClient = createCallAutomationClient(recorder, testUser);
    receiverCallAutomationClient = createCallAutomationClient(recorder, testUser2);
  });

  afterEach(async function (this: Context) {
    persistEvents(testName);
    if (callConnection) {
      try {
        await callConnection.hangUp(true);
      } catch (e) {
        console.log("Call is terminated");
      }
    }
    serviceBusReceivers.forEach((receiver) => {
      receiver.close();
    });
    events.forEach((callConnectionEvents) => {
      callConnectionEvents.clear();
    });
    events.clear();
    serviceBusReceivers.clear();
    incomingCallContexts.clear();
    await recorder.stop();
  });

  it("Play audio to target participant", async function () {
    testName = this.test?.fullTitle()
      ? this.test?.fullTitle().replace(/ /g, "_")
      : "create_call_and_hang_up";
    await loadPersistedEvents(testName);

    const callInvite: CallInvite = { targetParticipant: testUser2 };
    const uniqueId = await serviceBusWithNewCall(testUser, testUser2);
    const callBackUrl: string = dispatcherCallback + `?q=${uniqueId}`;

    const result = await callerCallAutomationClient.createCall(callInvite, callBackUrl);
    const incomingCallContext = await waitForIncomingCallContext(uniqueId, 8000);
    const callConnectionId: string = result.callConnectionProperties.callConnectionId
      ? result.callConnectionProperties.callConnectionId
      : "";
    assert.isDefined(incomingCallContext);

    if (incomingCallContext) {
      await receiverCallAutomationClient.answerCall(incomingCallContext, callBackUrl);
    }
    const callConnectedEvent = await waitForEvent("CallConnected", callConnectionId, 8000);
    assert.isDefined(callConnectedEvent);
    callConnection = result.callConnection;

    const playSource: FileSource = {
      url: fileSourceUrl,
      kind: "fileSource",
    };

    await callConnection.getCallMedia().play(playSource, [testUser2]);
    const playCompletedEvent = await waitForEvent("PlayCompleted", callConnectionId, 20000);
    assert.isDefined(playCompletedEvent);
    await callConnection.hangUp(true);
    const callDisconnectedEvent = await waitForEvent("CallDisconnected", callConnectionId, 8000);
    assert.isDefined(callDisconnectedEvent);
  }).timeout(60000);

  it("Play audio to all participants", async function () {
    testName = this.test?.fullTitle()
      ? this.test?.fullTitle().replace(/ /g, "_")
      : "create_call_and_hang_up";
    await loadPersistedEvents(testName);

    const callInvite: CallInvite = { targetParticipant: testUser2 };
    const uniqueId = await serviceBusWithNewCall(testUser, testUser2);
    const callBackUrl: string = dispatcherCallback + `?q=${uniqueId}`;

    const result = await callerCallAutomationClient.createCall(callInvite, callBackUrl);
    const incomingCallContext = await waitForIncomingCallContext(uniqueId, 8000);
    const callConnectionId: string = result.callConnectionProperties.callConnectionId
      ? result.callConnectionProperties.callConnectionId
      : "";
    assert.isDefined(incomingCallContext);

    if (incomingCallContext) {
      await receiverCallAutomationClient.answerCall(incomingCallContext, callBackUrl);
    }
    const callConnectedEvent = await waitForEvent("CallConnected", callConnectionId, 8000);
    assert.isDefined(callConnectedEvent);
    callConnection = result.callConnection;

    const playSource: FileSource = {
      url: fileSourceUrl,
      kind: "fileSource",
    };

    await callConnection.getCallMedia().playToAll(playSource);

    const playCompletedEvent = await waitForEvent("PlayCompleted", callConnectionId, 20000);
    assert.isDefined(playCompletedEvent);

    await callConnection.hangUp(true);
    const callDisconnectedEvent = await waitForEvent("CallDisconnected", callConnectionId, 8000);
    assert.isDefined(callDisconnectedEvent);
  }).timeout(60000);

  it("Cancel all media operations", async function () {
    testName = this.test?.fullTitle()
      ? this.test?.fullTitle().replace(/ /g, "_")
      : "create_call_and_hang_up";
    await loadPersistedEvents(testName);

    const callInvite: CallInvite = { targetParticipant: testUser2 };
    const uniqueId = await serviceBusWithNewCall(testUser, testUser2);
    const callBackUrl: string = dispatcherCallback + `?q=${uniqueId}`;

    const result = await callerCallAutomationClient.createCall(callInvite, callBackUrl);
    const incomingCallContext = await waitForIncomingCallContext(uniqueId, 8000);
    const callConnectionId: string = result.callConnectionProperties.callConnectionId
      ? result.callConnectionProperties.callConnectionId
      : "";
    assert.isDefined(incomingCallContext);

    if (incomingCallContext) {
      await receiverCallAutomationClient.answerCall(incomingCallContext, callBackUrl);
    }
    const callConnectedEvent = await waitForEvent("CallConnected", callConnectionId, 8000);
    assert.isDefined(callConnectedEvent);
    callConnection = result.callConnection;

    const playSource: FileSource = {
      url: fileSourceUrl,
      kind: "fileSource",
    };

    await callConnection.getCallMedia().playToAll(playSource);
    await callConnection.getCallMedia().cancelAllOperations();

    const playCanceledEvent = await waitForEvent("PlayCanceled", callConnectionId, 20000);
    assert.isDefined(playCanceledEvent);

    await callConnection.hangUp(true);
    const callDisconnectedEvent = await waitForEvent("CallDisconnected", callConnectionId, 8000);
    assert.isDefined(callDisconnectedEvent);
  }).timeout(60000);
});
