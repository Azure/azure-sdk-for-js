// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortController, AbortSignalLike } from "@azure/abort-controller";
import { Connection, EventContext, Message as RheaMessage, generate_uuid } from "rhea-promise";
import {
  Constants,
  ErrorNameConditionMapper,
  RequestResponseLink,
  RetryConfig,
  RetryOperationType,
  StandardAbortMessage,
  retry,
} from "../src";
import {
  DeferredPromiseWithCallback,
  getCodeDescriptionAndError,
  onMessageReceived,
} from "../src/requestResponseLink";
import { SinonSpy, fake, stub } from "sinon";
import EventEmitter from "events";
import { assert } from "chai";
import { createConnectionStub } from "./utils/createConnectionStub";
import { isError } from "@azure/core-util";

interface Window {}
declare let self: Window & typeof globalThis;

function getGlobal(): NodeJS.Global | (Window & typeof globalThis) {
  if (typeof global !== "undefined") {
    return global;
  } else {
    return self;
  }
}

const assertItemsLengthInResponsesMap = (
  _responsesMap: Map<string, DeferredPromiseWithCallback>,
  expectedNumberOfItems: number
): void => {
  assert.equal(
    _responsesMap.size,
    expectedNumberOfItems,
    "Unexpected number of items in the _responsesMap"
  );
};

