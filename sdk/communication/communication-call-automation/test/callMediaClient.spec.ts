// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
// External module imports
import { Context } from "mocha";

// Internal module imports
import { Recorder } from "@azure-tools/test-recorder";
import {
  CommunicationIdentifier,
  CommunicationUserIdentifier,
  PhoneNumberIdentifier,
  serializeCommunicationIdentifier,
} from "@azure/communication-common";

// Parent directory imports
import { CallMedia } from "../src/callMedia";
import { FileSource, TextSource, SsmlSource, Choice, DtmfTone } from "../src/models/models";
import {
  CallMediaRecognizeDtmfOptions,
  CallMediaRecognizeChoiceOptions,
  CallMediaRecognizeSpeechOptions,
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
  getPhoneNumbers,
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

  it("makes successful Play file request", async function () {
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

  it("makes successful Play TTS request", async function () {
    const mockHttpClient = generateHttpClient(202);

    callMedia = createMediaClient(mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    const playSource: TextSource = {
      text: "test test test",
      customVoiceEndpointId: "customVoiceEndpointId",
      kind: "textSource",
    };

    const playTo: CommunicationIdentifier[] = [{ communicationUserId: CALL_TARGET_ID }];

    await callMedia.play(playSource, playTo);
    const request = spy.getCall(0).args[0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.equal(data.playTo[0].rawId, CALL_TARGET_ID);
    assert.equal(data.playSourceInfo.sourceType, "text");
    assert.equal(data.playSourceInfo.textSource.text, playSource.text);
    assert.equal(request.method, "POST");
  });

  it("makes successful Play SSML request", async function () {
    const mockHttpClient = generateHttpClient(202);

    callMedia = createMediaClient(mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    const playSource: SsmlSource = {
      ssmlText:
        '<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US"><voice name="en-US-JennyNeural">Recognize Choice Completed, played through SSML source.</voice></speak>',
      customVoiceEndpointId: "customVoiceEndpointId",
      kind: "ssmlSource",
    };

    const playTo: CommunicationIdentifier[] = [{ communicationUserId: CALL_TARGET_ID }];

    await callMedia.play(playSource, playTo);
    const request = spy.getCall(0).args[0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.equal(data.playTo[0].rawId, CALL_TARGET_ID);
    assert.equal(data.playSourceInfo.sourceType, "ssml");
    assert.equal(data.playSourceInfo.ssmlSource.ssmlText, playSource.ssmlText);
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

  it("makes successful StartRecognizing DTMF request", async function () {
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

  it("makes successful StartRecognizing Choices request", async function () {
    const mockHttpClient = generateHttpClient(202);

    callMedia = createMediaClient(mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");
    const targetParticipant: CommunicationIdentifier = { communicationUserId: CALL_TARGET_ID };
    const choice: Choice = {
      label: "choice",
      phrases: ["test"],
    };
    const recognizeOptions: CallMediaRecognizeChoiceOptions = {
      choices: [choice],
      kind: "callMediaRecognizeChoiceOptions",
    };
    const maxTonesToCollect = 5;

    await callMedia.startRecognizing(targetParticipant, maxTonesToCollect, recognizeOptions);
    const request = spy.getCall(0).args[0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.equal(data.recognizeInputType, "choices");
    assert.equal(data.recognizeOptions.choices[0].phrases[0], "test");
    assert.equal(request.method, "POST");
  });

  it("makes successful StartRecognizing Speech request", async function () {
    const mockHttpClient = generateHttpClient(202);

    callMedia = createMediaClient(mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");
    const targetParticipant: CommunicationIdentifier = { communicationUserId: CALL_TARGET_ID };
    const recognizeOptions: CallMediaRecognizeSpeechOptions = {
      kind: "callMediaRecognizeSpeechOptions",
      speechModelEndpointId: "customModelEndpointId",
    };
    const maxTonesToCollect = 5;

    await callMedia.startRecognizing(targetParticipant, maxTonesToCollect, recognizeOptions);
    const request = spy.getCall(0).args[0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.equal(data.recognizeInputType, "speech");
    assert.equal(data.recognizeOptions.speechOptions.endSilenceTimeoutInMs, 2);
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

    await callMedia.sendDtmf(tones, targetParticipant, sendDtmfOptions);
    const request = spy.getCall(0).args[0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.deepEqual(data.targetParticipant, serializeCommunicationIdentifier(targetParticipant));
    assert.deepEqual(data.tones, tones);
    assert.equal(data.operationContext, sendDtmfOptions.operationContext);
    assert.equal(request.method, "POST");
  });

  it("makes successful Start Hold Music request", async function () {
    const mockHttpClient = generateHttpClient(200);

    callMedia = createMediaClient(mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    const playSource: TextSource = {
      text: "test test test",
      customVoiceEndpointId: "customVoiceEndpointId",
      kind: "textSource",
    };

    const participantToHold: CommunicationIdentifier = { communicationUserId: CALL_TARGET_ID };

    await callMedia.startHoldMusic(participantToHold, playSource);
    const request = spy.getCall(0).args[0];
    const data = JSON.parse(request.body?.toString() || "");
    console.log(data);
    assert.equal(data.participantToHold.rawId, CALL_TARGET_ID);
    assert.equal(data.playSourceInfo.sourceType, "text");
    assert.equal(data.playSourceInfo.textSource.text, playSource.text);
    assert.equal(data.loop, true);
    assert.equal(request.method, "POST");
  });

  it("makes successful Stop Hold Music request", async function () {
    const mockHttpClient = generateHttpClient(200);

    callMedia = createMediaClient(mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    const participantToUnhold: CommunicationIdentifier = { communicationUserId: CALL_TARGET_ID };

    await callMedia.stopHoldMusic(participantToUnhold);
    const request = spy.getCall(0).args[0];
    const data = JSON.parse(request.body?.toString() || "");
    console.log(data);
    assert.equal(data.participantToUnhold.rawId, CALL_TARGET_ID);
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
  let callerPhoneUser: PhoneNumberIdentifier;
  let receiverPhoneUser: PhoneNumberIdentifier;
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

  it("Trigger DTMF actions", async function () {
    testName = this.test?.fullTitle()
      ? this.test?.fullTitle().replace(/ /g, "_")
      : "create_call_and_trigger_dtmf_actions_then_hang_up";
    await loadPersistedEvents(testName);

    const phoneNumbers = await getPhoneNumbers(recorder);
    assert.isAtLeast(
      phoneNumbers.length,
      2,
      "Invalid PSTN setup, test needs at least 2 phone numbers"
    );
    callerPhoneUser = { phoneNumber: phoneNumbers.pop() as string };
    receiverPhoneUser = { phoneNumber: phoneNumbers.pop() as string };

    const callInvite: CallInvite = {
      targetParticipant: receiverPhoneUser,
      sourceCallIdNumber: callerPhoneUser,
    };
    const uniqueId = await serviceBusWithNewCall(callerPhoneUser, receiverPhoneUser);
    const callBackUrl: string = dispatcherCallback + `?q=${uniqueId}`;

    const result = await callerCallAutomationClient.createCall(callInvite, callBackUrl);
    const incomingCallContext = await waitForIncomingCallContext(uniqueId, 30000);
    const callConnectionId: string = result.callConnectionProperties.callConnectionId
      ? result.callConnectionProperties.callConnectionId
      : "";
    assert.isDefined(incomingCallContext);

    let answerCallResult;
    if (incomingCallContext) {
      answerCallResult = await receiverCallAutomationClient.answerCall(
        incomingCallContext,
        callBackUrl
      );
    }
    const callConnectedEvent = await waitForEvent("CallConnected", callConnectionId, 8000);
    assert.isDefined(callConnectedEvent);
    callConnection = result.callConnection;
    const receivercallConnectionId: string = answerCallResult?.callConnectionProperties
      .callConnectionId
      ? answerCallResult?.callConnectionProperties.callConnectionId
      : "";

    await callConnection.getCallMedia().startContinuousDtmfRecognition(receiverPhoneUser);

    await callConnection.getCallMedia().sendDtmf([DtmfTone.Pound], receiverPhoneUser);
    const sendDtmfCompleted = await waitForEvent("SendDtmfCompleted", callConnectionId, 8000);
    assert.isDefined(sendDtmfCompleted);

    const continuousDtmfRecognitionToneReceivedEvent = await waitForEvent(
      "ContinuousDtmfRecognitionToneReceived",
      receivercallConnectionId,
      8000
    );
    assert.isDefined(continuousDtmfRecognitionToneReceivedEvent);

    await callConnection.getCallMedia().stopContinuousDtmfRecognition(receiverPhoneUser);
    const continuousDtmfRecognitionStopped = await waitForEvent(
      "ContinuousDtmfRecognitionStopped",
      callConnectionId,
      8000
    );
    assert.isDefined(continuousDtmfRecognitionStopped);

    await callConnection.hangUp(true);
    const callDisconnectedEvent = await waitForEvent("CallDisconnected", callConnectionId, 8000);
    assert.isDefined(callDisconnectedEvent);
  }).timeout(60000);
});