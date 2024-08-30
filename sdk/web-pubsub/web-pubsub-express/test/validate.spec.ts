// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/* eslint-disable no-invalid-this */

import { describe, it, assert } from "vitest";
import { CloudEventsDispatcher } from "../src/cloudEventsDispatcher.js";
import { IncomingMessage, ServerResponse } from "node:http";
import { Socket } from "node:net";

describe("Abuse protection works", function () {
  it("Only requests with valid header will be processed", function () {
    const req = new IncomingMessage(new Socket());
    const res = new ServerResponse(req);
    const dispatcher = new CloudEventsDispatcher("hub");

    const result = dispatcher.handlePreflight(req, res);
    assert.isFalse(result);
  });

  it("When allow all endpoints return *", function () {
    const req = new IncomingMessage(new Socket());
    req.headers["ce-awpsversion"] = "1.0";
    req.headers["webhook-request-origin"] = "a.com";
    const res = new ServerResponse(req);
    const dispatcher = new CloudEventsDispatcher("hub");

    const result = dispatcher.handlePreflight(req, res);
    assert.isTrue(result);
    assert.equal("*", res.getHeader("webhook-allowed-origin"));
  });

  it("Support valid url in allowed endpoints and return them", function () {
    const req = new IncomingMessage(new Socket());
    req.headers["ce-awpsversion"] = "1.0";
    req.headers["webhook-request-origin"] = "a.com";
    const res = new ServerResponse(req);
    const dispatcher = new CloudEventsDispatcher("hub", {
      allowedEndpoints: ["https://a.com/c", "http://b.com"],
    });

    const result = dispatcher.handlePreflight(req, res);
    assert.isTrue(result);
    assert.sameMembers(["a.com", "b.com"], res.getHeader("webhook-allowed-origin") as string[]);
  });

  it("Not allowed endpoints should return 200 and we reply on service to do the validation", function () {
    const req = new IncomingMessage(new Socket());
    req.headers["ce-awpsversion"] = "1.0";
    req.headers["webhook-request-origin"] = "a.com";
    const res = new ServerResponse(req);
    const dispatcher = new CloudEventsDispatcher("hub", {
      allowedEndpoints: ["https://c.com/c", "http://b.com"],
    });

    const result = dispatcher.handlePreflight(req, res);
    assert.isTrue(result);
    assert.sameMembers(["c.com", "b.com"], res.getHeader("webhook-allowed-origin") as string[]);
  });
});
