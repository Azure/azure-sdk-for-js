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
  userId?: string,
  contentType?: string
): void {
  req.headers["webhook-request-origin"] = "xxx.webpubsub.azure.com";
  req.headers["content-type"] = contentType ?? "application/json; charset=utf-8";
  req.headers["ce-awpsversion"] = "1.0";
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

function mockBinaryBody(req: IncomingMessage, body: ArrayBuffer): void {
  req.emit("data", body);
  req.emit("end");
}

function mockBody(req: IncomingMessage, body: string): void {
  return mockBinaryBody(req, Buffer.from(body, "utf-8"));
}

describe("Can handle user event", function () {
  let req: IncomingMessage;
  let res: ServerResponse;

  beforeEach(function () {
    req = new IncomingMessage(new Socket());
    res = new ServerResponse(req);
  });

  it("Should not handle the request if request is not cloud events", async function () {
    const endSpy = sinon.spy(res, "end");
    const dispatcher = new CloudEventsDispatcher("hub1");
    const result = await dispatcher.handleRequest(req, res);
    assert.isFalse(result);
    assert.isTrue(endSpy.notCalled);
  });

  it("Should not handle the request if hub does not match", async function () {
    const endSpy = sinon.spy(res, "end");
    buildRequest(req, "hub", "conn1");

    const dispatcher = new CloudEventsDispatcher("hub1");
    const result = await dispatcher.handleRequest(req, res);
    assert.isFalse(result);
    assert.isTrue(endSpy.notCalled);
  });

  it("Should handle number requests", async function () {
    const endSpy = sinon.spy(res, "end");
    buildRequest(req, "hub", "conn1");

    const dispatcher = new CloudEventsDispatcher("hub", {
      handleUserEvent: async (request, response) => {
        assert.equal(request.dataType, "json");
        assert.equal(typeof request.data, "number");
        assert.strictEqual(1, request.data);
        response.success();
      },
    });
    const process = dispatcher.handleRequest(req, res);
    mockBody(req, JSON.stringify(1));
    const result = await process;

    assert.isTrue(result);
    assert.equal(200, res.statusCode, "should be 200");
    assert.isTrue(endSpy.calledOnce);
  });

  it("Should handle boolean requests", async function () {
    const endSpy = sinon.spy(res, "end");
    buildRequest(req, "hub", "conn1");

    const dispatcher = new CloudEventsDispatcher("hub", {
      handleUserEvent: async (request, response) => {
        assert.equal(request.dataType, "json");
        assert.equal(typeof request.data, "boolean");
        assert.strictEqual(true, request.data);
        response.success();
      },
    });
    const process = dispatcher.handleRequest(req, res);
    mockBody(req, JSON.stringify(true));
    const result = await process;

    assert.isTrue(result);
    assert.equal(200, res.statusCode, "should be 200");
    assert.isTrue(endSpy.calledOnce);
  });

  it("Should handle complex object requests", async function () {
    const endSpy = sinon.spy(res, "end");
    buildRequest(req, "hub", "conn1");

    const dispatcher = new CloudEventsDispatcher("hub", {
      handleUserEvent: async (request, response) => {
        assert.equal(request.dataType, "json");
        assert.equal(typeof request.data, "object");
        assert.equal((<{ a: number }>request.data).a, 1);
        response.success();
      },
    });
    const process = dispatcher.handleRequest(req, res);
    mockBody(req, JSON.stringify({ a: 1 }));
    const result = await process;

    assert.isTrue(result);
    assert.isTrue(endSpy.calledOnce);
  });

  it("Should handle complex array requests", async function () {
    const endSpy = sinon.spy(res, "end");
    buildRequest(req, "hub", "conn1");

    const dispatcher = new CloudEventsDispatcher("hub", {
      handleUserEvent: async (request, response) => {
        assert.equal(request.dataType, "json");
        assert.equal(typeof request.data, "object");
        assert.isTrue(Array.isArray(request.data));
        assert.deepEqual(request.data, [1, 2, 3]);
        response.success();
      },
    });
    const process = dispatcher.handleRequest(req, res);
    mockBody(req, JSON.stringify([1, 2, 3]));
    const result = await process;

    assert.isTrue(result);
    assert.isTrue(endSpy.calledOnce);
  });

  it("Should handle binary requests", async function () {
    const endSpy = sinon.spy(res, "end");
    buildRequest(req, "hub", "conn1", "user1", "application/octet-stream");

    const dispatcher = new CloudEventsDispatcher("hub", {
      handleUserEvent: async (request, response) => {
        assert.equal(request.dataType, "binary");
        assert.equal(typeof request.data, "object");
        assert.deepEqual(
          request.data,
          new Uint8Array([1, 2, 3, 4, 5, 6, 7]),
          "buffer data matches"
        );
        response.success();
      },
    });
    const process = dispatcher.handleRequest(req, res);
    const body = new Uint8Array([1, 2, 3, 4, 5, 6, 7]);
    mockBinaryBody(req, body);
    const result = await process;

    assert.isTrue(result, "should be able to process");
    assert.isTrue(endSpy.calledOnce, "should be called once");
  });

  it("Should handle text requests", async function () {
    const endSpy = sinon.spy(res, "end");
    buildRequest(req, "hub", "conn1", "user1", "text/plain");

    const dispatcher = new CloudEventsDispatcher("hub", {
      handleUserEvent: async (request, response) => {
        assert.equal(request.dataType, "text");
        assert.equal(typeof request.data, "string");
        console.log(request);
        assert.equal(request.data, "Hello", "string data matches");
        response.success();
      },
    });
    const process = dispatcher.handleRequest(req, res);
    mockBody(req, "Hello");
    const result = await process;

    assert.isTrue(result, "should be able to process");
    assert.isTrue(endSpy.calledOnce, "should be called once");
  });

  it("Should handle text requests with charset", async function () {
    const endSpy = sinon.spy(res, "end");
    buildRequest(req, "hub", "conn1", "user1", "text/plain; charset=UTF-8;");

    const dispatcher = new CloudEventsDispatcher("hub", {
      handleUserEvent: async (request, response) => {
        assert.equal(request.dataType, "text");
        assert.equal(typeof request.data, "string");
        console.log(request);
        assert.equal(request.data, "Hello", "string data matches");
        response.success();
      },
    });
    const process = dispatcher.handleRequest(req, res);
    mockBody(req, "Hello");
    const result = await process;

    assert.isTrue(result, "should be able to process");
    assert.isTrue(endSpy.calledOnce, "should be called once");
  });

  it("Should response with 200 when option is not specified", async function () {
    const endSpy = sinon.spy(res, "end");
    buildRequest(req, "hub", "conn1");

    const dispatcher = new CloudEventsDispatcher("hub");
    const result = await dispatcher.handleRequest(req, res);
    assert.isTrue(result, "should handle");
    assert.isTrue(endSpy.calledOnce, "should call once");
    assert.equal(200, res.statusCode, "should be 200");
  });

  it("Should response with 200 when handler is not specified", async function () {
    const endSpy = sinon.spy(res, "end");
    buildRequest(req, "hub", "conn1");

    const dispatcher = new CloudEventsDispatcher("hub", {});
    const result = await dispatcher.handleRequest(req, res);
    assert.isTrue(result, "should handle");
    assert.isTrue(endSpy.calledOnce, "should call once");
    assert.equal(200, res.statusCode, "should be 200");
  });

  it("Should response with error when handler returns error", async function () {
    const endSpy = sinon.spy(res, "end");
    buildRequest(req, "hub", "conn1");

    const dispatcher = new CloudEventsDispatcher("hub", {
      handleUserEvent: async (_, response) => {
        response.fail(500);
      },
    });
    const process = dispatcher.handleRequest(req, res);
    mockBody(req, JSON.stringify({}));
    const result = await process;
    assert.isTrue(result, "should handle");
    assert.isTrue(endSpy.calledOnce, "should call once");
    assert.equal(500, res.statusCode, "should be error");
  });

  it("Should response with success when handler returns success", async function () {
    const endSpy = sinon.spy(res, "end");
    buildRequest(req, "hub", "conn1");

    const dispatcher = new CloudEventsDispatcher("hub", {
      handleUserEvent: async (_, response) => {
        response.success();
      },
    });
    const process = dispatcher.handleRequest(req, res);
    mockBody(req, JSON.stringify({}));
    const result = await process;
    assert.isTrue(result, "should handle");
    assert.isTrue(endSpy.calledOnce, "should call once");
    assert.equal(200, res.statusCode, "should be success");
  });

  it("Should response with success when returns success binary", async function () {
    const endSpy = sinon.spy(res, "end");
    buildRequest(req, "hub", "conn1");

    const dispatcher = new CloudEventsDispatcher("hub", {
      handleUserEvent: async (_, response) => {
        response.success("a");
      },
    });
    const process = dispatcher.handleRequest(req, res);
    mockBody(req, JSON.stringify({}));
    const result = await process;
    assert.isTrue(result, "should handle");
    assert.isTrue(endSpy.calledOnce, "should call once");
    assert.equal(200, res.statusCode, "should be success");
    assert.equal("application/octet-stream", res.getHeader("content-type"), "should be binary");
  });

  it("Should response with success when returns success text", async function () {
    const endSpy = sinon.spy(res, "end");
    buildRequest(req, "hub", "conn1");

    const dispatcher = new CloudEventsDispatcher("hub", {
      handleUserEvent: async (_, response) => {
        response.success("a", "text");
      },
    });
    const process = dispatcher.handleRequest(req, res);
    mockBody(req, JSON.stringify({}));
    const result = await process;
    assert.isTrue(result, "should handle");
    assert.isTrue(endSpy.calledOnce, "should call once");
    assert.equal(200, res.statusCode, "should be success");
    assert.equal("text/plain; charset=utf-8", res.getHeader("content-type"), "should be text");
  });

  it("Should response with success when returns success json", async function () {
    const endSpy = sinon.spy(res, "end");
    buildRequest(req, "hub", "conn1");

    const dispatcher = new CloudEventsDispatcher("hub", {
      handleUserEvent: async (_, response) => {
        response.success("a", "json");
      },
    });
    const process = dispatcher.handleRequest(req, res);
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

  it("Should be able to set connection state", async function () {
    const endSpy = sinon.spy(res, "end");
    buildRequest(req, "hub", "conn1");

    const dispatcher = new CloudEventsDispatcher("hub", {
      handleUserEvent: async (_, response) => {
        response.setState("key1", "val1");
        response.setState("key2", "val2");
        response.setState("key1", "val3");
        response.setState("key3", "");
        response.success();
      },
    });
    const process = dispatcher.handleRequest(req, res);
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
          key3: "",
        })
      ).toString("base64"),
      res.getHeader("ce-connectionState"),
      "should contain multiple state headers"
    );
  });
});
