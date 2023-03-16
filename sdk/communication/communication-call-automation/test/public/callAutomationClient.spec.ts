// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommunicationIdentifier } from "@azure/communication-common";
import { assert } from "chai";
import Sinon, { SinonStubbedInstance } from "sinon";
import { CallAutomationClient } from "../../src/callAutomationClient";
import { CallConnection } from "../../src/callConnection";
import { CallConnectionProperties } from "../../src/models/models";
import { CreateCallResult } from "../../src/models/responses";
import { CALL_CALLBACK_URL, CALL_TARGET_ID } from "./utils/connectionUtils";

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
