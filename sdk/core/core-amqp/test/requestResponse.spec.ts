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
import { Connection } from "rhea-promise";
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
    });
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
    });
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
    }, 500);
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
    }, 1000);

    const sendRequestPromise = async () => {
      await link.sendRequest(request, {
        timeoutInSeconds: 5
      });
    };

    const config: RetryConfig<void> = {
      operation: sendRequestPromise,
      connectionId: "connection-1",
      operationType: RetryOperationType.management,
      maxRetries: 3,
      delayInSeconds: 1
    };

    await retry<void>(config);
    assert.equal(count, 2, "It should retry twice");
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
    });
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
    });
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
