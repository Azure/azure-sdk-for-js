// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable no-invalid-this */
import { CloudEventsDispatcher } from "../src/cloudEventsDispatcher";
import { assert } from "chai";
import { IncomingMessage, ServerResponse } from "http";
import { Socket } from "net";

describe("Abuse protection works", function() {
  it("Only requests with valid header will be processed", function() {
    const req = new IncomingMessage(new Socket());
    const res = new ServerResponse(req);
    const dispatcher = new CloudEventsDispatcher("hub");

    const result = dispatcher.handlePreflight(req, res);
    assert.isFalse(result);
  });

  it("When allow all endpoints the requested host should return", function() {
    const req = new IncomingMessage(new Socket());
    req.headers["ce-awpsversion"] = "1.0";
    req.headers["webhook-request-origin"] = "a.com";
    const res = new ServerResponse(req);
    const dispatcher = new CloudEventsDispatcher("hub");

    const result = dispatcher.handlePreflight(req, res);
    assert.isTrue(result);
    assert.equal("a.com", res.getHeader("webhook-allowed-origin"));
  });

  it("Support valid url in allowed endpoints and only return the one in the request", function() {
    const req = new IncomingMessage(new Socket());
    req.headers["ce-awpsversion"] = "1.0";
    req.headers["webhook-request-origin"] = "a.com";
    const res = new ServerResponse(req);
    const dispatcher = new CloudEventsDispatcher("hub", {
      allowedEndpoints: ["https://a.com/c", "http://b.com"]
    });

    const result = dispatcher.handlePreflight(req, res);
    assert.isTrue(result);
    assert.equal("a.com", res.getHeader("webhook-allowed-origin"));
  });

  it("Not allowed endpoints should return 400", function() {
    const req = new IncomingMessage(new Socket());
    req.headers["ce-awpsversion"] = "1.0";
    req.headers["webhook-request-origin"] = "a.com";
    const res = new ServerResponse(req);
    const dispatcher = new CloudEventsDispatcher("hub", {
      allowedEndpoints: ["https://c.com/c", "http://b.com"]
    });

    const result = dispatcher.handlePreflight(req, res);
    assert.isTrue(result);
    assert.equal(400, res.statusCode);
  });
});
