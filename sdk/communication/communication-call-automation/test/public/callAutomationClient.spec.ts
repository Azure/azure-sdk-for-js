// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommunicationIdentifier, CommunicationUserIdentifier } from "@azure/communication-common";
import { fail } from "assert";
import { assert } from "chai";
import Sinon, { SinonStubbedInstance } from "sinon";
import { CallAutomationClient } from "../../src/callAutomationClient";
import { CallConnection } from "../../src/callConnection";
import { CallConnectionProperties } from "../../src/generated/src/models/mappers";
import { CallConnectionPropertiesDto, CallSourceDto } from "../../src/models/models";
import { CreateCallResult } from "../../src/models/responses";
import { CALL_CALLBACK_URL, CALL_CALLER_ID, CALL_TARGET_ID } from "./utils/connectionUtils";

describe("Call Automation Client Unit Tests", () => {
  var caller: CommunicationUserIdentifier;
  var targets: CommunicationIdentifier[];
  var callSource: CallSourceDto;
  var client: SinonStubbedInstance<CallAutomationClient> & CallAutomationClient;

  beforeEach(() => {
    // set up
    caller = {
      communicationUserId: CALL_CALLER_ID
    }
    targets = [{
      communicationUserId: CALL_TARGET_ID
    }];
    callSource = {
      identifier: caller
    }
    // stub CallAutomationClient
    client = Sinon.createStubInstance(CallAutomationClient) as SinonStubbedInstance<CallAutomationClient> & CallAutomationClient;
  });

  it("CreateCall", async () => {

    // mocks
    const createCallResultMock: CreateCallResult = {
      callConnectionProperties: Sinon.mock(CallConnectionProperties) as CallConnectionPropertiesDto,
      callConnection: Sinon.createStubInstance(CallConnection) as SinonStubbedInstance<CallConnection> & CallConnection
    };
    client.createCall.returns(new Promise((resolve) => {
      resolve(createCallResultMock);
    }));

    var promiseResult = client.createCall(callSource, targets, CALL_CALLBACK_URL);

    // asserts
    promiseResult.then((result: CreateCallResult) => {
      assert.isNotNull(result);
      assert.isTrue(client.createCall.calledWith(callSource, targets, CALL_CALLBACK_URL));
      assert.equal(result, createCallResultMock);
    }).catch((reject) => {
      fail(reject); // should not reach here
    });
  });

})
