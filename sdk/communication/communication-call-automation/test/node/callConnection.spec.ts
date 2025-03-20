// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { CommunicationUserIdentifier } from "@azure/communication-common";
import type {
  CallAutomationClient,
  CallInvite,
  CallConnectionProperties,
  CallParticipant,
  ListParticipantsResult,
  AddParticipantResult,
  TransferCallResult,
  RemoveParticipantResult,
  MuteParticipantResult,
  CancelAddParticipantOperationResult,
  AddParticipantEventResult,
  TransferCallToParticipantEventResult,
  RemoveParticipantEventResult,
  CancelAddParticipantEventResult,
  CancelAddParticipantSucceeded,
  CreateCallOptions,
  AnswerCallOptions,
  AddParticipantOptions,
  RemoveParticipantsOption,
  CancelAddParticipantOperationOptions,
} from "../../src/index.js";
import { CALL_TARGET_ID, CALL_TARGET_ID_2 } from "../utils/connectionUtils.js";
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
  persistEvents,
  loadPersistedEvents,
} from "../utils/recordedClient.js";
import type { MockedObject } from "vitest";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock(import("../../src/index.js"), async (importOriginal) => {
  const mod = await importOriginal();

  const CallConnection = vi.fn();
  CallConnection.prototype.getCallConnectionProperties = vi.fn();
  CallConnection.prototype.hangUp = vi.fn();
  CallConnection.prototype.getParticipant = vi.fn();
  CallConnection.prototype.listParticipants = vi.fn();
  CallConnection.prototype.addParticipant = vi.fn();
  CallConnection.prototype.transferCallToParticipant = vi.fn();
  CallConnection.prototype.removeParticipant = vi.fn();
  CallConnection.prototype.muteParticipant = vi.fn();
  CallConnection.prototype.cancelAddParticipantOperation = vi.fn();

  return {
    ...mod,
    CallConnection,
  };
});

import { CallConnection } from "../../src/index.js";

