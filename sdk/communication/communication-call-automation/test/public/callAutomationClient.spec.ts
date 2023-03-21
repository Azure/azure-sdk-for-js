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

describe("Call Automation Main Client Live Tests", function () {
  let recorder: Recorder;
  let callAutomationClient: CallAutomationClient;
  let callConnection: CallConnection;
  let testUser: CommunicationUserIdentifier;
  let testUser2: CommunicationUserIdentifier;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this.currentTest);
    testUser = await createTestUser(recorder);
    testUser2 = await createTestUser(recorder);
    callAutomationClient = createCallAutomationClient(recorder, testUser);
  });

  afterEach(async function (this: Context) {
    serviceBusReceivers.forEach((receiver) => {
      receiver.close();
    });
    events.forEach((callConnectionEvents) => {
      callConnectionEvents.clear();
    });
    events.clear();
    serviceBusReceivers.clear();
    incomingCallContexts.clear();
  });


  it("Create a call to an ACS endpoint and hangup", async function () {
    const callInvite = new CallInvite(testUser2);
    const uniqueId = await serviceBusWithNewCall(testUser, testUser2);
    const callBackUrl: string = dispatcherCallback + `?q=${uniqueId}`;

    const result = await callAutomationClient.createCall(callInvite, callBackUrl);
    const incomingCallContext = await waitForIncomingCallContext(uniqueId, 8000);
    const callConnectionId: string = result.callConnectionProperties.callConnectionId ? result.callConnectionProperties.callConnectionId : "";
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

    await callConnection.hangUp(true);
    const callDisconnectedEvent = await waitForEvent(
      "CallDisconnected",
      callConnectionId,
      8000);
    assert.isDefined(callDisconnectedEvent);
  }).timeout(60000);


  it("Reject an incoming call", async function () {
    const callInvite = new CallInvite(testUser2);
    const uniqueId = await serviceBusWithNewCall(testUser, testUser2);
    const callBackUrl: string = dispatcherCallback + `?q=${uniqueId}`;

    const result = await callAutomationClient.createCall(callInvite, callBackUrl);
    const incomingCallContext = await waitForIncomingCallContext(uniqueId, 8000);
    const callConnectionId: string = result.callConnectionProperties.callConnectionId ? result.callConnectionProperties.callConnectionId : "";
    assert.isDefined(incomingCallContext);

    if (incomingCallContext) {
      await callAutomationClient.rejectCall(incomingCallContext);
    }

    const callDisconnectedEvent = await waitForEvent(
      "CallDisconnected",
      callConnectionId,
      8000
    );
    assert.isDefined(callDisconnectedEvent);
  }).timeout(60000);
});
