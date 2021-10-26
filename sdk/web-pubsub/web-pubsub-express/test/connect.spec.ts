// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable no-invalid-this */
import { CloudEventsDispatcher } from "../src/cloudEventsDispatcher";
import { assert } from "chai";
import { IncomingMessage, ServerResponse } from "http";
import { Socket } from "net";
import * as sinon from "sinon";
import { toBase64JsonString } from "../src/utils";

function buildRequest(
  req: IncomingMessage,
  hub: string,
  connectionId: string,
  userId?: string,
  states?: string
): void {
  req.headers["webhook-request-origin"] = "xxx.webpubsub.azure.com";
  req.headers["Content-Type"] = "application/json; charset=utf-8";
  req.headers["ce-specversion"] = "1.0";
  req.headers["ce-type"] = "azure.webpubsub.sys.connect";
  req.headers["ce-source"] = `/hubs/${hub}/client/${connectionId}`;
  req.headers["ce-id"] = "1";
  req.headers["ce-time"] = new Date().toUTCString();
  if (userId !== undefined) {
    req.headers["ce-userId"] = userId;
  }
  req.headers["ce-connectionId"] = connectionId;
  req.headers["ce-hub"] = hub;
  req.headers["ce-event"] = "connect";
  req.headers["ce-connectionState"] = states;
}

function mockBody(req: IncomingMessage, body: string): void {
  req.emit("data", Buffer.from(body, "utf-8"));
  req.emit("end");
}

describe("Can handle connect event", function() {
  let req: IncomingMessage;
  let res: ServerResponse;

  beforeEach(function() {
    req = new IncomingMessage(new Socket());
    res = new ServerResponse(req);
  });

  it("Should not handle the request if request is not cloud events", async function() {
    const endSpy = sinon.spy(res.end);

    const dispatcher = new CloudEventsDispatcher("hub1", ["*"]);
    const result = await dispatcher.processRequest(req, res);
    assert.isFalse(result);
    assert.isTrue(endSpy.notCalled);
  });

  it("Should not handle the request if hub does not match", async function() {
    const endSpy = sinon.spy(res, "end");
    buildRequest(req, "hub", "conn1");

    const dispatcher = new CloudEventsDispatcher("hub1", ["*"]);
    const result = await dispatcher.processRequest(req, res);
    assert.isFalse(result);
    assert.isTrue(endSpy.notCalled);
  });

  it("Should response with 401 when option is not specified", async function() {
    const endSpy = sinon.spy(res, "end");
    buildRequest(req, "hub", "conn1");

    const dispatcher = new CloudEventsDispatcher("hub", ["*"]);
    const result = await dispatcher.processRequest(req, res);
    assert.isTrue(result, "should handle");
    assert.isTrue(endSpy.calledOnce, "should call once");
    assert.equal(401, res.statusCode, "should be 401");
  });

  it("Should response with 401 when handler is not specified", async function() {
    const endSpy = sinon.spy(res, "end");
    buildRequest(req, "hub", "conn1");

    const dispatcher = new CloudEventsDispatcher("hub", ["*"], {});
    const result = await dispatcher.processRequest(req, res);
    assert.isTrue(result, "should handle");
    assert.isTrue(endSpy.calledOnce, "should call once");
    assert.equal(401, res.statusCode, "should be 401");
  });

  it("Should response with error when handler returns error", async function() {
    const endSpy = sinon.spy(res, "end");
    buildRequest(req, "hub", "conn1");

    const dispatcher = new CloudEventsDispatcher("hub", ["*"], {
      handleConnect: async (_, response) => {
        response.fail(400);
      }
    });
    const process = dispatcher.processRequest(req, res);
    mockBody(req, JSON.stringify({}));
    const result = await process;
    assert.isTrue(result, "should handle");
    assert.isTrue(endSpy.calledOnce, "should call once");
    assert.equal(400, res.statusCode, "should be error");
  });

  it("Should response with success when handler returns success", async function() {
    const endSpy = sinon.spy(res, "end");
    buildRequest(req, "hub", "conn1");

    const dispatcher = new CloudEventsDispatcher("hub", ["*"], {
      handleConnect: async (_, response) => {
        response.success();
      }
    });
    const process = dispatcher.processRequest(req, res);
    mockBody(req, JSON.stringify({}));
    const result = await process;
    assert.isTrue(result, "should handle");
    assert.isTrue(endSpy.calledOnce, "should call once");
    assert.equal(200, res.statusCode, "should be success");
  });

  it("Should response with success when handler returns success value", async function() {
    const endSpy = sinon.spy(res, "end");
    buildRequest(req, "hub", "conn1");

    const dispatcher = new CloudEventsDispatcher("hub", ["*"], {
      handleConnect: async (_, response) => {
        response.success({ userId: "vic" });
      }
    });
    const process = dispatcher.processRequest(req, res);
    mockBody(req, JSON.stringify({}));
    const result = await process;
    assert.isTrue(result, "should handle");
    assert.isTrue(endSpy.calledOnce, "should call once");
    assert.equal(200, res.statusCode, "should be success");
  });

  it("Should be able to set connection state", async function() {
    const endSpy = sinon.spy(res, "end");
    buildRequest(req, "hub", "conn1");

    const dispatcher = new CloudEventsDispatcher("hub", ["*"], {
      handleConnect: async (_, response) => {
        response.setState("key1", "val1");
        response.setState("key2", "val2");
        response.setState("key1", ["val3"]);
        response.setState("key3", "");
        response.success({ userId: "vic" });
      }
    });
    const process = dispatcher.processRequest(req, res);
    mockBody(req, JSON.stringify({}));
    const result = await process;
    assert.isTrue(result, "should handle");
    assert.isTrue(endSpy.calledOnce, "should call once");
    assert.equal(
      toBase64JsonString({
        key1: ["val3"],
        key2: "val2",
        key3: ""
      }),
      res.getHeader("ce-connectionState"),
      "should contain multiple state headers"
    );
  });

  it("Should be able to get the connection states if it exists in the header", async function() {
    const endSpy = sinon.spy(res, "end");
    const states = toBase64JsonString({
      key1: ["val3"],
      key2: "val2",
      key3: ""
    });
    buildRequest(req, "hub1", "conn1", undefined, states);
    const dispatcher = new CloudEventsDispatcher("hub1", ["*"], {
      handleConnect: (request, response) => {
        assert.equal("val3", request.context.states["key1"][0]);
        assert.equal("val2", request.context.states["key2"]);
        assert.equal("", request.context.states["key3"]);
        response.success();
      }
    });
    const process = dispatcher.processRequest(req, res);
    mockBody(req, JSON.stringify({}));
    const result = await process;
    assert.isTrue(result, "should handle");
    assert.isTrue(endSpy.calledOnce, "should call once");
    assert.equal(200, res.statusCode, "should be success");
  });

  it("Invalid state header gets ignored", async function() {
    const endSpy = sinon.spy(res, "end");
    buildRequest(req, "hub1", "conn1", undefined, "");
    const dispatcher = new CloudEventsDispatcher("hub1", ["*"], {
      handleConnect: (request, response) => {
        assert.deepEqual({}, request.context.states);
        response.success();
      }
    });
    const process = dispatcher.processRequest(req, res);
    mockBody(req, JSON.stringify({}));
    const result = await process;
    assert.isTrue(result, "should handle");
    assert.isTrue(endSpy.calledOnce, "should call once");
    assert.equal(200, res.statusCode, "should be success");
  });
});
