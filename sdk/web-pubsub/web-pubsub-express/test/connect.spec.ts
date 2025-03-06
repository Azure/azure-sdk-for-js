// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, expect, vi, beforeEach } from "vitest";
import { CloudEventsDispatcher } from "../src/cloudEventsDispatcher.js";
import { IncomingMessage, ServerResponse } from "node:http";
import { Socket } from "node:net";
import { toBase64JsonString } from "../src/utils.js";
import { MqttV311ConnectReturnCode } from "../src/index.js";

function buildRequest(
  req: IncomingMessage,
  hub: string,
  connectionId: string,
  userId?: string,
  states?: string,
): void {
  req.headers["webhook-request-origin"] = "xxx.webpubsub.azure.com";
  req.headers["content-type"] = "application/json; charset=utf-8";
  req.headers["ce-awpsversion"] = "1.0";
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
  req.headers["ce-connectionstate"] = states;
}

function buildMqttRequest(
  req: IncomingMessage,
  hub: string,
  connectionId: string,
  physicalConnectionId: string,
  userId?: string,
  states?: string,
  sessionId?: string,
): void {
  req.headers["webhook-request-origin"] = "xxx.webpubsub.azure.com";
  req.headers["content-type"] = "application/json; charset=utf-8";
  req.headers["ce-awpsversion"] = "1.0";
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
  req.headers["ce-connectionstate"] = states;
  req.headers["ce-subprotocol"] = "mqtt";
  req.headers["ce-physicalconnectionid"] = physicalConnectionId;
  req.headers["ce-sessionid"] = sessionId;
}

function mockBody(req: IncomingMessage, body: string): void {
  req.emit("data", Buffer.from(body, "utf-8"));
  req.emit("end");
}

const MOCK_MQTT_REQUEST_BODY = {
  mqtt: {
    protocolVersion: 4,
    username: "username",
    password: "password",
    userProperties: [
      {
        name: "a",
        value: "b",
      },
    ],
  },
  claims: {
    iat: ["1723005952"],
    exp: ["1726605954"],
    aud: ["ws://localhost:8080/clients/mqtt/hubs/simplechat"],
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": [
      "webpubsub.sendToGroup",
      "webpubsub.joinLeaveGroup",
    ],
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": ["user1"],
    role: ["webpubsub.sendToGroup", "webpubsub.joinLeaveGroup"],
    nameid: ["user1"],
  },
  query: {
    access_token: ["REDATED"],
  },
  headers: {
    Connection: ["Upgrade"],
    Host: ["localhost:8080"],
    Upgrade: ["websocket"],
    "Sec-WebSocket-Version": ["13"],
    "Sec-WebSocket-Key": ["REDATED"],
    "Sec-WebSocket-Extensions": ["permessage-deflate; client_max_window_bits"],
    "Sec-WebSocket-Protocol": ["mqtt"],
  },
  subprotocols: ["mqtt"],
  clientCertificates: [
    {
      thumbprint: "thumbprint",
      content: "certificate content",
    },
  ],
};