describe("CallConnection Unit Tests", () => {
  let target: CallInvite;
  let callConnection: MockedObject<CallConnection>;

  beforeEach(() => {
    // set up
    target = {
      targetParticipant: { communicationUserId: CALL_TARGET_ID },
    };

    // stub CallConnection
    callConnection = vi.mocked(
      new CallConnection(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      ),
    );
  });

  it("GetCallConnectionProperties", async () => {
    // mocks
    const callConnectionPropertiesMock: CallConnectionProperties = {};
    callConnection.getCallConnectionProperties.mockReturnValue(
      new Promise((resolve) => {
        resolve(callConnectionPropertiesMock);
      }),
    );

    const promiseResult = callConnection.getCallConnectionProperties();

    // asserts
    const result = await promiseResult;
    assert.isNotNull(result);
    expect(callConnection.getCallConnectionProperties).toHaveBeenCalled();
    assert.equal(result, callConnectionPropertiesMock);
  });

  it("HangUp", async () => {
    // mocks
    callConnection.hangUp.mockReturnValue(
      new Promise((resolve) => {
        resolve(undefined);
      }),
    );

    const promiseResult = callConnection.hangUp(false);

    // asserts
    await promiseResult;
    expect(callConnection.hangUp).toHaveBeenCalledWith(false);
  });

  it("Terminate", async () => {
    // mocks
    callConnection.hangUp.mockReturnValue(
      new Promise((resolve) => {
        resolve(undefined);
      }),
    );

    const promiseResult = callConnection.hangUp(true);

    // asserts
    await promiseResult;
    expect(callConnection.hangUp).toHaveBeenCalledWith(true);
  });

  it("GetParticipant", async () => {
    // mocks
    const callParticipantMock: CallParticipant = {};
    callConnection.getParticipant.mockReturnValue(
      new Promise((resolve) => {
        resolve(callParticipantMock);
      }),
    );

    const promiseResult = callConnection.getParticipant(target.targetParticipant);

    // asserts
    const result = await promiseResult;
    assert.isNotNull(result);
    expect(callConnection.getParticipant).toHaveBeenCalledWith(target.targetParticipant);
    assert.equal(result, callParticipantMock);
  });

  it("ListParticipants", async () => {
    // mocks
    const listParticipantsResultMock: ListParticipantsResult = {};
    callConnection.listParticipants.mockReturnValue(
      new Promise((resolve) => {
        resolve(listParticipantsResultMock);
      }),
    );

    const promiseResult = callConnection.listParticipants();

    // asserts
    const result = await promiseResult;
    assert.isNotNull(result);
    expect(callConnection.listParticipants).toHaveBeenCalled();
    assert.equal(result, listParticipantsResultMock);
  });

  it("AddParticipant", async () => {
    // mocks
    const addParticipantResultMock: AddParticipantResult = {
      waitForEventProcessor: async () => {
        return {} as AddParticipantEventResult;
      },
    };
    callConnection.addParticipant.mockReturnValue(
      new Promise((resolve) => {
        resolve(addParticipantResultMock);
      }),
    );

    const promiseResult = callConnection.addParticipant(target);

    // asserts
    const result = await promiseResult;
    assert.isNotNull(result);
    expect(callConnection.addParticipant).toHaveBeenCalledWith(target);
    assert.equal(result, addParticipantResultMock);
  });

  it("TransferCallToParticipant", async () => {
    // mocks
    const transferCallResultMock: TransferCallResult = {
      waitForEventProcessor: async () => {
        return {} as TransferCallToParticipantEventResult;
      },
    };
    callConnection.transferCallToParticipant.mockReturnValue(
      new Promise((resolve) => {
        resolve(transferCallResultMock);
      }),
    );

    const promiseResult = callConnection.transferCallToParticipant(target.targetParticipant);

    // asserts
    const result = await promiseResult;
    assert.isNotNull(result);
    expect(callConnection.transferCallToParticipant).toHaveBeenCalledWith(target.targetParticipant);
    assert.equal(result, transferCallResultMock);
  });

  it("TransferCallToParticipantWithTransferee", async () => {
    // mocks
    const transferCallResultMock: TransferCallResult = {
      waitForEventProcessor: async () => {
        return {} as TransferCallToParticipantEventResult;
      },
    };
    callConnection.transferCallToParticipant.mockReturnValue(
      new Promise((resolve) => {
        resolve(transferCallResultMock);
      }),
    );

    const transferee = { communicationUserId: CALL_TARGET_ID_2 };

    const promiseResult = callConnection.transferCallToParticipant(target.targetParticipant, {
      transferee: transferee,
    });

    // asserts
    const result = await promiseResult;
    assert.isNotNull(result);
    expect(callConnection.transferCallToParticipant).toHaveBeenCalledWith(
      target.targetParticipant,
      { transferee: transferee },
    );
    assert.equal(result, transferCallResultMock);
  });

  it("RemoveParticipant", async () => {
    // mocks
    const removeParticipantResultMock: RemoveParticipantResult = {
      waitForEventProcessor: async () => {
        return {} as RemoveParticipantEventResult;
      },
    };
    callConnection.removeParticipant.mockReturnValue(
      new Promise((resolve) => {
        resolve(removeParticipantResultMock);
      }),
    );

    const promiseResult = callConnection.removeParticipant(target.targetParticipant);

    // asserts
    const result = await promiseResult;
    assert.isNotNull(result);
    expect(callConnection.removeParticipant).toHaveBeenCalledWith(target.targetParticipant);
    assert.equal(result, removeParticipantResultMock);
  });

  it("MuteParticipant", async () => {
    // mocks
    const muteParticipantResultMock: MuteParticipantResult = {};
    callConnection.muteParticipant.mockReturnValue(
      new Promise((resolve) => {
        resolve(muteParticipantResultMock);
      }),
    );

    const promiseResult = callConnection.muteParticipant(target.targetParticipant);

    // asserts
    const result = await promiseResult;
    assert.isNotNull(result);
    expect(callConnection.muteParticipant).toHaveBeenCalledWith(target.targetParticipant);
    assert.equal(result, muteParticipantResultMock);
  });

  it("CancelAddParticipant", async () => {
    const invitationId = "invitationId";
    const cancelAddParticipantResultMock: CancelAddParticipantOperationResult = {
      invitationId,
      waitForEventProcessor: async () => {
        return {} as CancelAddParticipantEventResult;
      },
    };
    callConnection.cancelAddParticipantOperation.mockReturnValue(
      new Promise((resolve) => {
        resolve(cancelAddParticipantResultMock);
      }),
    );

    const result = await callConnection.cancelAddParticipantOperation(invitationId);
    assert.isNotNull(result);
    expect(callConnection.cancelAddParticipantOperation).toHaveBeenCalledWith(invitationId);
    assert.equal(result, cancelAddParticipantResultMock);
  });
});

