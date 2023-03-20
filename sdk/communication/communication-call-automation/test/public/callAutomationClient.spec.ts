// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { CommunicationUserIdentifier } from "@azure/communication-common";
import { assert } from "chai";
import { Context } from "mocha";
import { CallAutomationClient, CallInvite, CallConnection } from "../../src";
import { createRecorder, createTestUser, dispatcherCallback, serviceBusWithNewCall, createCallAutomationClient, waitForIncomingCallContext, waitForEvent } from "./utils/recordedClient";
import { events, serviceBusReceivers, incomingCallContexts } from "./utils/recordedClient";

let recorder: Recorder;
let callAutomationClient: CallAutomationClient;
let callConnection: CallConnection;
let testUser: CommunicationUserIdentifier;
let testUser2: CommunicationUserIdentifier;

describe("CallAutomation Live Test", function () {

	describe("Main Client Test Cases", function () {

		beforeEach(async function (this: Context) {
			recorder = await createRecorder(this.currentTest);
			testUser = await createTestUser(recorder);
			testUser2 = await createTestUser(recorder);
			callAutomationClient = createCallAutomationClient(recorder, testUser);
		})

		afterEach(async function (this: Context) {
			if (callConnection) {
				await callConnection.hangUp(true);
				console.log("Call terminated");
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
		})

		it("successfully creates a call", async function () {
			let callInvite = new CallInvite(testUser2);
			let uniqueId = await serviceBusWithNewCall(testUser, testUser2);
			console.log("uniqueId: " + uniqueId);
			let callBackUrl: string = dispatcherCallback + `?q=${uniqueId}`;

			let result = await callAutomationClient.createCall(callInvite, callBackUrl);
			const incomingCallContext = await waitForIncomingCallContext(uniqueId, 8000);
			assert.isDefined(incomingCallContext);

			if (incomingCallContext) {
				await callAutomationClient.answerCall(incomingCallContext, callBackUrl);
			}

			if (result.callConnectionProperties.callConnectionId) {
				await waitForEvent("CallConnected", result.callConnectionProperties.callConnectionId, 8000);
			}

			callConnection = result.callConnection;
			const properties = await callConnection.getCallConnectionProperties();
			assert.isDefined(properties);
			assert.equal(properties.callConnectionState, "connected");
		}).timeout(60000);
      })
      .catch((error) => console.error(error));
  });
});
