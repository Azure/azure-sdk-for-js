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
  req.headers["ce-type"] = "azure.webpubsub.user.connect";
  req.headers["ce-source"] = `/hubs/${hub}/client/${connectionId}`;
  req.headers["ce-id"] = "1";
  req.headers["ce-time"] = new Date().toUTCString();
  if (userId !== undefined) {
    req.headers["ce-userId"] = userId;
  }
  req.headers["ce-connectionId"] = connectionId;
  req.headers["ce-hub"] = hub;
  req.headers["ce-event"] = "connect";
}

function mockBody(req: IncomingMessage, body: string): void {
  req.emit("data", Buffer.from(body, "utf-8"));
  req.emit("end");
}

describe("Can handle user event", function() {
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
    const endSpy = sinon.spy(res.end);
    buildRequest(req, "hub", "conn1");

    const dispatcher = new CloudEventsDispatcher("hub1", ["*"]);
    const result = await dispatcher.processRequest(req, res);
    assert.isFalse(result);
    assert.isTrue(endSpy.notCalled);
  });

  it("Should response with 200 when option is not specified", async function() {
    const endSpy = sinon.spy(res, "end");
    buildRequest(req, "hub", "conn1");

    const dispatcher = new CloudEventsDispatcher("hub", ["*"]);
    const result = await dispatcher.processRequest(req, res);
    assert.isTrue(result, "should handle");
    assert.isTrue(endSpy.calledOnce, "should call once");
    assert.equal(200, res.statusCode, "should be 200");
  });

  it("Should response with 200 when handler is not specified", async function() {
    const endSpy = sinon.spy(res, "end");
    buildRequest(req, "hub", "conn1");

    const dispatcher = new CloudEventsDispatcher("hub", ["*"], {});
    const result = await dispatcher.processRequest(req, res);
    assert.isTrue(result, "should handle");
    assert.isTrue(endSpy.calledOnce, "should call once");
    assert.equal(200, res.statusCode, "should be 200");
  });

  it("Should response with error when handler returns error", async function() {
    const endSpy = sinon.spy(res, "end");
    buildRequest(req, "hub", "conn1");

    const dispatcher = new CloudEventsDispatcher("hub", ["*"], {
      handleUserEvent: async (_, res) => {
        res.fail(500);
      }
    });
    const process = dispatcher.processRequest(req, res);
    mockBody(req, JSON.stringify({}));
    const result = await process;
    assert.isTrue(result, "should handle");
    assert.isTrue(endSpy.calledOnce, "should call once");
    assert.equal(500, res.statusCode, "should be error");
  });

  it("Should response with success when handler returns success", async function() {
    const endSpy = sinon.spy(res, "end");
    buildRequest(req, "hub", "conn1");

    const dispatcher = new CloudEventsDispatcher("hub", ["*"], {
      handleUserEvent: async (_, res) => {
        res.success();
      }
    });
    const process = dispatcher.processRequest(req, res);
    mockBody(req, JSON.stringify({}));
    const result = await process;
    assert.isTrue(result, "should handle");
    assert.isTrue(endSpy.calledOnce, "should call once");
    assert.equal(200, res.statusCode, "should be success");
  });

  it("Should response with success when returns success binary", async function() {
    const endSpy = sinon.spy(res, "end");
    buildRequest(req, "hub", "conn1");

    const dispatcher = new CloudEventsDispatcher("hub", ["*"], {
      handleUserEvent: async (_, res) => {
        res.success("a");
      }
    });
    const process = dispatcher.processRequest(req, res);
    mockBody(req, JSON.stringify({}));
    const result = await process;
    assert.isTrue(result, "should handle");
    assert.isTrue(endSpy.calledOnce, "should call once");
    assert.equal(200, res.statusCode, "should be success");
    assert.equal("application/octet-stream", res.getHeader("content-type"), "should be binary");
  });

  it("Should response with success when returns success text", async function() {
    const endSpy = sinon.spy(res, "end");
    buildRequest(req, "hub", "conn1");

    const dispatcher = new CloudEventsDispatcher("hub", ["*"], {
      handleUserEvent: async (_, res) => {
        res.success("a", "text");
      }
    });
    const process = dispatcher.processRequest(req, res);
    mockBody(req, JSON.stringify({}));
    const result = await process;
    assert.isTrue(result, "should handle");
    assert.isTrue(endSpy.calledOnce, "should call once");
    assert.equal(200, res.statusCode, "should be success");
    assert.equal("text/plain; charset=utf-8", res.getHeader("content-type"), "should be text");
  });

  it("Should response with success when returns success json", async function() {
    const endSpy = sinon.spy(res, "end");
    buildRequest(req, "hub", "conn1");

    const dispatcher = new CloudEventsDispatcher("hub", ["*"], {
      handleUserEvent: async (_, res) => {
        res.success("a", "json");
      }
    });
    const process = dispatcher.processRequest(req, res);
    mockBody(req, JSON.stringify({}));
    const result = await process;
    assert.isTrue(result, "should handle");
    assert.isTrue(endSpy.calledOnce, "should call once");
    assert.equal(200, res.statusCode, "should be success");
    assert.equal(
      "application/json; charset=utf-8",
      res.getHeader("content-type"),
      "should be json"
    );
  });

  it("Should be able to set connection state", async function() {
    const endSpy = sinon.spy(res, "end");
    buildRequest(req, "hub", "conn1");

    const dispatcher = new CloudEventsDispatcher("hub", ["*"], {
      handleUserEvent: async (_, res) => {
        res.setState("key1", "val1");
        res.setState("key2", "val2");
        res.setState("key1", "val3");
        res.setState("key3", "");
        res.success();
      }
    });
    const process = dispatcher.processRequest(req, res);
    mockBody(req, JSON.stringify({}));
    const result = await process;
    assert.isTrue(result, "should handle");
    assert.isTrue(endSpy.calledOnce, "should call once");
    assert.equal(200, res.statusCode, "should be success");

    assert.equal(
      Buffer.from(
        JSON.stringify({
          key1: "val3",
          key2: "val2",
          key3: ""
        })
      ).toString("base64"),
      res.getHeader("ce-connectionState"),
      "should contain multiple state headers"
    );
  });
});
