// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { CommunicationIdentifier, CommunicationUserIdentifier } from "@azure/communication-common";
import { assert } from "chai";
import Sinon, { SinonStubbedInstance } from "sinon";
import { CallAutomationClient } from "../src/callAutomationClient";
import { CallConnection } from "../src/callConnection";
import { CallConnectionProperties } from "../src/models/models";
import { CreateCallResult } from "../src/models/responses";
import { CALL_CALLBACK_URL, CALL_TARGET_ID } from "./utils/connectionUtils";
import { Context } from "mocha";
import { createRecorder, createTestUser, createCallAutomationClient } from "./utils/testClient";

describe("Call Automation Client Unit Tests", () => {
  let targets: CommunicationIdentifier[];
  let client: SinonStubbedInstance<CallAutomationClient> & CallAutomationClient;

  beforeEach(() => {
    // set up
    targets = [
      {
        communicationUserId: CALL_TARGET_ID,
      },
    ];
    // stub CallAutomationClient
    client = Sinon.createStubInstance(
      CallAutomationClient
    ) as SinonStubbedInstance<CallAutomationClient> & CallAutomationClient;
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

    const promiseResult = client.createCall(targets, CALL_CALLBACK_URL);

    // asserts
    promiseResult
      .then((result: CreateCallResult) => {
        assert.isNotNull(result);
        assert.isTrue(client.createCall.calledWith(targets, CALL_CALLBACK_URL));
        assert.equal(result, createCallResultMock);
        return;
      })
      .catch((error) => console.error(error));
  });
});

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
    if (callConnection) {
      try {
        await callConnection.hangUp(true);
      } catch (e) {
        console.log("Call is terminated");
      }
    }
    await recorder.stop();
  });

  it("Create a call and hangup", async function () {
    console.log("test");
    console.log(callAutomationClient == undefined);
    console.log(testUser2 == undefined);
  }).timeout(60000);
});