describe("CallConnection Live Tests", function () {
  let recorder: Recorder;
  let callerCallAutomationClient: CallAutomationClient;
  let receiverCallAutomationClient: CallAutomationClient;
  let callConnection: CallConnection;
  let testUser: CommunicationUserIdentifier;
  let testUser2: CommunicationUserIdentifier;
  let callConnectionId: string;
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

  it("List all participants", { timeout: 90000 }, async function (ctx) {
    const fullTitle: string | undefined =
      ctx.task.suite && ctx.task.suite.name && ctx.task.name
        ? `${ctx.task.suite.name} ${ctx.task.name}`
        : undefined;
    testName = fullTitle ? fullTitle.replace(/ /g, "_") : "list_all_participants";
    await loadPersistedEvents(testName);

    const callInvite: CallInvite = { targetParticipant: testUser2 };
    const uniqueId = await serviceBusWithNewCall(testUser, testUser2);
    const callBackUrl: string = dispatcherCallback + `?q=${uniqueId}`;
    const createCallOption: CreateCallOptions = { operationContext: "listParticipantsCreateCall" };

    const result = await callerCallAutomationClient.createCall(
      callInvite,
      callBackUrl,
      createCallOption,
    );
    const incomingCallContext = await waitForIncomingCallContext(uniqueId, 8000);
    callConnectionId = result.callConnectionProperties.callConnectionId
      ? result.callConnectionProperties.callConnectionId
      : "";
    assert.isDefined(incomingCallContext);
    if (incomingCallContext) {
      const answerCallOptions: AnswerCallOptions = { operationContext: "listParticipantsAnswer" };
      await receiverCallAutomationClient.answerCall(
        incomingCallContext,
        callBackUrl,
        answerCallOptions,
      );
    }
    const callConnectedEvent = await waitForEvent("CallConnected", callConnectionId, 10000);
    assert.isDefined(callConnectedEvent);
    callConnection = result.callConnection;
    const allParticipants = await callConnection.listParticipants();
    assert.isDefined(allParticipants);
    assert.isDefined(allParticipants.values);
  });

  it("Add a participant and get call properties", { timeout: 90000 }, async function (ctx) {
    const fullTitle: string | undefined =
      ctx.task.suite && ctx.task.suite.name && ctx.task.name
        ? `${ctx.task.suite.name} ${ctx.task.name}`
        : undefined;
    testName = fullTitle ? fullTitle.replace(/ /g, "_") : "add_participant_and_get_call_props";
    await loadPersistedEvents(testName);

    const callInvite: CallInvite = { targetParticipant: testUser2 };
    const uniqueId = await serviceBusWithNewCall(testUser, testUser2);
    const callBackUrl: string = dispatcherCallback + `?q=${uniqueId}`;
    const createCallOption: CreateCallOptions = { operationContext: "addParticipantsCreateCall" };
    const result = await callerCallAutomationClient.createCall(
      callInvite,
      callBackUrl,
      createCallOption,
    );

    const incomingCallContext = await waitForIncomingCallContext(uniqueId, 10000);
    callConnectionId = result.callConnectionProperties.callConnectionId
      ? result.callConnectionProperties.callConnectionId
      : "";
    assert.isDefined(incomingCallContext);
    if (incomingCallContext) {
      const answerCallOptions: AnswerCallOptions = { operationContext: "addParticipantsAnswer" };
      await receiverCallAutomationClient.answerCall(
        incomingCallContext,
        callBackUrl,
        answerCallOptions,
      );
    }
    const callConnectedEvent = await waitForEvent("CallConnected", callConnectionId, 10000);
    assert.isDefined(callConnectedEvent);
    callConnection = result.callConnection;
    const testUser3: CommunicationUserIdentifier = await createTestUser(recorder);
    const participantInvite: CallInvite = { targetParticipant: testUser3 };
    const uniqueId2 = await serviceBusWithNewCall(testUser, testUser3);
    const callBackUrl2: string = dispatcherCallback + `?q=${uniqueId2}`;

    const addParticipantOptions: AddParticipantOptions = { operationContext: "addParticipants" };
    const addResult = await callConnection.addParticipant(participantInvite, addParticipantOptions);
    assert.isDefined(addResult);

    const anotherReceiverCallAutomationClient: CallAutomationClient = createCallAutomationClient(
      recorder,
      testUser3,
    );
    const anotherIncomingCallContext = await waitForIncomingCallContext(uniqueId2, 20000);
    if (anotherIncomingCallContext) {
      const answerCallOption2: AddParticipantOptions = {
        operationContext: "addParticipantsAnswer2",
      };
      await anotherReceiverCallAutomationClient.answerCall(
        anotherIncomingCallContext,
        callBackUrl2,
        answerCallOption2,
      );
    }
    const participantAddedEvent = await waitForEvent(
      "AddParticipantSucceeded",
      callConnectionId,
      10000,
    );
    assert.isDefined(participantAddedEvent);

    const callProperties = await callConnection.getCallConnectionProperties();
    assert.isDefined(callProperties);
  });

  it("Remove a participant", { timeout: 60000 }, async function (ctx) {
    const fullTitle: string | undefined =
      ctx.task.suite && ctx.task.suite.name && ctx.task.name
        ? `${ctx.task.suite.name} ${ctx.task.name}`
        : undefined;
    testName = fullTitle ? fullTitle.replace(/ /g, "_") : "remove_a_participant";
    await loadPersistedEvents(testName);

    const callInvite: CallInvite = { targetParticipant: testUser2 };
    const uniqueId = await serviceBusWithNewCall(testUser, testUser2);
    const callBackUrl: string = dispatcherCallback + `?q=${uniqueId}`;
    const createCallOption: CreateCallOptions = { operationContext: "removeParticipantCreateCall" };
    const result = await callerCallAutomationClient.createCall(
      callInvite,
      callBackUrl,
      createCallOption,
    );
    const incomingCallContext = await waitForIncomingCallContext(uniqueId, 8000);
    callConnectionId = result.callConnectionProperties.callConnectionId
      ? result.callConnectionProperties.callConnectionId
      : "";
    assert.isDefined(incomingCallContext);
    if (incomingCallContext) {
      const answerCallOption: AnswerCallOptions = { operationContext: "removeParticipantsAnswer" };
      await receiverCallAutomationClient.answerCall(
        incomingCallContext,
        callBackUrl,
        answerCallOption,
      );
    }
    const callConnectedEvent = await waitForEvent("CallConnected", callConnectionId, 8000);
    assert.isDefined(callConnectedEvent);
    callConnection = result.callConnection;
    const removeParticipantOptions: RemoveParticipantsOption = {
      operationContext: "removeParticipants",
    };
    const removeResult = await callConnection.removeParticipant(
      testUser2,
      removeParticipantOptions,
    );
    assert.isDefined(removeResult);

    // A call needs at least 2 participants, removing one of the only 2 participants would end the call.
    const callEndedEvent = await waitForEvent("CallDisconnected", callConnectionId, 8000);
    assert.isDefined(callEndedEvent);
  });

  it("Mute a participant", { timeout: 90000 }, async function (ctx) {
    const fullTitle: string | undefined =
      ctx.task.suite && ctx.task.suite.name && ctx.task.name
        ? `${ctx.task.suite.name} ${ctx.task.name}`
        : undefined;
    testName = fullTitle ? fullTitle.replace(/ /g, "_") : "mute_participant";
    await loadPersistedEvents(testName);

    const callInvite: CallInvite = { targetParticipant: testUser2 };
    const uniqueId = await serviceBusWithNewCall(testUser, testUser2);
    const callBackUrl: string = dispatcherCallback + `?q=${uniqueId}`;
    const result = await callerCallAutomationClient.createCall(callInvite, callBackUrl);
    const incomingCallContext = await waitForIncomingCallContext(uniqueId, 20000);
    callConnectionId = result.callConnectionProperties.callConnectionId
      ? result.callConnectionProperties.callConnectionId
      : "";
    assert.isDefined(incomingCallContext);
    if (incomingCallContext) {
      await receiverCallAutomationClient.answerCall(incomingCallContext, callBackUrl);
    }
    const callConnectedEvent = await waitForEvent("CallConnected", callConnectionId, 8000);
    assert.isDefined(callConnectedEvent);
    callConnection = result.callConnection;
    const testUser3: CommunicationUserIdentifier = await createTestUser(recorder);
    const participantInvite: CallInvite = { targetParticipant: testUser3 };
    const uniqueId2 = await serviceBusWithNewCall(testUser, testUser3);
    const callBackUrl2: string = dispatcherCallback + `?q=${uniqueId2}`;

    const addParticipantOption: AddParticipantOptions = { operationContext: "addParticipant" };
    const addResult = await callConnection.addParticipant(participantInvite, addParticipantOption);
    assert.isDefined(addResult);

    // A call needs at least 3 participants to mute a participant. So adding one more participant.
    const anotherReceiverCallAutomationClient: CallAutomationClient = createCallAutomationClient(
      recorder,
      testUser3,
    );
    const anotherIncomingCallContext = await waitForIncomingCallContext(uniqueId2, 20000);
    if (anotherIncomingCallContext) {
      await anotherReceiverCallAutomationClient.answerCall(
        anotherIncomingCallContext,
        callBackUrl2,
      );
    }
    const participantAddedEvent = await waitForEvent(
      "AddParticipantSucceeded",
      callConnectionId,
      8000,
    );
    assert.isDefined(participantAddedEvent);

    const muteResult = await callConnection.muteParticipant(testUser2);
    assert.isDefined(muteResult);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    const participantLists = await callConnection.listParticipants();
    let isMuted = false;
    for (const participant of participantLists.values!) {
      const communicationUser = participant.identifier as CommunicationUserIdentifier;
      if (communicationUser.communicationUserId === testUser2.communicationUserId) {
        isMuted = participant.isMuted!;
      }
    }
    assert.isTrue(isMuted);
  });

  it("Add a participant cancels add participant request", { timeout: 90000 }, async function (ctx) {
    const fullTitle: string | undefined =
      ctx.task.suite && ctx.task.suite.name && ctx.task.name
        ? `${ctx.task.suite.name} ${ctx.task.name}`
        : undefined;
    testName = fullTitle ? fullTitle.replace(/ /g, "_") : "cancel_add_participant";
    await loadPersistedEvents(testName);

    const callInvite: CallInvite = { targetParticipant: testUser2 };
    const uniqueId = await serviceBusWithNewCall(testUser, testUser2);
    const callBackUrl: string = dispatcherCallback + `?q=${uniqueId}`;
    const createCallOption: CreateCallOptions = { operationContext: "cancelAddCreateCall" };
    const result = await callerCallAutomationClient.createCall(
      callInvite,
      callBackUrl,
      createCallOption,
    );
    const incomingCallContext = await waitForIncomingCallContext(uniqueId, 10000);
    callConnectionId = result.callConnectionProperties.callConnectionId
      ? result.callConnectionProperties.callConnectionId
      : "";
    assert.isDefined(incomingCallContext);
    if (incomingCallContext) {
      const answerCallOption: AnswerCallOptions = { operationContext: "cancelAddCreateAnswer" };
      await receiverCallAutomationClient.answerCall(
        incomingCallContext,
        callBackUrl,
        answerCallOption,
      );
    }
    const callConnectedEvent = await waitForEvent("CallConnected", callConnectionId, 10000);
    assert.isDefined(callConnectedEvent);
    callConnection = result.callConnection;
    const testUser3: CommunicationUserIdentifier = await createTestUser(recorder);
    const participantInvite: CallInvite = { targetParticipant: testUser3 };

    const addParticipantOptions: AddParticipantOptions = { operationContext: "cancelAdd" };
    const addResult = await callConnection.addParticipant(participantInvite, addParticipantOptions);
    assert.isDefined(addResult);

    // ensure invitation is sent out
    await ((ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms)))(3000);

    // cancel add participant
    const cancelParticipantOption: CancelAddParticipantOperationOptions = {
      operationContext: "cancelOp",
    };
    await callConnection.cancelAddParticipantOperation(
      addResult.invitationId!,
      cancelParticipantOption,
    );

    const addParticipantCancelledEvent = (await waitForEvent(
      "CancelAddParticipantSucceeded",
      callConnectionId,
      10000,
    )) as CancelAddParticipantSucceeded;

    assert.isDefined(addParticipantCancelledEvent);
    assert.equal(addResult.invitationId, addParticipantCancelledEvent?.invitationId);
  });
});
