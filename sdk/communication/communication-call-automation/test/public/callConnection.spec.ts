// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { CommunicationUserIdentifier } from "@azure/communication-common";
import { assert } from "chai";
import { Context } from "mocha";
import { CallAutomationClient, CallInvite, CallConnection } from "../../src";
import {
  createRecorder,
  createTestUser,
  dispatcherCallback,
  serviceBusWithNewCall,
  createCallAutomationClient,
  waitForIncomingCallContext,
  waitForEvent,
} from "./utils/recordedClient";
import { events, serviceBusReceivers, incomingCallContexts } from "./utils/recordedClient";

describe("CallConnection Live Tests", function () {
  let recorder: Recorder;
  let callAutomationClient: CallAutomationClient;
  let callConnection: CallConnection;
  let testUser: CommunicationUserIdentifier;
  let testUser2: CommunicationUserIdentifier;
  let callConnectionId: string;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this.currentTest);
    testUser = await createTestUser(recorder);
    testUser2 = await createTestUser(recorder);
    callAutomationClient = createCallAutomationClient(recorder, testUser);
    const callInvite = new CallInvite(testUser2);
    const uniqueId = await serviceBusWithNewCall(testUser, testUser2);
    const callBackUrl: string = dispatcherCallback + `?q=${uniqueId}`;
    const result = await callAutomationClient.createCall(callInvite, callBackUrl);
    const incomingCallContext = await waitForIncomingCallContext(uniqueId, 8000);
    callConnectionId = result.callConnectionProperties.callConnectionId ? result.callConnectionProperties.callConnectionId : "";
    assert.isDefined(incomingCallContext);
    if (incomingCallContext) {
      await callAutomationClient.answerCall(incomingCallContext, callBackUrl);
    }
    const callConnectedEvent = await waitForEvent(
      "CallConnected",
      callConnectionId,
      8000
    );
    assert.isDefined(callConnectedEvent);
    callConnection = result.callConnection;
  });

  afterEach(async function (this: Context) {
    if (callConnection) {
      try {
        await callConnection.hangUp(true);
        console.log("Call terminated");
      } catch (e) {
        console.log("Call is already terminated");
      }
    }
    serviceBusReceivers.forEach((receiver) => {
      receiver.close();
      console.log("Service bus receiver closed");
    });
    events.forEach((callConnectionEvents) => {
      callConnectionEvents.clear();
    });
    events.clear();
    serviceBusReceivers.clear();
    incomingCallContexts.clear();
  });

  it("List all participants", async function () {
    let allParticipants = await callConnection.listParticipants();
    assert.isDefined(allParticipants);
    assert.isDefined(allParticipants.values);
  }).timeout(60000);

  it("Add a participant and get call properties", async function () {
    const testUser3: CommunicationUserIdentifier = await createTestUser(recorder);
    const participantInvite = new CallInvite(testUser3);
    const uniqueId2 = await serviceBusWithNewCall(testUser, testUser3);
    const callBackUrl2: string = dispatcherCallback + `?q=${uniqueId2}`;

    const addResult = await callConnection.addParticipant(participantInvite);
    assert.isDefined(addResult);

    const anotherIncomingCallContext = await waitForIncomingCallContext(uniqueId2, 8000);
    if (anotherIncomingCallContext) {
      await callAutomationClient.answerCall(anotherIncomingCallContext, callBackUrl2);
    }
    const participantAddedEvent = await waitForEvent(
      "AddParticipantSucceeded",
      callConnectionId,
      8000
    );
    assert.isDefined(participantAddedEvent);

    const callProperties = await callConnection.getCallConnectionProperties();
    assert.isDefined(callProperties);
  }).timeout(60000);

  it("Remove a participant", async function () {
    const removeResult = await callConnection.removeParticipant(testUser2);
    assert.isDefined(removeResult);

    // A call needs at least 2 participants, removing one of the only 2 participants would end the call.
    const callEndedEvent = await waitForEvent(
      "CallDisconnected",
      callConnectionId,
      8000
    );
    assert.isDefined(callEndedEvent);
  }).timeout(60000);
});