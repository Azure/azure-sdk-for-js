// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import "mocha";
import * as assert from "assert";
import { RequestResponseLink, AmqpMessage, ErrorNameConditionMapper } from "../lib";
import { Connection } from "rhea-promise";
import { stub } from "sinon";
import { EventEmitter } from "events";

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
      }, createReceiver: () => {
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
        "message": {
          "correlation_id": req.message_id,
          "application_properties": {
            "statusCode": 200,
            "errorCondition": null,
            "statusDescription": null,
            "com.microsoft:tracking-id": null
          },
          "body": "Hello World!!"
        }
      });
    }, 2000);
    const response = await link.sendRequest(request);
    assert.equal(response.correlation_id, req.message_id);
  });

  it("should send a request and receive a response correctly", async function () {
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
      }, createReceiver: () => {
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
        "message": {
          "correlation_id": messageId,
          "application_properties": {
            "statusCode": 500,
            "errorCondition": ErrorNameConditionMapper.InternalServerError,
            "statusDescription": "Please retry later.",
            "com.microsoft:tracking-id": "1"
          }
        }
      });
    }, 2000);
    setTimeout(() => {
      rcvr.emit("message", {
        "message": {
          "correlation_id": messageId,
          "application_properties": {
            "statusCode": 200,
            "errorCondition": null,
            "statusDescription": null,
            "com.microsoft:tracking-id": null
          },
          "body": "Hello World!!"
        }
      });
    }, 4000);
    const response = await link.sendRequest(request, { delayInSeconds: 1, timeoutInSeconds: 5 });
    assert.equal(response.correlation_id, messageId);
  });
});