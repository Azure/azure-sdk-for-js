// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import Sinon, { SinonStubbedInstance } from "sinon";
import { CallConnectionProperties } from "../src/models/models";
import { AnswerCallResult, CreateCallResult } from "../src/models/responses";
import {
  CALL_CALLBACK_URL,
  CALL_INCOMING_CALL_CONTEXT,
  CALL_TARGET_ID,
  CALL_TARGET_ID_2,
} from "./utils/connectionUtils";
import { CommunicationIdentifier, CommunicationUserIdentifier } from "@azure/communication-common";
import { assert } from "chai";
import { Context } from "mocha";
import { CallAutomationClient, CallInvite, CallConnection } from "../src";
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
import { v4 as uuidv4 } from "uuid";

describe("Call Automation Client Unit Tests", () => {
  let targets: CommunicationIdentifier[];
  let target: CallInvite;
  let client: SinonStubbedInstance<CallAutomationClient> & CallAutomationClient;

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
    client = Sinon.createStubInstance(
      CallAutomationClient
    ) as SinonStubbedInstance<CallAutomationClient> & CallAutomationClient;
  });

  it("RepeatabilityHeadersGeneration", async () => {
    // mocks
    const repeatabilityFirstSent: string = new Date().toUTCString();
    const repeatabilityRequestID: string = uuidv4();

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
    };
    client.createCall.returns(
      new Promise((resolve) => {
        resolve(createCallResultMock);
      })
    );

    const promiseResult = client.createCall(target, CALL_CALLBACK_URL);

    // asserts
    promiseResult
      .then((result: CreateCallResult) => {
        assert.isNotNull(result);
        assert.isTrue(client.createCall.calledWith(target, CALL_CALLBACK_URL));
        assert.equal(result, createCallResultMock);
        return;
      })
      .catch((error) => console.error(error));
  });

  it("CreateGroupCall", async () => {
    // mocks
    const createGroupCallResultMock: CreateCallResult = {
      callConnectionProperties: {} as CallConnectionProperties,
      callConnection: {} as CallConnection,
    };
    client.createGroupCall.returns(
      new Promise((resolve) => {
        resolve(createGroupCallResultMock);
      })
    );

    const promiseResult = client.createGroupCall(targets, CALL_CALLBACK_URL);

    // asserts
    promiseResult
      .then((result: CreateCallResult) => {
        assert.isNotNull(result);
        assert.isTrue(client.createGroupCall.calledWith(targets, CALL_CALLBACK_URL));
        assert.equal(result, createGroupCallResultMock);
        return;
      })
      .catch((error) => console.error(error));
  });

  it("AnswerCall", async () => {
    // mocks
    const answerCallResultMock: AnswerCallResult = {
      callConnectionProperties: {} as CallConnectionProperties,
      callConnection: {} as CallConnection,
    };
    client.answerCall.returns(
      new Promise((resolve) => {
        resolve(answerCallResultMock);
      })
    );

    const promiseResult = client.answerCall(CALL_INCOMING_CALL_CONTEXT, CALL_CALLBACK_URL);

    // asserts
    promiseResult
      .then((result: AnswerCallResult) => {
        assert.isNotNull(result);
        assert.isTrue(client.answerCall.calledWith(CALL_INCOMING_CALL_CONTEXT, CALL_CALLBACK_URL));
        assert.equal(result, answerCallResultMock);
        return;
      })
      .catch((error) => console.error(error));
  });

  it("RedirectCall", async () => {
    // mocks
    client.redirectCall.returns(
      new Promise((resolve) => {
        resolve(undefined);
      })
    );

    const promiseResult = client.redirectCall(CALL_INCOMING_CALL_CONTEXT, target);

    // asserts
    promiseResult
      .then(() => {
        assert.isTrue(client.redirectCall.calledWith(CALL_INCOMING_CALL_CONTEXT, target));
        return;
      })
      .catch((error) => console.error(error));
  });

  it("RejectCall", async () => {
    // mocks
    client.rejectCall.returns(
      new Promise((resolve) => {
        resolve(undefined);
      })
    );

    const promiseResult = client.rejectCall(CALL_INCOMING_CALL_CONTEXT);

    // asserts
    promiseResult
      .then(() => {
        assert.isTrue(client.rejectCall.calledWith(CALL_INCOMING_CALL_CONTEXT));
        return;
      })
      .catch((error) => console.error(error));
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

  it("Create a call and hangup", async function () {
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

    await callConnection.hangUp(true);
    const callDisconnectedEvent = await waitForEvent("CallDisconnected", callConnectionId, 8000);
    assert.isDefined(callDisconnectedEvent);
  }).timeout(60000);

  it("Reject call", async function () {
    testName = this.test?.fullTitle() ? this.test?.fullTitle().replace(/ /g, "_") : "reject_call";
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
      await receiverCallAutomationClient.rejectCall(incomingCallContext);
    }

    const callDisconnectedEvent = await waitForEvent("CallDisconnected", callConnectionId, 8000);
    assert.isDefined(callDisconnectedEvent);
  }).timeout(60000);
});
