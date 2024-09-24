// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import { CommunicationUserIdentifier } from "@azure/communication-common";
import { assert } from "chai";
import { Context } from "mocha";
import {
  CallAutomationClient,
  CallInvite,
  CallConnection,
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
} from "../src";
import Sinon, { SinonStubbedInstance } from "sinon";
import { CALL_TARGET_ID, CALL_TARGET_ID_2 } from "./utils/connectionUtils";
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
} from "./utils/recordedClient";

describe("CallConnection Unit Tests", () => {
  let target: CallInvite;
  let callConnection: SinonStubbedInstance<CallConnection> & CallConnection;

  beforeEach(() => {
    // set up
    target = {
      targetParticipant: { communicationUserId: CALL_TARGET_ID },
    };

    // stub CallConnection
    callConnection = Sinon.createStubInstance(
      CallConnection,
    ) as SinonStubbedInstance<CallConnection> & CallConnection;
  });

  it("GetCallConnectionProperties", async () => {
    // mocks
    const callConnectionPropertiesMock: CallConnectionProperties = {};
    callConnection.getCallConnectionProperties.returns(
      new Promise((resolve) => {
        resolve(callConnectionPropertiesMock);
      }),
    );

    const promiseResult = callConnection.getCallConnectionProperties();

    // asserts
    promiseResult
      .then((result: CallConnectionProperties) => {
        assert.isNotNull(result);
        assert.isTrue(callConnection.getCallConnectionProperties.calledWith());
        assert.equal(result, callConnectionPropertiesMock);
        return;
      })
      .catch((error) => console.error(error));
  });

  it("HangUp", async () => {
    // mocks
    callConnection.hangUp.returns(
      new Promise((resolve) => {
        resolve(undefined);
      }),
    );

    const promiseResult = callConnection.hangUp(false);

    // asserts
    promiseResult
      .then(() => {
        assert.isTrue(callConnection.hangUp.calledWith(false));
        return;
      })
      .catch((error) => console.error(error));
  });

  it("Terminate", async () => {
    // mocks
    callConnection.hangUp.returns(
      new Promise((resolve) => {
        resolve(undefined);
      }),
    );

    const promiseResult = callConnection.hangUp(true);

    // asserts
    promiseResult
      .then(() => {
        assert.isTrue(callConnection.hangUp.calledWith(true));
        return;
      })
      .catch((error) => console.error(error));
  });

  it("GetParticipant", async () => {
    // mocks
    const callParticipantMock: CallParticipant = {};
    callConnection.getParticipant.returns(
      new Promise((resolve) => {
        resolve(callParticipantMock);
      }),
    );

    const promiseResult = callConnection.getParticipant(target.targetParticipant);

    // asserts
    promiseResult
      .then((result: CallParticipant) => {
        assert.isNotNull(result);
        assert.isTrue(callConnection.getParticipant.calledWith(target.targetParticipant));
        assert.equal(result, callParticipantMock);
        return;
      })
      .catch((error) => console.error(error));
  });

  it("ListParticipants", async () => {
    // mocks
    const listParticipantsResultMock: ListParticipantsResult = {};
    callConnection.listParticipants.returns(
      new Promise((resolve) => {
        resolve(listParticipantsResultMock);
      }),
    );

    const promiseResult = callConnection.listParticipants();

    // asserts
    promiseResult
      .then((result: ListParticipantsResult) => {
        assert.isNotNull(result);
        assert.isTrue(callConnection.listParticipants.calledWith());
        assert.equal(result, listParticipantsResultMock);
        return;
      })
      .catch((error) => console.error(error));
  });

  it("AddParticipant", async () => {
    // mocks
    const addParticipantResultMock: AddParticipantResult = {
      waitForEventProcessor: async () => {
        return {} as AddParticipantEventResult;
      },
    };
    callConnection.addParticipant.returns(
      new Promise((resolve) => {
        resolve(addParticipantResultMock);
      }),
    );

    const promiseResult = callConnection.addParticipant(target);

    // asserts
    promiseResult
      .then((result: AddParticipantResult) => {
        assert.isNotNull(result);
        assert.isTrue(callConnection.addParticipant.calledWith(target));
        assert.equal(result, addParticipantResultMock);
        return;
      })
      .catch((error) => console.error(error));
  });

  it("TransferCallToParticipant", async () => {
    // mocks
    const transferCallResultMock: TransferCallResult = {
      waitForEventProcessor: async () => {
        return {} as TransferCallToParticipantEventResult;
      },
    };
    callConnection.transferCallToParticipant.returns(
      new Promise((resolve) => {
        resolve(transferCallResultMock);
      }),
    );

    const promiseResult = callConnection.transferCallToParticipant(target.targetParticipant);

    // asserts
    promiseResult
      .then((result: TransferCallResult) => {
        assert.isNotNull(result);
        assert.isTrue(
          callConnection.transferCallToParticipant.calledWith(target.targetParticipant),
        );
        assert.equal(result, transferCallResultMock);
        return;
      })
      .catch((error) => console.error(error));
  });

  it("TransferCallToParticipantWithTransferee", async () => {
    // mocks
    const transferCallResultMock: TransferCallResult = {
      waitForEventProcessor: async () => {
        return {} as TransferCallToParticipantEventResult;
      },
    };
    callConnection.transferCallToParticipant.returns(
      new Promise((resolve) => {
        resolve(transferCallResultMock);
      }),
    );

    const transferee = { communicationUserId: CALL_TARGET_ID_2 };

    const promiseResult = callConnection.transferCallToParticipant(target.targetParticipant, {
      transferee: transferee,
    });

    // asserts
    promiseResult
      .then((result: TransferCallResult) => {
        assert.isNotNull(result);
        assert.isTrue(
          callConnection.transferCallToParticipant.calledWith(target.targetParticipant),
        );
        assert.equal(result, transferCallResultMock);
        return;
      })
      .catch((error) => console.error(error));
  });

  it("RemoveParticipant", async () => {
    // mocks
    const removeParticipantResultMock: RemoveParticipantResult = {
      waitForEventProcessor: async () => {
        return {} as RemoveParticipantEventResult;
      },
    };
    callConnection.removeParticipant.returns(
      new Promise((resolve) => {
        resolve(removeParticipantResultMock);
      }),
    );

    const promiseResult = callConnection.removeParticipant(target.targetParticipant);

    // asserts
    promiseResult
      .then((result: RemoveParticipantResult) => {
        assert.isNotNull(result);
        assert.isTrue(callConnection.removeParticipant.calledWith(target.targetParticipant));
        assert.equal(result, removeParticipantResultMock);
        return;
      })
      .catch((error) => console.error(error));
  });

  it("MuteParticipant", async () => {
    // mocks
    const muteParticipantResultMock: MuteParticipantResult = {};
    callConnection.muteParticipant.returns(
      new Promise((resolve) => {
        resolve(muteParticipantResultMock);
      }),
    );

    const promiseResult = callConnection.muteParticipant(target.targetParticipant);

    // asserts
    promiseResult
      .then((result: MuteParticipantResult) => {
        assert.isNotNull(result);
        assert.isTrue(callConnection.muteParticipant.calledWith(target.targetParticipant));
        assert.equal(result, muteParticipantResultMock);
        return;
      })
      .catch((error) => console.error(error));
  });

  it("CancelAddParticipant", async () => {
    const invitationId = "invitationId";
    const cancelAddParticipantResultMock: CancelAddParticipantOperationResult = {
      invitationId,
      waitForEventProcessor: async () => {
        return {} as CancelAddParticipantEventResult;
      },
    };
    callConnection.cancelAddParticipantOperation.returns(
      new Promise((resolve) => {
        resolve(cancelAddParticipantResultMock);
      }),
    );

    callConnection
      .cancelAddParticipantOperation(invitationId)
      .then((result: CancelAddParticipantOperationResult) => {
        assert.isNotNull(result);
        assert.isTrue(callConnection.cancelAddParticipantOperation.calledWith(invitationId));
        assert.equal(result, cancelAddParticipantResultMock);
        return;
      })
      .catch((error) => console.error(error));
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

  it("List all participants", async function () {
    testName = this.test?.fullTitle()
      ? this.test?.fullTitle().replace(/ /g, "_")
      : "list_all_participants";
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
    const callConnectedEvent = await waitForEvent("CallConnected", callConnectionId, 8000);
    assert.isDefined(callConnectedEvent);
    callConnection = result.callConnection;
    const allParticipants = await callConnection.listParticipants();
    assert.isDefined(allParticipants);
    assert.isDefined(allParticipants.values);
  }).timeout(60000);

  it("Add a participant and get call properties", async function () {
    testName = this.test?.fullTitle()
      ? this.test?.fullTitle().replace(/ /g, "_")
      : "add_participant_and_get_call_props";
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
  }).timeout(90000);

  it("Remove a participant", async function () {
    testName = this.test?.fullTitle()
      ? this.test?.fullTitle().replace(/ /g, "_")
      : "remove_a_participant";
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
  }).timeout(60000);

  it("Mute a participant", async function () {
    testName = this.test?.fullTitle()
      ? this.test?.fullTitle().replace(/ /g, "_")
      : "mute_participant";
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
  }).timeout(90000);

  it("Add a participant cancels add participant request", async function () {
    testName = this.test?.fullTitle()
      ? this.test?.fullTitle().replace(/ /g, "_")
      : "cancel_add_participant";
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
  }).timeout(90000);
});