describe("Can handle connect event", function () {
  let req: IncomingMessage;
  let res: ServerResponse;

  beforeEach(async () => {
    req = new IncomingMessage(new Socket());
    res = new ServerResponse(req);
  });

  it("Should not handle the request if request is not cloud events", async () => {
    const endSpy = vi.spyOn(res, "end");

    const dispatcher = new CloudEventsDispatcher("hub1");
    const result = await dispatcher.handleRequest(req, res);
    assert.isFalse(result);
    expect(endSpy).not.toBeCalled();
  });

  it("Should not handle the request if hub does not match", async () => {
    const endSpy = vi.spyOn(res, "end");
    buildRequest(req, "hub", "conn1");

    const dispatcher = new CloudEventsDispatcher("hub1");
    const result = await dispatcher.handleRequest(req, res);
    assert.isFalse(result);
    expect(endSpy).not.toBeCalled();
  });

  it("Should response with 200 when option is not specified", async () => {
    const endSpy = vi.spyOn(res, "end");
    buildRequest(req, "hub", "conn1");

    const dispatcher = new CloudEventsDispatcher("hub");
    const result = await dispatcher.handleRequest(req, res);
    assert.isTrue(result, "should handle");
    expect(endSpy).toBeCalledTimes(1);
    assert.equal(200, res.statusCode, "should be 200");
  });

  it("Should response with 204 when handler is not specified for an mqtt request", async () => {
    const endSpy = vi.spyOn(res, "end");
    buildMqttRequest(req, "hub", "conn1", "physicalConnectionId");

    const dispatcher = new CloudEventsDispatcher("hub", {});
    const result = await dispatcher.handleRequest(req, res);
    assert.isTrue(result, "should handle");
    expect(endSpy).toBeCalledTimes(1);
    assert.equal(204, res.statusCode, "should be 204");
  });

  it("Should response with 200 when handler is not specified", async () => {
    const endSpy = vi.spyOn(res, "end");
    buildRequest(req, "hub", "conn1");

    const dispatcher = new CloudEventsDispatcher("hub", {});
    const result = await dispatcher.handleRequest(req, res);
    assert.isTrue(result, "should handle");
    expect(endSpy).toBeCalledTimes(1);
    assert.equal(200, res.statusCode, "should be 200");
  });

  it("Should response with error when handler returns error", async () => {
    const endSpy = vi.spyOn(res, "end");
    buildRequest(req, "hub", "conn1");

    const dispatcher = new CloudEventsDispatcher("hub", {
      handleConnect: async (_, response) => {
        response.fail(400);
      },
    });
    const process = dispatcher.handleRequest(req, res);
    mockBody(req, JSON.stringify({}));
    const result = await process;
    assert.isTrue(result, "should handle");
    expect(endSpy).toBeCalledTimes(1);
    assert.equal(400, res.statusCode, "should be error");
  });

  it("Should response with mqtt error when handler returns error and request is mqtt", async () => {
    const endSpy = vi.spyOn(res, "end");
    buildMqttRequest(req, "hub", "conn1", "physicalConnectionId");

    const dispatcher = new CloudEventsDispatcher("hub", {
      handleConnect: async (_, response) => {
        response.fail(400);
      },
    });
    const process = dispatcher.handleRequest(req, res);
    mockBody(req, JSON.stringify(MOCK_MQTT_REQUEST_BODY));
    const result = await process;
    assert.isTrue(result, "should handle");
    expect(endSpy).toBeCalledTimes(1);
    // Verify response body
    expect(endSpy).toBeCalledWith('{"mqtt":{"code":4}}');
    assert.equal(400, res.statusCode, "should be error");
  });

  it("Should response with correct status code and body when handler returns mqtt error", async () => {
    const endSpy = vi.spyOn(res, "end");
    buildMqttRequest(req, "hub", "conn1", "physicalConnectionId");

    const dispatcher = new CloudEventsDispatcher("hub", {
      handleConnect: async (_, response) => {
        response.failWith({
          mqtt: {
            code: MqttV311ConnectReturnCode.BadUsernameOrPassword,
            reason: "Bad username or password",
          },
        });
      },
    });
    const process = dispatcher.handleRequest(req, res);
    mockBody(req, JSON.stringify(MOCK_MQTT_REQUEST_BODY));
    const result = await process;
    assert.isTrue(result, "should handle");
    expect(endSpy).toBeCalledTimes(1);
    // Verify response body
    expect(endSpy).toBeCalledWith('{"mqtt":{"code":4,"reason":"Bad username or password"}}');
    assert.equal(401, res.statusCode, "should be error");
  });

  it("Should respond with correct mqtt response and body when handler returns default error but request is mqtt", async () => {
    const endSpy = vi.spyOn(res, "end");
    buildMqttRequest(req, "hub", "conn1", "physicalConnectionId");

    const dispatcher = new CloudEventsDispatcher("hub", {
      handleConnect: async (_, response) => {
        response.failWith({ code: 401, detail: "Auth failed" });
      },
    });
    const process = dispatcher.handleRequest(req, res);
    mockBody(req, JSON.stringify(MOCK_MQTT_REQUEST_BODY));
    const result = await process;
    assert.isTrue(result, "should handle");
    expect(endSpy).toBeCalledTimes(1);
    // Verify response body
    expect(endSpy).toBeCalledWith('{"mqtt":{"code":5,"reason":"Auth failed"}}');
    assert.equal(401, res.statusCode, "should be error");
  });

  it("Should response with success when handler returns success", async () => {
    const endSpy = vi.spyOn(res, "end");
    buildRequest(req, "hub", "conn1");

    const dispatcher = new CloudEventsDispatcher("hub", {
      handleConnect: async (_, response) => {
        response.success({ userId: "user1" });
      },
    });
    const process = dispatcher.handleRequest(req, res);
    mockBody(req, JSON.stringify({}));
    const result = await process;
    assert.isTrue(result, "should handle");
    expect(endSpy).toBeCalledTimes(1);
    assert.equal(200, res.statusCode, "should be success");
  });

  it("Should response with correct body when handler returns success for an mqtt request", async () => {
    const endSpy = vi.spyOn(res, "end");
    buildMqttRequest(req, "hub", "conn1", "physicalConnectionId");
    const dispatcher = new CloudEventsDispatcher("hub", {
      handleConnect: async (_, response) => {
        response.success({
          subprotocol: "mqtt",
          mqtt: {
            userProperties: [
              {
                name: "userId",
                value: "vic",
              },
            ],
          },
        });
      },
    });
    const process = dispatcher.handleRequest(req, res);
    mockBody(req, JSON.stringify(MOCK_MQTT_REQUEST_BODY));
    const result = await process;
    assert.isTrue(result, "should handle");
    expect(endSpy).toBeCalledTimes(1);
    // Verify response body
    expect(endSpy).toBeCalledWith(
      '{"subprotocol":"mqtt","mqtt":{"userProperties":[{"name":"userId","value":"vic"}]}}',
    );
    assert.equal(200, res.statusCode, "should be success");
  });

  it("Should response with success when handler returns success value", async () => {
    const endSpy = vi.spyOn(res, "end");
    buildRequest(req, "hub", "conn1");

    const dispatcher = new CloudEventsDispatcher("hub", {
      handleConnect: async (_, response) => {
        response.success({ userId: "vic" });
      },
    });
    const process = dispatcher.handleRequest(req, res);
    mockBody(req, JSON.stringify({}));
    const result = await process;
    assert.isTrue(result, "should handle");
    expect(endSpy).toBeCalledTimes(1);
    assert.equal(200, res.statusCode, "should be success");
  });

  it("Should be able to set connection state", async () => {
    const endSpy = vi.spyOn(res, "end");
    buildRequest(req, "hub", "conn1");

    const dispatcher = new CloudEventsDispatcher("hub", {
      handleConnect: async (_, response) => {
        response.setState("key1", "val1");
        response.setState("key2", "val2");
        response.setState("key1", ["val3"]);
        response.setState("key3", "");
        response.success({ userId: "vic" });
      },
    });
    const process = dispatcher.handleRequest(req, res);
    mockBody(req, JSON.stringify({}));
    const result = await process;
    assert.isTrue(result, "should handle");
    expect(endSpy).toBeCalledTimes(1);
    assert.equal(
      toBase64JsonString({
        key1: ["val3"],
        key2: "val2",
        key3: "",
      }),
      res.getHeader("ce-connectionState"),
      "should contain multiple state headers",
    );
  });

  it("Should be able to get the connection states if it exists in the header", async () => {
    const endSpy = vi.spyOn(res, "end");
    const states = toBase64JsonString({
      key1: ["val3"],
      key2: "val2",
      key3: "",
    });
    buildRequest(req, "hub1", "conn1", undefined, states);
    const dispatcher = new CloudEventsDispatcher("hub1", {
      handleConnect: (request, response) => {
        assert.equal("val3", request.context.states["key1"][0]);
        assert.equal("val2", request.context.states["key2"]);
        assert.equal("", request.context.states["key3"]);
        response.success();
      },
    });
    const process = dispatcher.handleRequest(req, res);
    mockBody(req, JSON.stringify({}));
    const result = await process;
    assert.isTrue(result, "should handle");
    expect(endSpy).toBeCalledTimes(1);
    assert.equal(204, res.statusCode, "should be success");
  });

  it("Invalid state header gets ignored", async () => {
    const endSpy = vi.spyOn(res, "end");
    buildRequest(req, "hub1", "conn1", undefined, "");
    const dispatcher = new CloudEventsDispatcher("hub1", {
      handleConnect: (request, response) => {
        assert.deepEqual({}, request.context.states);
        response.success();
      },
    });
    const process = dispatcher.handleRequest(req, res);
    mockBody(req, JSON.stringify({}));
    const result = await process;
    assert.isTrue(result, "should handle");
    expect(endSpy).toBeCalledTimes(1);
    assert.equal(204, res.statusCode, "should be success");
  });
});
