// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommunicationIdentifier } from "@azure/communication-common";
import Sinon, { SinonStubbedInstance } from "sinon"
import { CallAutomationClient } from "../../src/callAutomationClient"
import { CALL_TARGET_ID } from "./utils/connectionUtils";

describe("Call Media Client Unit Tests", () => {
  var targets: CommunicationIdentifier[];
  var client: SinonStubbedInstance<CallAutomationClient> & CallAutomationClient;

  beforeEach(() => {
    // set up
    targets = [{
      communicationUserId: CALL_TARGET_ID
    }];
    // stub CallAutomationClient
    client = Sinon.createStubInstance(CallAutomationClient) as SinonStubbedInstance<CallAutomationClient> & CallAutomationClient;
  });

  it("Play", async () => {

  });

  it("PlayToAll", async () => {

  });

  it("StartRecognizing", async () => {

  });

  it("CancelAllMediaOperations", async () => {

  });
})
