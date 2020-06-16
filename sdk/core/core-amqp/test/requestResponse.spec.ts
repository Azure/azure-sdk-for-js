// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import {
  AmqpMessage,
  ErrorNameConditionMapper,
  RequestResponseLink,
  RetryConfig,
  RetryOperationType,
  retry
} from "../src";
import { Connection, Message } from "rhea-promise";
import { stub } from "sinon";
import EventEmitter from "events";
import { AbortController, AbortSignalLike } from "@azure/abort-controller";
interface Window {}
declare let self: Window & typeof globalThis;

function getGlobal() {
  if (typeof global !== "undefined") {
    return global;
  } else {
    return self;
  }
}

describe("RequestResponseLink", function() {
  it("should send a request and receive a response correctly", async function() {
    const connectionStub = stub(new Connection());
    const rcvr = new EventEmitter();
    let req: any = {};
    connectionStub.createSession.resolves({
      connection: {
        id: "connection-1"
      },
      createSender: () => {
        return Promise.resolve({
          send: (request: any) => {
            req = request;
          }
        });
      },
      createReceiver: () => {
        return Promise.resolve(rcvr);
      }
    } as any);
    const sessionStub = await connectionStub.createSession();
    const senderStub = await sessionStub.createSender();
    const receiverStub = await sessionStub.createReceiver();
    const link = new RequestResponseLink(sessionStub as any, senderStub, receiverStub);
    const request: AmqpMessage = {
      body: "Hello World!!"
    };
    setTimeout(() => {
      rcvr.emit("message", {
        message: {
          correlation_id: req.message_id,
          application_properties: {
            statusCode: 200,
            errorCondition: null,
            statusDescription: null,
            "com.microsoft:tracking-id": null
          },
          body: "Hello World!!"
        }
      });
    }, 2000);
    const response = await link.sendRequest(request);
    assert.equal(response.correlation_id, req.message_id);
  });

  it("should send parallel requests and receive responses correctly", async function() {
    const connectionStub = stub(new Connection());
    const rcvr = new EventEmitter();
    const reqs: AmqpMessage[] = [];
    connectionStub.createSession.resolves({
      connection: {
        id: "connection-1"
      },
      createSender: () => {
        return Promise.resolve({
          send: (request: AmqpMessage) => {
            reqs.push(request);
          }
        });
      },
      createReceiver: () => {
        return Promise.resolve(rcvr);
      }
    } as any);
    const sessionStub = await connectionStub.createSession();
    const senderStub = await sessionStub.createSender();
    const receiverStub = await sessionStub.createReceiver();
    const link = new RequestResponseLink(sessionStub as any, senderStub, receiverStub);
    const request1: AmqpMessage = {
      body: "Hello World!!",
      message_id: 1
    };
    const request2: AmqpMessage = {
      body: "Hello again my old friend.",
      message_id: 2
    };
    setTimeout(() => {
      rcvr.emit("message", {
        message: {
          correlation_id: reqs[0].message_id,
          application_properties: {
            statusCode: 200,
            errorCondition: null,
            statusDescription: null,
            "com.microsoft:tracking-id": null
          },
          body: "Hello World!!"
        }
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
            "com.microsoft:tracking-id": null
          },
          body: "Hello hello!"
        }
      });
    }, 2100);

    const responses = await Promise.all([link.sendRequest(request1), link.sendRequest(request2)]);

    assert.equal(responses[0].correlation_id, reqs[0].message_id);
    assert.equal(responses[1].correlation_id, reqs[1].message_id);
  });

  it("request without `message_id` gets a new `message_id`", async function() {
    const connectionStub = stub(new Connection());
    const rcvr = new EventEmitter();
    const reqs: AmqpMessage[] = [];
    connectionStub.createSession.resolves({
      connection: {
        id: "connection-1"
      },
      createSender: () => {
        return Promise.resolve({
          send: (request: AmqpMessage) => {
            reqs.push(request);
          }
        });
      },
      createReceiver: () => {
        return Promise.resolve(rcvr);
      }
    } as any);
    const sessionStub = await connectionStub.createSession();
    const senderStub = await sessionStub.createSender();
    const receiverStub = await sessionStub.createReceiver();
    const link = new RequestResponseLink(sessionStub as any, senderStub, receiverStub);
    const request1: AmqpMessage = {
      body: "Hello World!!"
    };
    let errorWasThrown = false;
    try {
      await link.sendRequest(request1, {
        timeoutInMs: 2000
      });
    } catch (error) {
      assert.equal(
        request1.message_id == undefined,
        false,
        "`message_id` on the request is undefined."
      );
      errorWasThrown = true;
    }
    assert.equal(errorWasThrown, true, "Error was not thrown");
  });

  it("should send parallel requests and receive responses correctly (one failure)", async function() {
    const connectionStub = stub(new Connection());
    const rcvr = new EventEmitter();
    const reqs: AmqpMessage[] = [];
    connectionStub.createSession.resolves({
      connection: {
        id: "connection-1"
      },
      createSender: () => {
        return Promise.resolve({
          send: (request: AmqpMessage) => {
            reqs.push(request);
          }
        });
      },
      createReceiver: () => {
        return Promise.resolve(rcvr);
      }
    } as any);
    const sessionStub = await connectionStub.createSession();
    const senderStub = await sessionStub.createSender();
    const receiverStub = await sessionStub.createReceiver();
    const link = new RequestResponseLink(sessionStub as any, senderStub, receiverStub);
    const request1: AmqpMessage = {
      body: "Hello World!!",
      message_id: 1
    };
    const request2: AmqpMessage = {
      body: "Hello again my old friend.",
      message_id: 2
    };
    setTimeout(() => {
      rcvr.emit("message", {
        message: {
          correlation_id: reqs[0].message_id,
          application_properties: {
            statusCode: 200,
            errorCondition: null,
            statusDescription: null,
            "com.microsoft:tracking-id": null
          },
          body: "Hello World!!"
        }
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
            "com.microsoft:tracking-id": 1
          },
          body: "Hello hello!"
        }
      });
    }, 1500);

    const successfulRequest = link.sendRequest(request1);
    const failedRequest = link.sendRequest(request2);

    // ensure that one request fails
    try {
      await failedRequest;
      throw new Error("Test failure");
    } catch (err) {
      err.message.should.not.equal("Test failure");
    }

    // ensure the other request succeeds
    const response = await successfulRequest;
    assert.equal(response.correlation_id, request1.message_id);
  });

  it("should surface error up through retry", async function() {
    const connectionStub = stub(new Connection());
    const rcvr = new EventEmitter();
    let messageId: string = "";
    let count = 0;
    connectionStub.createSession.resolves({
      connection: {
        id: "connection-1"
      },
      createSender: () => {
        return Promise.resolve({
          send: (request: any) => {
            count++;
            messageId = request.message_id;
          }
        });
      },
      createReceiver: () => {
        return Promise.resolve(rcvr);
      }
    } as any);
    const sessionStub = await connectionStub.createSession();
    const senderStub = await sessionStub.createSender();
    const receiverStub = await sessionStub.createReceiver();
    const link = new RequestResponseLink(sessionStub as any, senderStub, receiverStub);
    const request: AmqpMessage = {
      body: "Hello World!!"
    };
    setTimeout(() => {
      rcvr.emit("message", {
        message: {
          correlation_id: messageId,
          application_properties: {
            statusCode: 500,
            errorCondition: ErrorNameConditionMapper.InternalServerError,
            statusDescription: "Please retry later.",
            "com.microsoft:tracking-id": "1"
          }
        }
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
            "com.microsoft:tracking-id": null
          },
          body: "Hello World!!"
        }
      });
    }, 2000);

    const sendRequestPromise = async (): Promise<Message> => {
      return link.sendRequest(request, {
        timeoutInMs: 5000
      });
    };

    const config: RetryConfig<Message> = {
      operation: sendRequestPromise,
      connectionId: "connection-1",
      operationType: RetryOperationType.management,
      retryOptions: {
        maxRetries: 3,
        retryDelayInMs: 1000
      }
    };

    const message = await retry<Message>(config);
    assert.equal(count, 2, "It should retry twice");
    assert.exists(message, "It should return a valid message");
    assert.equal(message.body, "Hello World!!", `Message '${message.body}' is not as expected`);
  });

  it("should abort a request and response correctly", async function() {
    const connectionStub = stub(new Connection());
    const rcvr = new EventEmitter();
    let req: any = {};
    connectionStub.createSession.resolves({
      connection: {
        id: "connection-1"
      },
      createSender: () => {
        return Promise.resolve({
          send: (request: any) => {
            req = request;
          }
        });
      },
      createReceiver: () => {
        return Promise.resolve(rcvr);
      }
    } as any);
    const sessionStub = await connectionStub.createSession();
    const senderStub = await sessionStub.createSender();
    const receiverStub = await sessionStub.createReceiver();
    const link = new RequestResponseLink(sessionStub as any, senderStub, receiverStub);
    const request: AmqpMessage = {
      body: "Hello World!!"
    };
    setTimeout(() => {
      rcvr.emit("message", {
        message: {
          correlation_id: req.message_id,
          application_properties: {
            statusCode: 200,
            errorCondition: null,
            statusDescription: null,
            "com.microsoft:tracking-id": null
          },
          body: "Hello World!!"
        }
      });
    }, 2000);
    try {
      const controller = new AbortController();
      const signal = controller.signal;
      setTimeout(controller.abort.bind(controller), 100);
      await link.sendRequest(request, { abortSignal: signal, requestName: "foo" });
      throw new Error(`Test failure`);
    } catch (err) {
      const expectedErrorRegex = new RegExp(
        /The foo operation has been cancelled by the user.$/,
        "gi"
      );
      assert.equal(err.name, "AbortError", `Error name ${err.name} is not as expected`);
      assert.equal(
        expectedErrorRegex.test(err.message),
        true,
        `Incorrect error received "${err.message}"`
      );
    }
  });

  it("should abort a request and response correctly when abort signal is already fired", async function() {
    const connectionStub = stub(new Connection());
    const rcvr = new EventEmitter();
    let req: any = {};
    connectionStub.createSession.resolves({
      connection: {
        id: "connection-1"
      },
      createSender: () => {
        return Promise.resolve({
          send: (request: any) => {
            req = request;
          }
        });
      },
      createReceiver: () => {
        return Promise.resolve(rcvr);
      }
    } as any);
    const sessionStub = await connectionStub.createSession();
    const senderStub = await sessionStub.createSender();
    const receiverStub = await sessionStub.createReceiver();
    const link = new RequestResponseLink(sessionStub as any, senderStub, receiverStub);
    const request: AmqpMessage = {
      body: "Hello World!!"
    };
    setTimeout(() => {
      rcvr.emit("message", {
        message: {
          correlation_id: req.message_id,
          application_properties: {
            statusCode: 200,
            errorCondition: null,
            statusDescription: null,
            "com.microsoft:tracking-id": null
          },
          body: "Hello World!!"
        }
      });
    }, 2000);
    try {
      const controller = new AbortController();
      const signal: AbortSignalLike = controller.signal;
      controller.abort();
      await link.sendRequest(request, { abortSignal: signal, requestName: "foo" });
      throw new Error(`Test failure`);
    } catch (err) {
      const expectedErrorRegex = new RegExp(
        /The foo operation has been cancelled by the user.$/,
        "gi"
      );
      assert.equal(err.name, "AbortError", `Error name ${err.name} is not as expected`);
      assert.equal(
        expectedErrorRegex.test(err.message),
        true,
        `Incorrect error received "${err.message}"`
      );
    }
  });

  describe("sendRequest clears timeout", () => {
    const _global = getGlobal();
    const originalClearTimeout = clearTimeout;
    let clearTimeoutCalledCount = 0;

    beforeEach(() => {
      clearTimeoutCalledCount = 0;
      _global.clearTimeout = (tid) => {
        clearTimeoutCalledCount++;
        return originalClearTimeout(tid);
      };
    });

    afterEach(() => {
      _global.clearTimeout = originalClearTimeout;
    });

    it("sendRequest clears timeout after error message", async function() {
      const connectionStub = stub(new Connection());
      const rcvr = new EventEmitter();
      let req: any = {};
      connectionStub.createSession.resolves({
        connection: {
          id: "connection-1"
        },
        createSender: () => {
          return Promise.resolve({
            send: (request: any) => {
              req = request;
            }
          });
        },
        createReceiver: () => {
          return Promise.resolve(rcvr);
        }
      } as any);
      const sessionStub = await connectionStub.createSession();
      const senderStub = await sessionStub.createSender();
      const receiverStub = await sessionStub.createReceiver();
      const link = new RequestResponseLink(sessionStub as any, senderStub, receiverStub);
      const request: AmqpMessage = {
        body: "Hello World!!"
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
              "com.microsoft:tracking-id": null
            },
            body: "I should throw an error!"
          }
        });
      }, 0);
      try {
        await link.sendRequest(request, { timeoutInMs: 120000, requestName: "foo" });
        throw new Error(testFailureMessage);
      } catch (err) {
        assert.notEqual(err.message, testFailureMessage);
      }
      assert.equal(clearTimeoutCalledCount, 1, "Expected clearTimeout to be called once.");
    });

    it("sendRequest clears timeout after successful message", async function() {
      const connectionStub = stub(new Connection());
      const rcvr = new EventEmitter();
      let req: any = {};
      connectionStub.createSession.resolves({
        connection: {
          id: "connection-1"
        },
        createSender: () => {
          return Promise.resolve({
            send: (request: any) => {
              req = request;
            }
          });
        },
        createReceiver: () => {
          return Promise.resolve(rcvr);
        }
      } as any);
      const sessionStub = await connectionStub.createSession();
      const senderStub = await sessionStub.createSender();
      const receiverStub = await sessionStub.createReceiver();
      const link = new RequestResponseLink(sessionStub as any, senderStub, receiverStub);
      const request: AmqpMessage = {
        body: "Hello World!!"
      };
      setTimeout(() => {
        rcvr.emit("message", {
          message: {
            correlation_id: req.message_id,
            application_properties: {
              statusCode: 200,
              errorCondition: null,
              statusDescription: null,
              "com.microsoft:tracking-id": null
            },
            body: "I work!"
          }
        });
      }, 0);

      await link.sendRequest(request, { timeoutInMs: 120000, requestName: "foo" });
      assert.equal(clearTimeoutCalledCount, 1, "Expected clearTimeout to be called once.");
    });
  });
});
