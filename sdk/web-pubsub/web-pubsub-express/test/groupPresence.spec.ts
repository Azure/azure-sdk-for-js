// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, expect, vi, beforeEach } from "vitest";
import { CloudEventsDispatcher } from "../src/cloudEventsDispatcher.js";
import { IncomingMessage, ServerResponse } from "node:http";
import { Socket } from "node:net";

function buildRequest(
  req: IncomingMessage,
  hub: string,
  connectionId: string,
  eventName: "joined" | "left",
  userId?: string,
): void {
  req.headers["webhook-request-origin"] = "xxx.webpubsub.azure.com";
  req.headers["content-type"] = "application/json; charset=utf-8";
  req.headers["ce-awpsversion"] = "1.0";
  req.headers["ce-specversion"] = "1.0";
  req.headers["ce-type"] = `azure.webpubsub.gp.${eventName}`;
  req.headers["ce-source"] = `/hubs/${hub}/client/${connectionId}`;
  req.headers["ce-id"] = "1";
  req.headers["ce-time"] = new Date().toUTCString();
  req.headers["ce-signature"] = "sha256=signature";
  if (userId !== undefined) {
    req.headers["ce-userid"] = userId;
  }
  req.headers["ce-connectionid"] = connectionId;
  req.headers["ce-hub"] = hub;
  req.headers["ce-eventname"] = eventName;
}

function mockBody(req: IncomingMessage, body: string): void {
  req.emit("data", Buffer.from(body, "utf-8"));
  req.emit("end");
}

describe("Can handle group presence events", function () {
  let req: IncomingMessage;
  let res: ServerResponse;

  beforeEach(async () => {
    req = new IncomingMessage(new Socket());
    res = new ServerResponse(req);
  });

  it("Should not handle the request if hub does not match", async () => {
    const endSpy = vi.spyOn(res, "end");
    buildRequest(req, "hub", "conn1", "joined");

    const dispatcher = new CloudEventsDispatcher("hub1");
    const result = await dispatcher.handleRequest(req, res);
    assert.isFalse(result);
    expect(endSpy).not.toBeCalled();
  });

  it("Should response with 200 when handler is not specified", async () => {
    const endSpy = vi.spyOn(res, "end");
    buildRequest(req, "hub", "conn1", "joined");

    const dispatcher = new CloudEventsDispatcher("hub", {});
    const result = await dispatcher.handleRequest(req, res);
    assert.isTrue(result, "should handle");
    expect(endSpy).toBeCalledTimes(1);
    assert.equal(res.statusCode, 200, "should be 200");
  });

  it("Should trigger onGroupJoined with group presence request", async () => {
    const endSpy = vi.spyOn(res, "end");
    const onGroupJoined = vi.fn();
    buildRequest(req, "hub", "conn1", "joined", "user1");

    const dispatcher = new CloudEventsDispatcher("hub", {
      onGroupJoined,
    });
    const process = dispatcher.handleRequest(req, res);
    mockBody(req, JSON.stringify({ group: "group1" }));
    const result = await process;

    assert.isTrue(result, "should handle");
    expect(endSpy).toBeCalledTimes(1);
    assert.equal(res.statusCode, 200, "should be 200");
    expect(onGroupJoined).toBeCalledTimes(1);
    expect(onGroupJoined).toBeCalledWith(
      expect.objectContaining({
        group: "group1",
        context: expect.objectContaining({
          connectionId: "conn1",
          eventName: "joined",
          hub: "hub",
          userId: "user1",
        }),
      }),
    );
  });

  it("Should trigger onGroupLeft with group presence request", async () => {
    const endSpy = vi.spyOn(res, "end");
    const onGroupLeft = vi.fn();
    buildRequest(req, "hub", "conn1", "left");

    const dispatcher = new CloudEventsDispatcher("hub", {
      onGroupLeft,
    });
    const process = dispatcher.handleRequest(req, res);
    mockBody(req, JSON.stringify({ group: "group1" }));
    const result = await process;

    assert.isTrue(result, "should handle");
    expect(endSpy).toBeCalledTimes(1);
    assert.equal(res.statusCode, 200, "should be 200");
    expect(onGroupLeft).toBeCalledTimes(1);
    expect(onGroupLeft).toBeCalledWith(
      expect.objectContaining({
        group: "group1",
        context: expect.objectContaining({
          connectionId: "conn1",
          eventName: "left",
          hub: "hub",
        }),
      }),
    );
  });
});
