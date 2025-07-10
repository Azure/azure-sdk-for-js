// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type * as RestModel from "../../src/generated/src/models/index.js";
import { createRecordingClient, generateHttpClient } from "../utils/mockClient.js";
import {
  baseUri,
  CALL_CALLBACK_URL,
  CALL_CONNECTION_ID,
  CALL_SERVER_CALL_ID,
  CALL_TARGET_ID,
  generateToken,
  RECORDING_ID,
  RECORDING_STATE,
} from "../utils/connectionUtils.js";
import { CallRecording } from "../../src/callRecording.js";
import type {
  AnswerCallOptions,
  CreateCallOptions,
  PlayOptions,
  StartRecordingOptions,
} from "../../src/models/options.js";
import { apiVersion } from "../../src/generated/src/models/parameters.js";
import type { ChannelAffinity } from "@azure/communication-call-automation";
import type {
  CommunicationIdentifier,
  CommunicationUserIdentifier,
} from "@azure/communication-common";
import type { CallAutomationClient, CallInvite, CallConnection } from "../../src/index.js";
import type { Recorder } from "@azure-tools/test-recorder";
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
} from "../utils/recordedClient.js";
import type { FileSource } from "../../src/models/models.js";
import { describe, it, assert, vi, beforeEach, afterEach } from "vitest";

describe("CallRecording Unit Tests", () => {
  let callRecording: CallRecording;

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("can instantiate", async () => {
    new CallRecording(baseUri, { key: generateToken() });
  });

  it("makes successful startRecording request with channel affinity", async () => {
    const mockResponse: RestModel.RecordingStateResponse = {
      recordingId: RECORDING_ID,
      recordingState: RECORDING_STATE,
    };

    const mockHttpClient = generateHttpClient(200, mockResponse);
    callRecording = createRecordingClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");

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
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.equal(data.callLocator.kind, "serverCallLocator");
    assert.equal(data.channelAffinity[0].channel, 0);
    assert.equal(data.channelAffinity[0].participant.rawId, CALL_TARGET_ID);
    assert.equal(data.channelAffinity[0].participant.kind, "communicationUser");
    assert.equal(data.channelAffinity[0].participant.communicationUser.id, CALL_TARGET_ID);
    assert.equal(data.recordingStateCallbackUri, CALL_CALLBACK_URL);
    assert.equal(request.method, "POST");
  });

  it("makes successful startRecording request", async () => {
    const mockResponse: RestModel.RecordingStateResponse = {
      recordingId: RECORDING_ID,
      recordingState: RECORDING_STATE,
    };

    const mockHttpClient = generateHttpClient(200, mockResponse);
    callRecording = createRecordingClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");

    const recOptions: StartRecordingOptions = {
      recordingStateCallbackEndpointUrl: CALL_CALLBACK_URL,
      callLocator: { id: CALL_SERVER_CALL_ID, kind: "serverCallLocator" },
      recordingChannel: "unmixed",
      recordingFormat: "wav",
      recordingContent: "audio",
    };

    await callRecording.start(recOptions);
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.equal(data.callLocator.kind, "serverCallLocator");
    assert.equal(data.recordingStateCallbackUri, CALL_CALLBACK_URL);
    assert.equal(request.method, "POST");
  });

  it("makes successful getRecordingProperties request", async () => {
    const mockResponse: RestModel.RecordingStateResponse = {
      recordingId: RECORDING_ID,
      recordingState: RECORDING_STATE,
    };

    const mockHttpClient = generateHttpClient(200, mockResponse);
    callRecording = createRecordingClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");

    await callRecording.getState(RECORDING_ID);
    const request = spy.mock.calls[0][0];

    assert.equal(request.method, "GET");
  });

  it("Sends correct args to stop a recording", async () => {
    const mockHttpClient = generateHttpClient(204);
    callRecording = createRecordingClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");
    await callRecording.stop(RECORDING_ID);
    const request = spy.mock.calls[0][0];

    assert.equal(
      request.url,
      `${baseUri}/calling/recordings/${RECORDING_ID}?api-version=${apiVersion.mapper.defaultValue}`,
    );
    assert.equal(request.method, "DELETE");
  });

  it("Sends correct args to pause a recording", async () => {
    const mockHttpClient = generateHttpClient(202);
    callRecording = createRecordingClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");
    await callRecording.pause(RECORDING_ID);
    const request = spy.mock.calls[0][0];

    assert.equal(
      request.url,
      `${baseUri}/calling/recordings/${RECORDING_ID}:pause?api-version=${apiVersion.mapper.defaultValue}`,
    );
    assert.equal(request.method, "POST");
  });

  it("Sends correct args to resume a recording", async () => {
    const mockHttpClient = generateHttpClient(202);
    callRecording = createRecordingClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");
    await callRecording.resume(RECORDING_ID);
    const request = spy.mock.calls[0][0];

    assert.equal(
      request.url,
      `${baseUri}/calling/recordings/${RECORDING_ID}:resume?api-version=${apiVersion.mapper.defaultValue}`,
    );
    assert.equal(request.method, "POST");
  });

  it("makes successful startRecording request with call connection id", async () => {
    const mockResponse: RestModel.RecordingStateResponse = {
      recordingId: RECORDING_ID,
      recordingState: RECORDING_STATE,
    };

    const mockHttpClient = generateHttpClient(200, mockResponse);
    callRecording = createRecordingClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");

    const recOptions: StartRecordingOptions = {
      recordingStateCallbackEndpointUrl: CALL_CALLBACK_URL,
      callConnectionId: CALL_CONNECTION_ID,
      recordingChannel: "unmixed",
      recordingFormat: "wav",
      recordingContent: "audio",
    };

    await callRecording.start(recOptions);
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.equal(data.recordingStateCallbackUri, CALL_CALLBACK_URL);
    assert.equal(request.method, "POST");
  });
});

describe("CallRecording Live Tests", () => {
  let recorder: Recorder;
  let callerCallAutomationClient: CallAutomationClient;
  let receiverCallAutomationClient: CallAutomationClient;
  let callConnection: CallConnection;
  let testUser: CommunicationUserIdentifier;
  let testUser2: CommunicationUserIdentifier;
  let testName: string;

  beforeEach(async function (ctx) {
    recorder = await createRecorder(ctx);
    testUser = await createTestUser(recorder);
    testUser2 = await createTestUser(recorder);
    callerCallAutomationClient = createCallAutomationClient(recorder, testUser);
    receiverCallAutomationClient = createCallAutomationClient(recorder, testUser2);
  });

  afterEach(async () => {
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

  it("Creates a call, start recording, and hangs up", { timeout: 60000 }, async function (ctx) {
    const fullTitle: string | undefined =
      ctx.task.suite && ctx.task.suite.name && ctx.task.name
        ? `${ctx.task.suite.name} ${ctx.task.name}`
        : undefined;
    testName = fullTitle ? fullTitle.replace(/ /g, "_") : "create_call_start_recording_and_hang_up";
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
    const callConnectedEvent = await waitForEvent("CallConnected", callConnectionId, 10000);

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
  });

  it(
    "Creates a call, start recording with call connection id, and hangs up",
    { timeout: 60000 },
    async function (ctx) {
      const fullTitle: string | undefined =
        ctx.task.suite && ctx.task.suite.name && ctx.task.name
          ? `${ctx.task.suite.name} ${ctx.task.name}`
          : undefined;
      testName = fullTitle
        ? fullTitle.replace(/ /g, "_")
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
        callConnectionId: callConnectionId,
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
    },
  );
});
