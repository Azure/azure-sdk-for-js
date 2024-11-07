// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { CallConnectionProperties } from "../src/models/models.js";
import type { AnswerCallResult, CreateCallResult } from "../src/models/responses.js";
import {
  CALL_CALLBACK_URL,
  CALL_INCOMING_CALL_CONTEXT,
  CALL_TARGET_ID,
  CALL_TARGET_ID_2,
} from "./utils/connectionUtils.js";
import type {
  CommunicationIdentifier,
  CommunicationUserIdentifier,
} from "@azure/communication-common";
import type {
  CallInvite,
  CallConnection,
  CreateCallOptions,
  AnswerCallOptions,
} from "../src/index.js";
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
} from "./utils/recordedClient.js";
import type {
  AnswerCallEventResult,
  CreateCallEventResult,
} from "../src/eventprocessor/eventResponses.js";
import { randomUUID } from "@azure/core-util";
import type { MockedObject } from "vitest";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock(import("../src/index.js"), async (importOriginal) => {
  const mod = await importOriginal();

  const CallAutomationClient = vi.fn();
  CallAutomationClient.prototype.createCall = vi.fn();
  CallAutomationClient.prototype.createGroupCall = vi.fn();
  CallAutomationClient.prototype.answerCall = vi.fn();
  CallAutomationClient.prototype.redirectCall = vi.fn();
  CallAutomationClient.prototype.rejectCall = vi.fn();

  return {
    ...mod,
    CallAutomationClient,
  };
});

import { CallAutomationClient } from "../src/index.js";

describe("Call Automation Client Unit Tests", () => {
  let targets: CommunicationIdentifier[];
  let target: CallInvite;
  let client: MockedObject<CallAutomationClient>;

  beforeEach(() => {
    // set up
    targets = [
      {
        communicationUserId: CALL_TARGET_ID,
      },
      {
        communicationUserId: CALL_TARGET_ID_2,
      },
    ];
    target = {
      targetParticipant: { communicationUserId: CALL_TARGET_ID },
    };
    // stub CallAutomationClient
    client = vi.mocked(new CallAutomationClient(expect.anything()));
  });

  it("RepeatabilityHeadersGeneration", async () => {
    // mocks
    const repeatabilityFirstSent: string = new Date().toUTCString();
    const repeatabilityRequestID: string = randomUUID();

    // asserts
    assert.isNotNull(repeatabilityFirstSent);
    assert.isNotNull(repeatabilityRequestID);
    assert.typeOf(repeatabilityFirstSent, "string");
    assert.typeOf(repeatabilityRequestID, "string");
  });

  it("CreateCall", async () => {
    // mocks
    const createCallResultMock: CreateCallResult = {
      callConnectionProperties: {} as CallConnectionProperties,
      callConnection: {} as CallConnection,
      waitForEventProcessor: async () => {
        return {} as CreateCallEventResult;
      },
    };
    client.createCall.mockReturnValue(
      new Promise((resolve) => {
        resolve(createCallResultMock);
      }),
    );

    const promiseResult = client.createCall(target, CALL_CALLBACK_URL);

    // asserts
    const result = await promiseResult;
    assert.isNotNull(result);
    expect(client.createCall).toHaveBeenCalledWith(target, CALL_CALLBACK_URL);
    assert.equal(result, createCallResultMock);
  });

  it("CreateGroupCall", async () => {
    // mocks
    const createGroupCallResultMock: CreateCallResult = {
      callConnectionProperties: {} as CallConnectionProperties,
      callConnection: {} as CallConnection,
      waitForEventProcessor: async () => {
        return {} as CreateCallEventResult;
      },
    };
    client.createGroupCall.mockReturnValue(
      new Promise((resolve) => {
        resolve(createGroupCallResultMock);
      }),
    );

    const promiseResult = client.createGroupCall(targets, CALL_CALLBACK_URL);

    // asserts
    const result = await promiseResult;
    assert.isNotNull(result);
    expect(client.createGroupCall).toHaveBeenCalledWith(targets, CALL_CALLBACK_URL);
    assert.equal(result, createGroupCallResultMock);
  });

  it("AnswerCall", async () => {
    // mocks
    const answerCallResultMock: AnswerCallResult = {
      callConnectionProperties: {} as CallConnectionProperties,
      callConnection: {} as CallConnection,
      waitForEventProcessor: async () => {
        return {} as AnswerCallEventResult;
      },
    };
    client.answerCall.mockReturnValue(
      new Promise((resolve) => {
        resolve(answerCallResultMock);
      }),
    );

    const promiseResult = client.answerCall(CALL_INCOMING_CALL_CONTEXT, CALL_CALLBACK_URL);

    // asserts
    const result = await promiseResult;

    assert.isNotNull(result);
    expect(client.answerCall).toHaveBeenCalledWith(CALL_INCOMING_CALL_CONTEXT, CALL_CALLBACK_URL);
    assert.equal(result, answerCallResultMock);
  });

  it("RedirectCall", async () => {
    // mocks
    client.redirectCall.mockReturnValue(
      new Promise((resolve) => {
        resolve(undefined);
      }),
    );

    const promiseResult = client.redirectCall(CALL_INCOMING_CALL_CONTEXT, target);

    // asserts
    await promiseResult;
    expect(client.redirectCall).toHaveBeenCalledWith(CALL_INCOMING_CALL_CONTEXT, target);
  });

  it("RejectCall", async () => {
    // mocks
    client.rejectCall.mockReturnValue(
      new Promise((resolve) => {
        resolve(undefined);
      }),
    );

    const promiseResult = client.rejectCall(CALL_INCOMING_CALL_CONTEXT);

    // asserts
    await promiseResult;
    expect(client.rejectCall).toHaveBeenCalledWith(CALL_INCOMING_CALL_CONTEXT);
  });
});

