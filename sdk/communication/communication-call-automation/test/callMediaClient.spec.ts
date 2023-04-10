// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
// External module imports
import Sinon, { SinonStubbedInstance } from "sinon";
import { assert } from "chai";
import { Context } from "mocha";

// Internal module imports
import { Recorder } from "@azure-tools/test-recorder";
import {
  CommunicationIdentifier,
  serializeCommunicationIdentifier,
  CommunicationUserIdentifier,
} from "@azure/communication-common";

// Parent directory imports
import { CallMedia } from "../src/callMedia";
import { FileSource, RecognizeInputType } from "../src/models/models";
import { CallMediaImpl } from "../src/generated/src/operations";
import {
  CallMediaRecognizeDtmfOptions,
  CallAutomationClient,
  CallInvite,
  CallConnection,
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
} from "./utils/recordedClient";

describe("CallMedia Unit Tests", () => {
  let callConnectionId: string;
  let callMediaImpl: SinonStubbedInstance<CallMediaImpl>;
  let callMedia: CallMedia;

  beforeEach(() => {
    callConnectionId = "test-connection-id";
    callMediaImpl = Sinon.createStubInstance(CallMediaImpl);
    callMedia = new CallMedia(callConnectionId, callMediaImpl as any);
  });

  it("Play", async () => {
    const playSource: FileSource = {
      uri: "https://example.com/audio.mp3",
    };
    const playTo: CommunicationIdentifier[] = [{ communicationUserId: "user1" }];
    // Call the play function
    await callMedia.play(playSource, playTo);

    // Check if the callMediaImpl.play was called with the correct arguments
    assert.isTrue(
      callMediaImpl.play.calledWith(callConnectionId, {
        playSourceInfo: {
          sourceType: "file",
          fileSource: { uri: playSource.uri },
          playSourceId: playSource.playSourceId,
        },
        playTo: playTo.map((identifier) => serializeCommunicationIdentifier(identifier)),
      })
    );
  });

  it("PlayToAll", async () => {
    const playSource: FileSource = {
      uri: "https://example.com/audio/test.wav",
    };
    const playTo: CommunicationIdentifier[] = [];

    // Call the play function
    await callMedia.playToAll(playSource);

    // Check if the callMediaImpl.play was called with the correct arguments
    assert.isTrue(
      callMediaImpl.play.calledWith(callConnectionId, {
        playSourceInfo: {
          sourceType: "file",
          fileSource: { uri: playSource.uri },
          playSourceId: playSource.playSourceId,
        },
        playTo: playTo.map((identifier) => serializeCommunicationIdentifier(identifier)),
      })
    );
  });

  it("StartRecognizing", async () => {
    const recognizeOptions: CallMediaRecognizeDtmfOptions = {
      maxTonesToCollect: 5,
      targetParticipant: { communicationUserId: "user1" },
      recognizeInputType: RecognizeInputType.Dtmf,
    };

    // Call the startRecognizing function
    await callMedia.startRecognizing(recognizeOptions);

    // Check if the callMediaImpl.recognize was called with the correct arguments
    assert.isTrue(
      callMediaImpl.recognize.calledWith(
        callConnectionId,
        {
          recognizeInputType: "dtmf",
          playPrompt: undefined,
          interruptCallMediaOperation: undefined,
          recognizeOptions: {
            interruptPrompt: undefined,
            initialSilenceTimeoutInSeconds: 5, // Set default value here
            targetParticipant: serializeCommunicationIdentifier(recognizeOptions.targetParticipant),
            dtmfOptions: {
              interToneTimeoutInSeconds: 2, // Set default value here
              maxTonesToCollect: 5,
              stopTones: undefined,
            },
          },
          operationContext: undefined,
        },
        {}
      )
    );
  });

  it("CancelAllMediaOperations", async () => {
    await callMedia.cancelAllMediaOperations();

    assert.isTrue(callMediaImpl.cancelAllMediaOperations.calledOnceWith(callConnectionId, {}));
  });
});

