// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable no-invalid-this */
import { CloudEventsDispatcher } from "../src/cloudEventsDispatcher";
import { assert } from "chai";
import { IncomingMessage, ServerResponse } from "http";
import { Socket } from "net";
import * as sinon from "sinon";

function buildRequest(
  req: IncomingMessage,
  hub: string,
  connectionId: string,
  userId?: string
): void {
  req.headers["webhook-request-origin"] = "xxx.webpubsub.azure.com";
  req.headers["Content-Type"] = "application/json; charset=utf-8";
  req.headers["ce-specversion"] = "1.0";
  req.headers["ce-type"] = "azure.webpubsub.user.connected";
  req.headers["ce-source"] = `/hubs/${hub}/client/${connectionId}`;
  req.headers["ce-id"] = "1";
  req.headers["ce-time"] = new Date().toUTCString();
  if (userId !== undefined) {
    req.headers["ce-userId"] = userId;
  }
  req.headers["ce-connectionId"] = connectionId;
  req.headers["ce-hub"] = hub;
  req.headers["ce-event"] = "connected";
}

function mockBody(req: IncomingMessage, body: string): void {
  req.emit("data", body);
  req.emit("end");
}

describe("Can handle connected event", function() {
  let req: IncomingMessage;
  let res: ServerResponse;

  beforeEach(function() {
    req = new IncomingMessage(new Socket());
    res = new ServerResponse(req);
  });

  it("Should not handle the request if request is not cloud events", async function() {
    const endSpy = sinon.spy(res.end);

    const dispatcher = new CloudEventsDispatcher("hub1", ["*"]);
    var result = await dispatcher.processRequest(req, res);
    assert.isFalse(result);
    assert.isTrue(endSpy.notCalled);
  });

  it("Should not handle the request if hub does not match", async function() {
    const endSpy = sinon.spy(res.end);
    buildRequest(req, "hub", "conn1");

    const dispatcher = new CloudEventsDispatcher("hub1", ["*"]);
    var result = await dispatcher.processRequest(req, res);
    assert.isFalse(result);
    assert.isTrue(endSpy.notCalled);
  });

  it("Should response with 200 when option is not specified", async function() {
    const endSpy = sinon.spy(res, "end");
    buildRequest(req, "hub", "conn1");

    const dispatcher = new CloudEventsDispatcher("hub", ["*"]);
    var result = await dispatcher.processRequest(req, res);
    assert.isTrue(result, "should handle");
    assert.isTrue(endSpy.calledOnce, "should call once");
    assert.equal(200, res.statusCode, "should be 200");
  });

  it("Should response with 200 when handler is not specified", async function() {
    const endSpy = sinon.spy(res, "end");
    buildRequest(req, "hub", "conn1");

    const dispatcher = new CloudEventsDispatcher("hub", ["*"], {});
    var result = await dispatcher.processRequest(req, res);
    assert.isTrue(result, "should handle");
    assert.isTrue(endSpy.calledOnce, "should call once");
    assert.equal(200, res.statusCode, "should be 200");
  });

  it("Should response 200 even the event handler throws", async function() {
    const endSpy = sinon.spy(res, "end");
    buildRequest(req, "hub", "conn1");

    const dispatcher = new CloudEventsDispatcher("hub", ["*"], {
      onConnected: async (_) => {
        throw new Error();
      }
    });
    var process = dispatcher.processRequest(req, res);
    mockBody(req, JSON.stringify({}));
    var result = await process;
    assert.isTrue(result, "should handle");
    assert.isTrue(endSpy.calledOnce, "should call once");
    assert.equal(200, res.statusCode, "should be error");
  });
});
