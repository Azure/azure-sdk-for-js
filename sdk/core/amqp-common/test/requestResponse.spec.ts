// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as assert from "assert";
import {
  RequestResponseLink,
  AmqpMessage,
  ErrorNameConditionMapper
} from "../src";
import { Connection } from "rhea-promise";
import { stub } from "sinon";
import EventEmitter from "events";

interface Window { }
declare let self: Window & typeof globalThis;

function getGlobal() {
  if (typeof global !== "undefined") {
    return global;
  } else {
    return self;
  }
}

describe("RequestResponseLink", function () {
  it("should send a request and receive a response correctly", async function () {
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
    });
    const sessionStub = await connectionStub.createSession();
    const senderStub = await sessionStub.createSender();
    const receiverStub = await sessionStub.createReceiver();
    const link = new RequestResponseLink(
      sessionStub as any,
      senderStub,
      receiverStub
    );
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

  it("should send a request and receive a response correctly", async function() {
    const connectionStub = stub(new Connection());
    const rcvr = new EventEmitter();
    let messageId: string = "";
    let counter = 0;
    connectionStub.createSession.resolves({
      connection: {
        id: "connection-1"
      },
      createSender: () => {
        return Promise.resolve({
          send: (request: any) => {
            counter++;
            if (counter != 1) {
              assert.notEqual(messageId, undefined);
              assert.notEqual(request.message_id, undefined);
              assert.notEqual(messageId, request.message_id);
            }
            messageId = request.message_id;
          }
        });
      },
      createReceiver: () => {
        return Promise.resolve(rcvr);
      }
    });
    const sessionStub = await connectionStub.createSession();
    const senderStub = await sessionStub.createSender();
    const receiverStub = await sessionStub.createReceiver();
    const link = new RequestResponseLink(
      sessionStub as any,
      senderStub,
      receiverStub
    );
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
    }, 2000);
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
    }, 4000);
    const response = await link.sendRequest(request, {
      delayInSeconds: 1,
      timeoutInSeconds: 5
    });
    assert.equal(response.correlation_id, messageId);
  });

  it("should send parallel requests and receive responses correctly", async function () {
    const connectionStub = stub(new Connection());
    const rcvr = new EventEmitter();
    let reqs: AmqpMessage[] = [];
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

  it("should send parallel requests and receive responses correctly (one failure)", async function () {
    const connectionStub = stub(new Connection());
    const rcvr = new EventEmitter();
    let reqs: AmqpMessage[] = [];
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
    const failedRequest = link.sendRequest(request2, {
      times: 1
    });

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

    it("sendRequest clears timeout after error message", async function () {
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
        await link.sendRequest(request, { times: 1 });
        throw new Error(testFailureMessage);
      } catch (err) {
        assert.notEqual(err.message, testFailureMessage);
      }
      assert.equal(clearTimeoutCalledCount, 1, "Expected clearTimeout to be called once.");
    });

    it("sendRequest clears timeout after successful message", async function () {
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

      await link.sendRequest(request, { times: 1 });
      assert.equal(clearTimeoutCalledCount, 1, "Expected clearTimeout to be called once.");
    });
  });
});
