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
import {
  AnswerCallOptions,
  CreateCallOptions,
  PlayOptions,
  StartRecordingOptions,
} from "../src/models/options";
import { ChannelAffinity } from "@azure/communication-call-automation";
import { CommunicationIdentifier, CommunicationUserIdentifier } from "@azure/communication-common";
import { CallAutomationClient, CallInvite, CallConnection } from "../src";
import { Recorder } from "@azure-tools/test-recorder";
import { Context } from "mocha";
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
import { FileSource } from "../src/models/models";

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
  });

  it("Sends correct args to stop a recording", async () => {
    const mockHttpClient = generateHttpClient(204);
    callRecording = createRecordingClient(mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");
    await callRecording.stop(RECORDING_ID);
    const request = spy.getCall(0).args[0];
    assert.equal(request.method, "DELETE");
  });

  it("Sends correct args to pause a recording", async () => {
    const mockHttpClient = generateHttpClient(202);
    callRecording = createRecordingClient(mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");
    await callRecording.pause(RECORDING_ID);
    const request = spy.getCall(0).args[0];
    assert.equal(request.method, "POST");
  });

  it("Sends correct args to resume a recording", async () => {
    const mockHttpClient = generateHttpClient(202);
    callRecording = createRecordingClient(mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");
    await callRecording.resume(RECORDING_ID);
    const request = spy.getCall(0).args[0];
    assert.equal(request.method, "POST");
  });
});

describe("CallRecording Live Tests", function () {
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
    if (callConnection) {
      try {
        await callConnection.hangUp(true);
      } catch {
        return;
      }
    }
  });

  it("Creates a call, start recording, and hangs up", async function () {
    testName = this.test?.fullTitle()
      ? this.test?.fullTitle().replace(/ /g, "_")
      : "create_call_start_recording_and_hang_up";
    await loadPersistedEvents(testName);

    const callInvite: CallInvite = { targetParticipant: testUser2 };
    const uniqueId = await serviceBusWithNewCall(testUser, testUser2);
    const callBackUrl: string = dispatcherCallback + `?q=${uniqueId}`;
    const createCallOption: CreateCallOptions = { operationContext: "recordingCreateCall" };

    const result = await callerCallAutomationClient.createCall(
      callInvite,
      callBackUrl,
      createCallOption,
    );
    const incomingCallContext = await waitForIncomingCallContext(uniqueId, 8000);
    const callConnectionId: string = result.callConnectionProperties.callConnectionId
      ? result.callConnectionProperties.callConnectionId
      : "";
    assert.isDefined(incomingCallContext);

    if (incomingCallContext) {
      const answerCallOption: AnswerCallOptions = { operationContext: "recordingAnswer" };
      await receiverCallAutomationClient.answerCall(
        incomingCallContext,
        callBackUrl,
        answerCallOption,
      );
    }
    const callConnectedEvent = await waitForEvent("CallConnected", callConnectionId, 8000);

    assert.isDefined(callConnectedEvent);
    callConnection = result.callConnection;

    const playSource: FileSource[] = [
      {
        url: fileSourceUrl,
        kind: "fileSource",
      },
    ];

    // Call recording can fail when no audio is in call, we will play audio to avoid that.
    const playToAllOptions: PlayOptions = { operationContext: "recordingPlay" };
    await callConnection.getCallMedia().playToAll(playSource, playToAllOptions);

    const recOptions: StartRecordingOptions = {
      recordingStateCallbackEndpointUrl: callBackUrl,
      callLocator: {
        id: (await callConnection.getCallConnectionProperties()).serverCallId || "",
        kind: "serverCallLocator",
      },
      recordingChannel: "unmixed",
      recordingFormat: "wav",
      recordingContent: "audio",
    };

    const recordingStateResult = await callerCallAutomationClient
      .getCallRecording()
      .start(recOptions);

    // Delay for 6 seconds, this is to let the recording state change to active
    await new Promise((resolve) => setTimeout(resolve, 6000));
    const recStatus = await callerCallAutomationClient
      .getCallRecording()
      .getState(recordingStateResult.recordingId);
    assert.equal(recStatus.recordingState, "active");
    await callerCallAutomationClient.getCallRecording().stop(recordingStateResult.recordingId);
  }).timeout(60000);
});
