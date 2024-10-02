// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { assert, expect } from "chai";
import { CallAutomationEventProcessor } from "../src/eventprocessor/callAutomationEventProcessor";
import { CallConnected, CallDisconnected } from "../src/models/events";
import {
  CALL_CALLBACK_URL,
  MOCK_CONNECTION_STRING,
  CALL_CALLER_ID,
  CALL_TARGET_ID,
} from "./utils/connectionUtils";
import { CallAutomationClient, CallInvite } from "../src";
import { generateHttpClient } from "./utils/mockClient";

describe("Call Automation Event Processor Unit Tests", () => {
  const CALL_CONNECTION_CALL_ID = "callConnectionId";
  const SERVER_CALL_ID = "serverCallId";
  const CORRELATION_ID = "correlationId";

  let callAutomationClient: CallAutomationClient;

  beforeEach(() => {
    callAutomationClient = new CallAutomationClient(MOCK_CONNECTION_STRING);
  });

  it("WaitForEventThenSendEvent", async () => {
    const eventProcessor: CallAutomationEventProcessor = callAutomationClient.getEventProcessor();

    // wait for event
    const promiseResult = eventProcessor.waitForEventProcessor(
      (event) => {
        if (event.callConnectionId === CALL_CONNECTION_CALL_ID) {
          return true;
        } else {
          return false;
        }
      },
      undefined,
      500,
    );

    // send the event
    const connectedEvent: CallConnected = {
      callConnectionId: CALL_CONNECTION_CALL_ID,
      serverCallId: SERVER_CALL_ID,
      correlationId: CORRELATION_ID,
      kind: "CallConnected",
    };
    eventProcessor.processEvents(connectedEvent);

    // asserts
    expect(await promiseResult).to.equal(connectedEvent);
  });

  it("ProcessEventFirstThenWaitForIt", async () => {
    const eventProcessor: CallAutomationEventProcessor = callAutomationClient.getEventProcessor();

    // send the event first
    const connectedEvent: CallConnected = {
      callConnectionId: CALL_CONNECTION_CALL_ID,
      serverCallId: SERVER_CALL_ID,
      correlationId: CORRELATION_ID,
      kind: "CallConnected",
    };
    eventProcessor.processEvents(connectedEvent);

    // wait for event
    const promiseResult = eventProcessor.waitForEventProcessor(
      (event) => {
        if (event.callConnectionId === CALL_CONNECTION_CALL_ID) {
          return true;
        } else {
          return false;
        }
      },
      undefined,
      500,
    );

    // asserts
    expect(await promiseResult).to.equal(connectedEvent);
  });

  it("NoMatchTimeOutException", async () => {
    const eventProcessor: CallAutomationEventProcessor = callAutomationClient.getEventProcessor();

    // wait for event
    const promiseResult = eventProcessor.waitForEventProcessor(
      (event) => {
        if (event.callConnectionId === CALL_CONNECTION_CALL_ID) {
          return true;
        } else {
          return false;
        }
      },
      undefined,
      500,
    );

    // send the event
    const connectedEvent: CallConnected = {
      callConnectionId: "someOtherCallConnectionId",
      serverCallId: SERVER_CALL_ID,
      correlationId: CORRELATION_ID,
      kind: "CallConnected",
    };
    eventProcessor.processEvents(connectedEvent);

    // asserts
    let errorThrown = false;
    try {
      await promiseResult;
    } catch (error: any) {
      errorThrown = true;
      assert.equal(error.message, "Timeout: Matching event did not arrive within timeout.");
    }
    if (!errorThrown) {
      throw new Error("Expected promise to throw, but it resolved successfully.");
    }
  });

  it("SendingMultipleDifferentEvents", async () => {
    const testCallConnectionId1 = CALL_CONNECTION_CALL_ID + "1";
    const eventProcessor: CallAutomationEventProcessor = callAutomationClient.getEventProcessor();

    // wait for event
    const promiseResult = eventProcessor.waitForEventProcessor(
      (event) => {
        if (event.callConnectionId === testCallConnectionId1) {
          return true;
        } else {
          return false;
        }
      },
      undefined,
      500,
    );

    // send the event
    for (let i = 0; i < 10; i++) {
      const connectedEvent: CallConnected = {
        callConnectionId: CALL_CONNECTION_CALL_ID + i.toString(),
        serverCallId: SERVER_CALL_ID,
        correlationId: CORRELATION_ID,
        kind: "CallConnected",
      };
      eventProcessor.processEvents(connectedEvent);
    }

    // asserts
    expect((await promiseResult).callConnectionId).to.equal(testCallConnectionId1);
  });

  it("WaitForEventThenAbort", async () => {
    const eventProcessor: CallAutomationEventProcessor = callAutomationClient.getEventProcessor();

    // prep for abort controller
    const controller = new AbortController();

    // wait for event
    const promiseResult = eventProcessor.waitForEventProcessor(
      (event) => {
        if (event.callConnectionId === CALL_CONNECTION_CALL_ID) {
          return true;
        } else {
          return false;
        }
      },
      controller.signal,
      500,
    );

    // abort + asserts
    let errorThrown = false;
    try {
      controller.abort();
      await promiseResult;
    } catch (error: any) {
      errorThrown = true;
      assert.equal(error.message, "Abort: Operation was aborted.");
    }
    if (!errorThrown) {
      throw new Error("Expected promise to abort, but it resolved successfully.");
    }
  });

  it("WaitForEventProcessorCreateEventResult", async () => {
    // setup mock for create call and its response
    const CREATE_CALL_RESPONSE = {
      callConnectionId: CALL_CONNECTION_CALL_ID,
      targets: [
        {
          rawId: CALL_CALLER_ID,
          kind: "communicationUser",
          communicationUser: {
            id: CALL_CALLER_ID,
          },
        },
      ],
      callConnectionState: "connecting",
      callbackUri: CALL_CALLBACK_URL,
      sourceIdentity: {
        rawId: CALL_TARGET_ID,
        kind: "communicationUser",
        communicationUser: {
          id: CALL_TARGET_ID,
        },
      },
      correlationId: CORRELATION_ID,
    };
    const mockClient = generateHttpClient(201, CREATE_CALL_RESPONSE);
    callAutomationClient = new CallAutomationClient(MOCK_CONNECTION_STRING, {
      httpClient: mockClient,
    });

    // setup
    const target: CallInvite = {
      targetParticipant: {
        communicationUserId: CALL_TARGET_ID,
      },
    };

    // create call
    const callResult = await callAutomationClient.createCall(target, CALL_CALLBACK_URL);
    const eventProcessor = callAutomationClient.getEventProcessor();

    // wait for event from createCall
    const promiseResult = callResult.waitForEventProcessor(undefined, 500);

    // send the event
    const connectedEvent: CallConnected = {
      callConnectionId: CALL_CONNECTION_CALL_ID,
      serverCallId: SERVER_CALL_ID,
      correlationId: CORRELATION_ID,
      kind: "CallConnected",
    };
    eventProcessor.processEvents(connectedEvent);

    // asserts
    const createCallEventResult = await promiseResult;
    expect(createCallEventResult.isSuccess).to.equal(true);
    expect(createCallEventResult.successResult).to.equal(connectedEvent);
  });

  it("AttachOngoingEventProcessorTest", async () => {
    const eventProcessor: CallAutomationEventProcessor = callAutomationClient.getEventProcessor();
    let ongoingEventCalled = false;

    const connectedEvent: CallConnected = {
      callConnectionId: CALL_CONNECTION_CALL_ID,
      serverCallId: SERVER_CALL_ID,
      correlationId: CORRELATION_ID,
      kind: "CallConnected",
    };

    // attach ongoing processor
    eventProcessor.attachOngoingEventProcessor(
      CALL_CONNECTION_CALL_ID,
      "CallConnected",
      async (event) => {
        expect(event).to.equal(connectedEvent);
        ongoingEventCalled = true;
      },
    );

    // send the event
    eventProcessor.processEvents(connectedEvent);

    // assert if ongoing processor was called
    expect(ongoingEventCalled).to.equal(true);
  });

  it("DetachOngoingEventProcessorTest", async () => {
    const eventProcessor: CallAutomationEventProcessor = callAutomationClient.getEventProcessor();
    let ongoingEventCalled = false;

    const connectedEvent: CallConnected = {
      callConnectionId: CALL_CONNECTION_CALL_ID,
      serverCallId: SERVER_CALL_ID,
      correlationId: CORRELATION_ID,
      kind: "CallConnected",
    };

    // attach ongoing processor
    await eventProcessor.attachOngoingEventProcessor(
      CALL_CONNECTION_CALL_ID,
      "CallConnected",
      async (event) => {
        expect(event).to.equal(connectedEvent);
        ongoingEventCalled = true;
      },
    );

    // send the event
    eventProcessor.processEvents(connectedEvent);

    // assert if ongoing processor was called
    expect(ongoingEventCalled).to.equal(true);

    // detach ongoing processor
    await eventProcessor.detachOngoingEventProcessor(CALL_CONNECTION_CALL_ID, "CallConnected");
    ongoingEventCalled = false;

    // send again
    eventProcessor.processEvents(connectedEvent);

    // assert if ongoing processor was NOT called
    expect(ongoingEventCalled).to.equal(false);
  });

  it("CallDisconnectWillEraseOngoingEventProcessor", async () => {
    const eventProcessor: CallAutomationEventProcessor = callAutomationClient.getEventProcessor();
    let ongoingEventCalled = false;

    const connectedEvent: CallConnected = {
      callConnectionId: CALL_CONNECTION_CALL_ID,
      serverCallId: SERVER_CALL_ID,
      correlationId: CORRELATION_ID,
      kind: "CallConnected",
    };

    // attach ongoing processor
    await eventProcessor.attachOngoingEventProcessor(
      CALL_CONNECTION_CALL_ID,
      "CallConnected",
      async (event) => {
        expect(event).to.equal(connectedEvent);
        ongoingEventCalled = true;
      },
    );

    // send the event
    eventProcessor.processEvents(connectedEvent);

    // assert if ongoing processor was called
    expect(ongoingEventCalled).to.equal(true);

    // send the disconnect event
    const disconnectedEvent: CallDisconnected = {
      callConnectionId: CALL_CONNECTION_CALL_ID,
      serverCallId: SERVER_CALL_ID,
      correlationId: CORRELATION_ID,
      kind: "CallDisconnected",
    };
    eventProcessor.processEvents(disconnectedEvent);

    // send again
    ongoingEventCalled = false;
    eventProcessor.processEvents(connectedEvent);

    // assert if ongoing processor was NOT called
    expect(ongoingEventCalled).to.equal(false);
  });
});