describe("Call Media Client Live Tests", function () {
  let recorder: Recorder;
  let callAutomationClient: CallAutomationClient;
  let callConnection: CallConnection;
  let testUser: CommunicationUserIdentifier;
  let testUser2: CommunicationUserIdentifier;
  let testName: string;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this.currentTest);
    testUser = await createTestUser(recorder);
    testUser2 = await createTestUser(recorder);
    callAutomationClient = createCallAutomationClient(recorder, testUser);
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

    const callInvite = new CallInvite(testUser2);
    const uniqueId = await serviceBusWithNewCall(testUser, testUser2);
    const callBackUrl: string = dispatcherCallback + `?q=${uniqueId}`;

    const result = await callAutomationClient.createCall(callInvite, callBackUrl);
    const incomingCallContext = await waitForIncomingCallContext(uniqueId, 8000);
    const callConnectionId: string = result.callConnectionProperties.callConnectionId
      ? result.callConnectionProperties.callConnectionId
      : "";
    assert.isDefined(incomingCallContext);

    if (incomingCallContext) {
      await callAutomationClient.answerCall(incomingCallContext, callBackUrl);
    }
    const callConnectedEvent = await waitForEvent("CallConnected", callConnectionId, 8000);
    assert.isDefined(callConnectedEvent);
    callConnection = result.callConnection;

    const playSource: FileSource = {
      uri: "https://example.com/audio/test.wav",
    };

    await callConnection.getCallMedia().play(playSource, [testUser2]);

    const playCompletedEvent = await waitForEvent("PlayCompleted", callConnectionId, 8000);
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

    const callInvite = new CallInvite(testUser2);
    const uniqueId = await serviceBusWithNewCall(testUser, testUser2);
    const callBackUrl: string = dispatcherCallback + `?q=${uniqueId}`;

    const result = await callAutomationClient.createCall(callInvite, callBackUrl);
    const incomingCallContext = await waitForIncomingCallContext(uniqueId, 8000);
    const callConnectionId: string = result.callConnectionProperties.callConnectionId
      ? result.callConnectionProperties.callConnectionId
      : "";
    assert.isDefined(incomingCallContext);

    if (incomingCallContext) {
      await callAutomationClient.answerCall(incomingCallContext, callBackUrl);
    }
    const callConnectedEvent = await waitForEvent("CallConnected", callConnectionId, 8000);
    assert.isDefined(callConnectedEvent);
    callConnection = result.callConnection;

    const playSource: FileSource = {
      uri: "https://example.com/audio/test.wav",
    };

    await callConnection.getCallMedia().playToAll(playSource)

    const playCompletedEvent = await waitForEvent("PlayCompleted", callConnectionId, 8000);
    assert.isDefined(playCompletedEvent)

    await callConnection.hangUp(true);
    const callDisconnectedEvent = await waitForEvent("CallDisconnected", callConnectionId, 8000);
    assert.isDefined(callDisconnectedEvent);
  }).timeout(60000);

  it("Cancel all media operations", async function () {
    testName = this.test?.fullTitle()
      ? this.test?.fullTitle().replace(/ /g, "_")
      : "create_call_and_hang_up";
    await loadPersistedEvents(testName);

    const callInvite = new CallInvite(testUser2);
    const uniqueId = await serviceBusWithNewCall(testUser, testUser2);
    const callBackUrl: string = dispatcherCallback + `?q=${uniqueId}`;

    const result = await callAutomationClient.createCall(callInvite, callBackUrl);
    const incomingCallContext = await waitForIncomingCallContext(uniqueId, 8000);
    const callConnectionId: string = result.callConnectionProperties.callConnectionId
      ? result.callConnectionProperties.callConnectionId
      : "";
    assert.isDefined(incomingCallContext);

    if (incomingCallContext) {
      await callAutomationClient.answerCall(incomingCallContext, callBackUrl);
    }
    const callConnectedEvent = await waitForEvent("CallConnected", callConnectionId, 8000);
    assert.isDefined(callConnectedEvent);
    callConnection = result.callConnection;

    const playSource: FileSource = {
      uri: "https://example.com/audio/test.wav",
    };

    await callConnection.getCallMedia().playToAll(playSource);
    await callConnection.getCallMedia().cancelAllMediaOperations();

    const playCanceledEvent = await waitForEvent("PlayCanceled", callConnectionId, 8000);
    assert.isDefined(playCanceledEvent);

    await callConnection.hangUp(true);
    const callDisconnectedEvent = await waitForEvent("CallDisconnected", callConnectionId, 8000);
    assert.isDefined(callDisconnectedEvent);
  }).timeout(60000);

  it("Start recogizing", async function () {
    testName = this.test?.fullTitle()
      ? this.test?.fullTitle().replace(/ /g, "_")
      : "create_call_and_hang_up";
    await loadPersistedEvents(testName);

    const callInvite = new CallInvite(testUser2);
    const uniqueId = await serviceBusWithNewCall(testUser, testUser2);
    const callBackUrl: string = dispatcherCallback + `?q=${uniqueId}`;

    const result = await callAutomationClient.createCall(callInvite, callBackUrl);
    const incomingCallContext = await waitForIncomingCallContext(uniqueId, 8000);
    const callConnectionId: string = result.callConnectionProperties.callConnectionId
      ? result.callConnectionProperties.callConnectionId
      : "";
    assert.isDefined(incomingCallContext);

    if (incomingCallContext) {
      await callAutomationClient.answerCall(incomingCallContext, callBackUrl);
    }
    const callConnectedEvent = await waitForEvent("CallConnected", callConnectionId, 8000);
    assert.isDefined(callConnectedEvent);
    callConnection = result.callConnection;

    const recognizeOptions: CallMediaRecognizeDtmfOptions = {
      maxTonesToCollect: 5,
      targetParticipant: { communicationUserId: "user1" },
      recognizeInputType: RecognizeInputType.Dtmf,
    };    

    await callConnection.getCallMedia().startRecognizing(recognizeOptions);

    const recognizeCompletedEvent = await waitForEvent("RecognizeCompleted", callConnectionId, 8000);
    assert.isDefined(recognizeCompletedEvent);

    await callConnection.hangUp(true);
    const callDisconnectedEvent = await waitForEvent("CallDisconnected", callConnectionId, 8000);
    assert.isDefined(callDisconnectedEvent);
  }).timeout(60000);

});