describe("RequestResponseLink", function () {
  const TEST_FAILURE = "Test failure";

  describe("#create", function () {
    it("should create a RequestResponseLink", async function () {
      const connectionStub = createConnectionStub();
      const link = await RequestResponseLink.create(connectionStub, {}, {});
      assert.isTrue(link instanceof RequestResponseLink);
    });

    it("honors already aborted abortSignal", async function () {
      const connection = new Connection();

      // Create an abort signal that will be aborted on a future tick of the event loop.
      const controller = new AbortController();
      const signal = controller.signal;
      setTimeout(() => controller.abort(), 0);

      try {
        await RequestResponseLink.create(connection, {}, {}, { abortSignal: signal });
        throw new Error(TEST_FAILURE);
      } catch (err) {
        assert.ok(isError(err));
        assert.equal((err as Error).name, "AbortError");
      }
    });

    it("honors abortSignal", async function () {
      const connection = new Connection();

      // Create an abort signal that is already aborted.
      const controller = new AbortController();
      controller.abort();
      const signal = controller.signal;

      try {
        await RequestResponseLink.create(connection, {}, {}, { abortSignal: signal });
        throw new Error(TEST_FAILURE);
      } catch (err) {
        assert.ok(isError(err));
        assert.equal((err as Error).name, "AbortError");
      }
    });
  });

  it("should send a request and receive a response correctly", async function () {
    const connectionStub = stub(new Connection());
    const rcvr = new EventEmitter();
    let req: any = {};
    connectionStub.createSession.resolves({
      connection: {
        id: "connection-1",
      },
      createSender: () => {
        return Promise.resolve({
          send: (request: any) => {
            req = request;
          },
        });
      },
      createReceiver: () => {
        return Promise.resolve(rcvr);
      },
    } as any);
    const sessionStub = await connectionStub.createSession();
    const senderStub = await sessionStub.createSender();
    const receiverStub = await sessionStub.createReceiver();
    const link = new RequestResponseLink(sessionStub as any, senderStub, receiverStub);
    const request: RheaMessage = {
      body: "Hello World!!",
    };
    assertItemsLengthInResponsesMap(link["_responsesMap"], 0);
    setTimeout(() => {
      rcvr.emit("message", {
        message: {
          correlation_id: req.message_id,
          application_properties: {
            statusCode: 200,
            errorCondition: null,
            statusDescription: null,
            "com.microsoft:tracking-id": null,
          },
          body: "Hello World!!",
        },
      });
    }, 2000);
    const response = await link.sendRequest(request);
    assertItemsLengthInResponsesMap(link["_responsesMap"], 0);
    assert.equal(response.correlation_id, req.message_id);
  });

  it("should send parallel requests and receive responses correctly", async function () {
    const connectionStub = stub(new Connection());
    const rcvr = new EventEmitter();
    const reqs: RheaMessage[] = [];
    connectionStub.createSession.resolves({
      connection: {
        id: "connection-1",
      },
      createSender: () => {
        return Promise.resolve({
          send: (request: RheaMessage) => {
            reqs.push(request);
          },
        });
      },
      createReceiver: () => {
        return Promise.resolve(rcvr);
      },
    } as any);
    const sessionStub = await connectionStub.createSession();
    const senderStub = await sessionStub.createSender();
    const receiverStub = await sessionStub.createReceiver();
    const link = new RequestResponseLink(sessionStub as any, senderStub, receiverStub);
    assertItemsLengthInResponsesMap(link["_responsesMap"], 0);
    const request1: RheaMessage = {
      body: "Hello World!!",
      message_id: 1,
    };
    const request2: RheaMessage = {
      body: "Hello again my old friend.",
      message_id: 2,
    };
    setTimeout(() => {
      rcvr.emit("message", {
        message: {
          correlation_id: reqs[0].message_id,
          application_properties: {
            statusCode: 200,
            errorCondition: null,
            statusDescription: null,
            "com.microsoft:tracking-id": null,
          },
          body: "Hello World!!",
        },
      });
    }, 2000);
    setTimeout(() => {
      rcvr.emit("message", {
        message: {
          correlation_id: reqs[1].message_id,
          application_properties: {
            statusCode: 200,
            errorCondition: null,
            statusDescription: null,
            "com.microsoft:tracking-id": null,
          },
          body: "Hello hello!",
        },
      });
    }, 2100);

    const responses = await Promise.all([link.sendRequest(request1), link.sendRequest(request2)]);
    assertItemsLengthInResponsesMap(link["_responsesMap"], 0);
    assert.equal(responses[0].correlation_id, reqs[0].message_id);
    assert.equal(responses[1].correlation_id, reqs[1].message_id);
  });

  it("request without `message_id` gets a new `message_id`", async function () {
    const connectionStub = stub(new Connection());
    const rcvr = new EventEmitter();
    const reqs: RheaMessage[] = [];
    connectionStub.createSession.resolves({
      connection: {
        id: "connection-1",
      },
      createSender: () => {
        return Promise.resolve({
          send: (request: RheaMessage) => {
            reqs.push(request);
          },
        });
      },
      createReceiver: () => {
        return Promise.resolve(rcvr);
      },
    } as any);
    const sessionStub = await connectionStub.createSession();
    const senderStub = await sessionStub.createSender();
    const receiverStub = await sessionStub.createReceiver();
    const link = new RequestResponseLink(sessionStub as any, senderStub, receiverStub);
    assertItemsLengthInResponsesMap(link["_responsesMap"], 0);
    const request1: RheaMessage = {
      body: "Hello World!!",
    };
    let errorWasThrown = false;
    try {
      await link.sendRequest(request1, {
        timeoutInMs: 2000,
      });
    } catch (error) {
      assert.equal(
        request1.message_id === undefined,
        false,
        "`message_id` on the request is undefined."
      );
      errorWasThrown = true;
    }
    assertItemsLengthInResponsesMap(link["_responsesMap"], 0);
    assert.equal(errorWasThrown, true, "Error was not thrown");
  });

  it("should send parallel requests and receive responses correctly (one failure)", async function () {
    const connectionStub = stub(new Connection());
    const rcvr = new EventEmitter();
    const reqs: RheaMessage[] = [];
    connectionStub.createSession.resolves({
      connection: {
        id: "connection-1",
      },
      createSender: () => {
        return Promise.resolve({
          send: (request: RheaMessage) => {
            reqs.push(request);
          },
        });
      },
      createReceiver: () => {
        return Promise.resolve(rcvr);
      },
    } as any);
    const sessionStub = await connectionStub.createSession();
    const senderStub = await sessionStub.createSender();
    const receiverStub = await sessionStub.createReceiver();
    const link = new RequestResponseLink(sessionStub as any, senderStub, receiverStub);
    assertItemsLengthInResponsesMap(link["_responsesMap"], 0);
    const request1: RheaMessage = {
      body: "Hello World!!",
      message_id: 1,
    };
    const request2: RheaMessage = {
      body: "Hello again my old friend.",
      message_id: 2,
    };
    setTimeout(() => {
      rcvr.emit("message", {
        message: {
          correlation_id: reqs[0].message_id,
          application_properties: {
            statusCode: 200,
            errorCondition: null,
            statusDescription: null,
            "com.microsoft:tracking-id": null,
          },
          body: "Hello World!!",
        },
      });
    }, 2000);
    setTimeout(() => {
      rcvr.emit("message", {
        message: {
          correlation_id: reqs[1].message_id,
          application_properties: {
            statusCode: 500,
            errorCondition: ErrorNameConditionMapper.InternalServerError,
            statusDescription: "Please try again later.",
            "com.microsoft:tracking-id": 1,
          },
          body: "Hello hello!",
        },
      });
    }, 1500);

    const successfulRequest = link.sendRequest(request1);
    const failedRequest = link.sendRequest(request2);

    // ensure that one request fails
    try {
      await failedRequest;
      throw new Error("Test failure");
    } catch (err) {
      assert.ok(isError(err));
      (err as Error).message.should.not.equal("Test failure");
    }

    // ensure the other request succeeds
    const response = await successfulRequest;
    assertItemsLengthInResponsesMap(link["_responsesMap"], 0);
    assert.equal(response.correlation_id, request1.message_id);
  });

  it("should surface error up through retry", async function () {
    const connectionStub = stub(new Connection());
    const rcvr = new EventEmitter();
    let messageId: string = "";
    let count = 0;
    connectionStub.createSession.resolves({
      connection: {
        id: "connection-1",
      },
      createSender: () => {
        return Promise.resolve({
          send: (request: any) => {
            count++;
            messageId = request.message_id;
          },
        });
      },
      createReceiver: () => {
        return Promise.resolve(rcvr);
      },
    } as any);
    const sessionStub = await connectionStub.createSession();
    const senderStub = await sessionStub.createSender();
    const receiverStub = await sessionStub.createReceiver();
    const link = new RequestResponseLink(sessionStub as any, senderStub, receiverStub);
    assertItemsLengthInResponsesMap(link["_responsesMap"], 0);
    const request: RheaMessage = {
      body: "Hello World!!",
    };
    setTimeout(() => {
      rcvr.emit("message", {
        message: {
          correlation_id: messageId,
          application_properties: {
            statusCode: 500,
            errorCondition: ErrorNameConditionMapper.InternalServerError,
            statusDescription: "Please retry later.",
            "com.microsoft:tracking-id": "1",
          },
        },
      });
    }, 200);
    setTimeout(() => {
      rcvr.emit("message", {
        message: {
          correlation_id: messageId,
          application_properties: {
            statusCode: 200,
            errorCondition: null,
            statusDescription: null,
            "com.microsoft:tracking-id": null,
          },
          body: "Hello World!!",
        },
      });
    }, 2000);

    const sendRequestPromise = async (): Promise<RheaMessage> => {
      return link.sendRequest(request, {
        timeoutInMs: 5000,
      });
    };

    const config: RetryConfig<RheaMessage> = {
      operation: sendRequestPromise,
      connectionId: "connection-1",
      operationType: RetryOperationType.management,
      retryOptions: {
        maxRetries: 3,
        retryDelayInMs: 1000,
      },
    };

    const message = await retry<RheaMessage>(config);
    assertItemsLengthInResponsesMap(link["_responsesMap"], 0);
    assert.equal(count, 2, "It should retry twice");
    assert.exists(message, "It should return a valid message");
    assert.equal(message.body, "Hello World!!", `Message '${message.body}' is not as expected`);
  });

  it("should abort a request and response correctly", async function () {
    const connectionStub = stub(new Connection());
    const rcvr = new EventEmitter();
    let req: any = {};
    connectionStub.createSession.resolves({
      connection: {
        id: "connection-1",
      },
      createSender: () => {
        return Promise.resolve({
          send: (request: any) => {
            req = request;
          },
        });
      },
      createReceiver: () => {
        return Promise.resolve(rcvr);
      },
    } as any);
    const sessionStub = await connectionStub.createSession();
    const senderStub = await sessionStub.createSender();
    const receiverStub = await sessionStub.createReceiver();
    const link = new RequestResponseLink(sessionStub as any, senderStub, receiverStub);
    assertItemsLengthInResponsesMap(link["_responsesMap"], 0);
    const request: RheaMessage = {
      body: "Hello World!!",
    };
    setTimeout(() => {
      rcvr.emit("message", {
        message: {
          correlation_id: req.message_id,
          application_properties: {
            statusCode: 200,
            errorCondition: null,
            statusDescription: null,
            "com.microsoft:tracking-id": null,
          },
          body: "Hello World!!",
        },
      });
    }, 2000);
    try {
      const controller = new AbortController();
      const signal = controller.signal;
      setTimeout(controller.abort.bind(controller), 100);
      await link.sendRequest(request, { abortSignal: signal, requestName: "foo" });
      throw new Error(`Test failure`);
    } catch (err) {
      assert.ok(isError(err));
      const error = err as Error;
      assert.equal(error.name, "AbortError", `Error name ${error.name} is not as expected`);
      assert.equal(
        error.message,
        StandardAbortMessage,
        `Incorrect error received "${error.message}"`
      );
    }
    assertItemsLengthInResponsesMap(link["_responsesMap"], 0);
  });

  it("should abort a request and response correctly when abort signal is fired after sometime", async function () {
    const connectionStub = stub(new Connection());
    const rcvr = new EventEmitter();
    let req: any = {};
    connectionStub.createSession.resolves({
      connection: {
        id: "connection-1",
      },
      createSender: () => {
        return Promise.resolve({
          send: (request: any) => {
            req = request;
          },
        });
      },
      createReceiver: () => {
        return Promise.resolve(rcvr);
      },
    } as any);
    const sessionStub = await connectionStub.createSession();
    const senderStub = await sessionStub.createSender();
    const receiverStub = await sessionStub.createReceiver();
    const link = new RequestResponseLink(sessionStub as any, senderStub, receiverStub);
    assertItemsLengthInResponsesMap(link["_responsesMap"], 0);
    const request: RheaMessage = {
      body: "Hello World!!",
    };
    setTimeout(() => {
      rcvr.emit("message", {
        message: {
          correlation_id: req.message_id,
          application_properties: {
            statusCode: 200,
            errorCondition: null,
            statusDescription: null,
            "com.microsoft:tracking-id": null,
          },
          body: "Hello World!!",
        },
      });
    }, 2000);
    try {
      // Order of events
      // - sendRequest is called
      // - request id is added to the map with a deferred promise
      // - abort event is raised
      // - request id deleted from the map
      // - promise is rejected with the abort error
      // Asserting before the abort event is raised
      setTimeout(() => {
        assertItemsLengthInResponsesMap(link["_responsesMap"], 1);
      }, 700);
      await link.sendRequest(request, {
        abortSignal: AbortController.timeout(1000),
        requestName: "foo",
      });
      throw new Error(`Test failure`);
    } catch (err) {
      assert.ok(isError(err));
      const error = err as Error;
      assert.equal(error.name, "AbortError", `Error name ${error.name} is not as expected`);
      assert.equal(
        error.message,
        StandardAbortMessage,
        `Incorrect error received "${error.message}"`
      );
    }
    // Final state of the map
    assertItemsLengthInResponsesMap(link["_responsesMap"], 0);
  });

  it("should abort a request and response correctly when abort signal is already fired", async function () {
    const connectionStub = stub(new Connection());
    const rcvr = new EventEmitter();
    let req: any = {};
    connectionStub.createSession.resolves({
      connection: {
        id: "connection-1",
      },
      createSender: () => {
        return Promise.resolve({
          send: (request: any) => {
            req = request;
          },
        });
      },
      createReceiver: () => {
        return Promise.resolve(rcvr);
      },
    } as any);
    const sessionStub = await connectionStub.createSession();
    const senderStub = await sessionStub.createSender();
    const receiverStub = await sessionStub.createReceiver();
    const link = new RequestResponseLink(sessionStub as any, senderStub, receiverStub);
    assertItemsLengthInResponsesMap(link["_responsesMap"], 0);
    const request: RheaMessage = {
      body: "Hello World!!",
    };
    setTimeout(() => {
      rcvr.emit("message", {
        message: {
          correlation_id: req.message_id,
          application_properties: {
            statusCode: 200,
            errorCondition: null,
            statusDescription: null,
            "com.microsoft:tracking-id": null,
          },
          body: "Hello World!!",
        },
      });
    }, 2000);
    try {
      const controller = new AbortController();
      const signal: AbortSignalLike = controller.signal;
      controller.abort();
      await link.sendRequest(request, { abortSignal: signal, requestName: "foo" });
      throw new Error(`Test failure`);
    } catch (err) {
      assert.ok(isError(err));
      const error = err as Error;
      assert.equal(error.name, "AbortError", `Error name ${error.name} is not as expected`);
      assert.equal(
        error.message,
        StandardAbortMessage,
        `Incorrect error received "${error.message}"`
      );
    }
    assertItemsLengthInResponsesMap(link["_responsesMap"], 0);
  });

  describe("sendRequest clears timeout", () => {
    const _global = getGlobal();
    const originalClearTimeout = clearTimeout;
    let clearTimeoutCalledCount = 0;

    beforeEach(() => {
      clearTimeoutCalledCount = 0;
      _global.clearTimeout = (tid: any) => {
        clearTimeoutCalledCount++;
        return originalClearTimeout(tid);
      };
    });

    afterEach(() => {
      _global.clearTimeout = originalClearTimeout;
    });

    it("sendRequest clears timeout after error message", async function () {
      const connectionStub = stub(new Connection());
      const rcvr = new EventEmitter();
      let req: any = {};
      connectionStub.createSession.resolves({
        connection: {
          id: "connection-1",
        },
        createSender: () => {
          return Promise.resolve({
            send: (request: any) => {
              req = request;
            },
          });
        },
        createReceiver: () => {
          return Promise.resolve(rcvr);
        },
      } as any);
      const sessionStub = await connectionStub.createSession();
      const senderStub = await sessionStub.createSender();
      const receiverStub = await sessionStub.createReceiver();
      const link = new RequestResponseLink(sessionStub as any, senderStub, receiverStub);
      assertItemsLengthInResponsesMap(link["_responsesMap"], 0);
      const request: RheaMessage = {
        body: "Hello World!!",
      };
      const testFailureMessage = "Test failure";
      setTimeout(() => {
        rcvr.emit("message", {
          message: {
            correlation_id: req.message_id,
            application_properties: {
              statusCode: 400,
              errorCondition: null,
              statusDescription: null,
              "com.microsoft:tracking-id": null,
            },
            body: "I should throw an error!",
          },
        });
      }, 0);
      try {
        await link.sendRequest(request, { timeoutInMs: 120000, requestName: "foo" });
        throw new Error(testFailureMessage);
      } catch (err) {
        assert.ok(isError(err));
        const error = err as Error;
        assert.notEqual(error.message, testFailureMessage);
      }
      assertItemsLengthInResponsesMap(link["_responsesMap"], 0);
      assert.equal(clearTimeoutCalledCount, 1, "Expected clearTimeout to be called once.");
    });

    it("sendRequest clears timeout after successful message", async function () {
      const connectionStub = stub(new Connection());
      const rcvr = new EventEmitter();
      let req: any = {};
      connectionStub.createSession.resolves({
        connection: {
          id: "connection-1",
        },
        createSender: () => {
          return Promise.resolve({
            send: (request: any) => {
              req = request;
            },
          });
        },
        createReceiver: () => {
          return Promise.resolve(rcvr);
        },
      } as any);
      const sessionStub = await connectionStub.createSession();
      const senderStub = await sessionStub.createSender();
      const receiverStub = await sessionStub.createReceiver();
      const link = new RequestResponseLink(sessionStub as any, senderStub, receiverStub);
      assertItemsLengthInResponsesMap(link["_responsesMap"], 0);
      const request: RheaMessage = {
        body: "Hello World!!",
      };
      setTimeout(() => {
        rcvr.emit("message", {
          message: {
            correlation_id: req.message_id,
            application_properties: {
              statusCode: 200,
              errorCondition: null,
              statusDescription: null,
              "com.microsoft:tracking-id": null,
            },
            body: "I work!",
          },
        });
      }, 0);

      await link.sendRequest(request, { timeoutInMs: 120000, requestName: "foo" });
      assertItemsLengthInResponsesMap(link["_responsesMap"], 0);
      assert.equal(clearTimeoutCalledCount, 1, "Expected clearTimeout to be called once.");
    });
  });

  describe("close", () => {
    it("signals receiver and sender to now close the session", async () => {
      const connectionStub = stub(new Connection());
      connectionStub.createSession.resolves({
        connection: {
          id: "connection-1",
        },
        close: fake(),
        createSender: () => {
          return Promise.resolve({
            send: () => {
              /* no op */
            },
            close: fake(),
          });
        },
        createReceiver: () => {
          return Promise.resolve({
            close: fake(),
            on: () => {
              /** Empty function on purpose for the sake of mocking */
            },
          });
        },
      } as any);
      const sessionStub = await connectionStub.createSession();
      const senderStub = await sessionStub.createSender();
      const receiverStub = await sessionStub.createReceiver();
      const link = new RequestResponseLink(
        sessionStub as any,
        senderStub as any,
        receiverStub as any
      );

      await link.close();

      assert(
        (senderStub.close as SinonSpy).calledOnceWith({ closeSession: false }),
        "Sender.close() should have been called once."
      );
      assert(
        (receiverStub.close as SinonSpy).calledOnceWith({ closeSession: false }),
        "Receiver.close() should have been called once."
      );
      assert(
        (sessionStub.close as SinonSpy).calledOnceWithExactly(),
        "Session.close() should have been called once."
      );
    });
  });

  describe("utils - getCodeDescriptionAndError", () => {
    // EventHubs
    [
      {
        [Constants.statusCode]: 404,
        [Constants.statusDescription]: "The messaging entity could not be found",
        [Constants.errorCondition]: "amqp:not-found",
      },
      {
        [Constants.statusCode]: 202,
        [Constants.statusDescription]: "Accepted",
      },
    ].forEach((testCase) =>
      it("EventHubs format", () => {
        const info = getCodeDescriptionAndError(testCase);
        assert.equal(info.statusCode, testCase[Constants.statusCode]);
        assert.equal(info.statusDescription, testCase[Constants.statusDescription]);
        assert.equal(info.errorCondition, testCase[Constants.errorCondition]);
      })
    );

    // ServiceBus
    [
      {
        statusCode: 404,
        statusDescription: "The messaging entity could not be found",
        errorCondition: "amqp:not-found",
      },
      {
        statusCode: 202,
        statusDescription: "Accepted",
      },
    ].forEach((testCase) =>
      it("ServiceBus format", () => {
        const info = getCodeDescriptionAndError(testCase);
        assert.equal(info.statusCode, testCase.statusCode);
        assert.equal(info.statusDescription, testCase.statusDescription);
        assert.equal(info.errorCondition, testCase.errorCondition);
      })
    );
  });

  describe("onMessageReceived Handler", () => {
    // Declarations/Defaults
    let context: Pick<EventContext, "message">;
    let responsesMap: Map<string, DeferredPromiseWithCallback>;
    const defaultConnectionId = "connection-id";

    // Assertion Flags
    let cleanupBeforeResolveOrRejectIsCalled: boolean;
    let isResolved: boolean;
    let isRejected: boolean;

    beforeEach(() => {
      context = {
        message: {
          correlation_id: "abc-id",
          body: "random-body",
          application_properties: { statusCode: 200 },
        },
      };
      responsesMap = new Map<string, DeferredPromiseWithCallback>();
      responsesMap.set("abc-id", {
        resolve: () => {
          isResolved = true;
        },
        reject: () => {
          isRejected = true;
        },
        cleanupBeforeResolveOrReject: () => {
          cleanupBeforeResolveOrRejectIsCalled = true;
        },
      });
      cleanupBeforeResolveOrRejectIsCalled = false;
      isResolved = false;
      isRejected = false;
    });

    it("returns if the message property is undefined, map is un-edited", () => {
      context.message = undefined;
      onMessageReceived(context, defaultConnectionId, responsesMap);
      assertItemsLengthInResponsesMap(responsesMap, 1);
      assert.equal(
        cleanupBeforeResolveOrRejectIsCalled,
        false,
        "Unexpected - cleanupBeforeResolveOrReject is called"
      );
      assert.equal(isRejected, false, "Unexpected - promise is rejected");
      assert.equal(isResolved, false, "Unexpected - promise is resolved");
    });

    it("returns if the correlation-id does not match, map is un-edited", () => {
      context.message!.correlation_id = "def-id";
      onMessageReceived(context, defaultConnectionId, responsesMap);
      assertItemsLengthInResponsesMap(responsesMap, 1);
      assert.equal(
        cleanupBeforeResolveOrRejectIsCalled,
        false,
        "Unexpected - cleanupBeforeResolveOrReject is called"
      );
      assert.equal(isRejected, false, "Unexpected - promise is rejected");
      assert.equal(isResolved, false, "Unexpected - promise is resolved");
    });

    it("returns if the correlation-id is not a string, map is un-edited", () => {
      context.message!.correlation_id = Buffer.from("123");
      onMessageReceived(context, defaultConnectionId, responsesMap);
      assertItemsLengthInResponsesMap(responsesMap, 1);
      assert.equal(
        cleanupBeforeResolveOrRejectIsCalled,
        false,
        "Unexpected - cleanupBeforeResolveOrReject is called"
      );
      assert.equal(isRejected, false, "Unexpected - promise is rejected");
      assert.equal(isResolved, false, "Unexpected - promise is resolved");
    });

    it("calls the cleanup callback and deletes the id from the map for the success case - (status code > 199 and < 300)", () => {
      assertItemsLengthInResponsesMap(responsesMap, 1);
      onMessageReceived(context, defaultConnectionId, responsesMap);
      assertItemsLengthInResponsesMap(responsesMap, 0);
      assert.equal(
        cleanupBeforeResolveOrRejectIsCalled,
        true,
        "Unexpected - cleanupBeforeResolveOrReject is not called"
      );
      assert.equal(isResolved, true, "Unexpected - promise is not resolved");
      assert.equal(isRejected, false, "Unexpected - promise is rejected");
    });

    it("deletes the only the single matched id from the map for the success case - (status code > 199 and < 300)", () => {
      assertItemsLengthInResponsesMap(responsesMap, 1);
      responsesMap.set(`${generate_uuid()}`, {
        resolve: () => {
          /** Empty function on purpose for the sake of mocking */
        },
        reject: () => {
          /** Empty function on purpose for the sake of mocking */
        },
        cleanupBeforeResolveOrReject: () => {
          /** Empty function on purpose for the sake of mocking */
        },
      });
      // Map has more elements
      assertItemsLengthInResponsesMap(responsesMap, 2);
      onMessageReceived(context, defaultConnectionId, responsesMap);
      assertItemsLengthInResponsesMap(responsesMap, 1);
      assert.equal(
        cleanupBeforeResolveOrRejectIsCalled,
        true,
        "Unexpected - cleanupBeforeResolveOrReject is not called"
      );
      assert.equal(isResolved, true, "Unexpected - promise is not resolved");
      assert.equal(isRejected, false, "Unexpected - promise is rejected");
    });

    it("calls the cleanup callback and deletes the id from the map for the failure case - (status code is not > 199 and <300)", () => {
      context.message!.application_properties!.statusCode = 404;
      assertItemsLengthInResponsesMap(responsesMap, 1);
      onMessageReceived(context, defaultConnectionId, responsesMap);
      assertItemsLengthInResponsesMap(responsesMap, 0);
      assert.equal(
        cleanupBeforeResolveOrRejectIsCalled,
        true,
        "Unexpected - cleanupBeforeResolveOrReject is not called"
      );
      assert.equal(isResolved, false, "Unexpected - promise is resolved");
      assert.equal(isRejected, true, "Unexpected - promise is not rejected");
    });

    it("calls the cleanup callback and deletes the id from the map and rejects if there is no status code", () => {
      context.message!.application_properties!.statusCode = undefined;
      assertItemsLengthInResponsesMap(responsesMap, 1);
      onMessageReceived(context, defaultConnectionId, responsesMap);
      assertItemsLengthInResponsesMap(responsesMap, 0);
      assert.equal(
        cleanupBeforeResolveOrRejectIsCalled,
        true,
        "Unexpected - cleanupBeforeResolveOrReject is not called"
      );
      assert.equal(isResolved, false, "Unexpected - promise is resolved");
      assert.equal(isRejected, true, "Unexpected - promise is not rejected");
    });
  });
});
