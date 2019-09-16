// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as assert from "assert";
import {
  RequestResponseLink,
  AmqpMessage,
  ErrorNameConditionMapper,
  RetryConfig,
  RetryOperationType,
  retry
} from "../src";
import { Connection, Message } from "rhea-promise";
import { stub } from "sinon";
import EventEmitter from "events";
import { AbortController, AbortSignalLike } from "@azure/abort-controller";

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

  it("should send parellel requests and receive responses correctly", async function() {
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

  it("should send parellel requests and receive responses correctly (one failure)", async function() {
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
      return await link.sendRequest(request, {
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
    assert.equal(message == undefined, false, "It should return a valid message");
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
});
