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
    const dispatcher = new CloudEventsDispatcher("hub", ["*"]);

    const result = dispatcher.processValidateRequest(req, res);
    assert.isFalse(result);
  });

  it("Support * in allowed endpoints", function() {
    const req = new IncomingMessage(new Socket());
    req.headers["webhook-request-origin"] = "a.com";
    const res = new ServerResponse(req);
    const dispatcher = new CloudEventsDispatcher("hub", ["*"]);

    const result = dispatcher.processValidateRequest(req, res);
    assert.isTrue(result);
    assert.equal("*", res.getHeader("webhook-allowed-origin"));
  });

  it("Support valid url in allowed endpoints", function() {
    const req = new IncomingMessage(new Socket());
    req.headers["webhook-request-origin"] = "a.com";
    const res = new ServerResponse(req);
    const dispatcher = new CloudEventsDispatcher("hub", ["*", "https://a.com/c"]);

    const result = dispatcher.processValidateRequest(req, res);
    assert.isTrue(result);
    assert.equal("*,a.com", res.getHeader("webhook-allowed-origin"));
  });
});