describe("Call Automation Main Client Live Tests", function () {
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

  afterEach(async function () {
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

  it("Create a call and hangup", { timeout: 60000 }, async function (ctx) {
    const fullTitle: string | undefined =
      ctx.task.suite && ctx.task.suite.name && ctx.task.name
        ? `${ctx.task.suite.name} ${ctx.task.name}`
        : undefined;

    testName = fullTitle
      ? fullTitle.replace(/ /g, "_").toLocaleLowerCase()
      : "create_call_and_hang_up";
    await loadPersistedEvents(testName);

    const callInvite: CallInvite = { targetParticipant: testUser2 };
    const uniqueId = await serviceBusWithNewCall(testUser, testUser2);
    const callBackUrl: string = dispatcherCallback + `?q=${uniqueId}`;
    const createCallOption: CreateCallOptions = { operationContext: "operationContextCreateCall" };

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
      const answerCallOptions: AnswerCallOptions = {
        operationContext: "operationContextAnswerCall",
      };
      await receiverCallAutomationClient.answerCall(
        incomingCallContext,
        callBackUrl,
        answerCallOptions,
      );
    }

    const callConnectedEvent = await waitForEvent("CallConnected", callConnectionId, 8000);

    assert.isDefined(callConnectedEvent);
    callConnection = result.callConnection;

    await callConnection.hangUp(true);

    const callDisconnectedEvent = await waitForEvent("CallDisconnected", callConnectionId, 8000);
    assert.isDefined(callDisconnectedEvent);
  });

  it("Reject call", { timeout: 60000 }, async function (ctx) {
    const fullTitle: string | undefined =
      ctx.task.suite && ctx.task.suite.name && ctx.task.name
        ? `${ctx.task.suite.name} ${ctx.task.name}`
        : undefined;
    testName = fullTitle ? fullTitle.replace(/ /g, "_").toLocaleLowerCase() : "reject_call";
    await loadPersistedEvents(testName);

    const callInvite: CallInvite = { targetParticipant: testUser2 };
    const uniqueId = await serviceBusWithNewCall(testUser, testUser2);
    const callBackUrl: string = dispatcherCallback + `?q=${uniqueId}`;
    const createCallOption: CreateCallOptions = { operationContext: "operationContextRejectCall" };

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
      await receiverCallAutomationClient.rejectCall(incomingCallContext);
    }

    const createCallFailedEvent = await waitForEvent("CreateCallFailed", callConnectionId, 8000);
    assert.isDefined(createCallFailedEvent);
  });
});
