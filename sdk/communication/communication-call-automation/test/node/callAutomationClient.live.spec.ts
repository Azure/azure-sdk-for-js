// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { CallAutomationClient } from "../../src/index.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
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
} from "../utils/recordedClient.js";
import type { CommunicationUserIdentifier } from "@azure/communication-common";
import type {
  CallInvite,
  CallConnection,
  CreateCallOptions,
  AnswerCallOptions,
} from "../../src/index.js";
import { isNodeLike } from "@azure/core-util";

describe("Call Automation Main Client Live Tests", { skip: !isNodeLike }, () => {
  let recorder: Recorder;
  let callerCallAutomationClient: CallAutomationClient;
  let receiverCallAutomationClient: CallAutomationClient;
  let callConnection: CallConnection;
  let testUser: CommunicationUserIdentifier;
  let testUser2: CommunicationUserIdentifier;
  let testName: string;

  beforeEach(async (ctx) => {
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

  it("Create a call and hangup", { timeout: 60000 }, async (ctx) => {
    const fullTitle: string | undefined =
      ctx.task.suite && ctx.task.suite.name && ctx.task.name
        ? `${ctx.task.suite.name} ${ctx.task.name}`
        : undefined;

    testName = fullTitle ? fullTitle.replace(/ /g, "_") : "create_call_and_hang_up";
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

    const callConnectedEvent = await waitForEvent("CallConnected", callConnectionId, 10000);

    assert.isDefined(callConnectedEvent);
    callConnection = result.callConnection;

    await callConnection.hangUp(true);

    const callDisconnectedEvent = await waitForEvent("CallDisconnected", callConnectionId, 8000);
    assert.isDefined(callDisconnectedEvent);
  });

  it("answer call with custom context and hangup", { timeout: 60000 }, async (ctx) => {
    const fullTitle: string | undefined =
      ctx.task.suite && ctx.task.suite.name && ctx.task.name
        ? `${ctx.task.suite.name} ${ctx.task.name}`
        : undefined;

    testName = fullTitle
      ? fullTitle.replace(/ /g, "_")
      : "answer_call_with_custom_context_and_hang_up";
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
        customCallingContext: [{ kind: "voip", key: "foo", value: "bar" }],
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

  it("Reject call", { timeout: 60000 }, async (ctx) => {
    const fullTitle: string | undefined =
      ctx.task.suite && ctx.task.suite.name && ctx.task.name
        ? `${ctx.task.suite.name} ${ctx.task.name}`
        : undefined;
    testName = fullTitle ? fullTitle.replace(/ /g, "_") : "reject_call";
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
