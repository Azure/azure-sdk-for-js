// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineRequest } from "@azure/core-rest-pipeline";
import * as https from "https";
import { assert } from "chai";
import { getClientCertificatePolicy } from "../src";
import * as sinon from "sinon";
import { isNode } from "@azure/core-util";

describe("getClientCertificatePolicy", () => {
  beforeEach(() => {
    sinon.restore();
  });

  it("should throw in browsers", async function () {
    if (isNode) {
      this.skip();
    }
    assert.throws(() => getClientCertificatePolicy({}));
  });

  it("should add an agent to the request with the certificate", async function () {
    if (!isNode) {
      this.skip();
    }
    const policy = getClientCertificatePolicy({ pfx: "foo", passphrase: "bar" });
    const agentSpy = sinon.spy(https, "Agent");
    await policy.sendRequest({} as PipelineRequest, (req) => {
      assert.isDefined(req.agent);
      assert.isTrue(agentSpy.calledWith({ pfx: "foo", passphrase: "bar" }));
      return {} as any;
    });
  });

  it("should add an agent to the request with the certificate and key", async function () {
    if (!isNode) {
      this.skip();
    }

    const policy = getClientCertificatePolicy({
      cert: "foo",
      key: "baz",
      ca: "mydomain.com",
      passphrase: "bar",
    });
    const agentSpy = sinon.spy(https, "Agent");
    await policy.sendRequest({} as PipelineRequest, (req) => {
      assert.isDefined(req.agent);
      assert.isTrue(
        agentSpy.calledWith({ cert: "foo", key: "baz", ca: "mydomain.com", passphrase: "bar" })
      );
      return {} as any;
    });
  });

  it("should skip when no certificate is passed", async function () {
    if (!isNode) {
      this.skip();
    }
    const policy = getClientCertificatePolicy();
    await policy.sendRequest({} as PipelineRequest, (req) => {
      assert.isUndefined(req.agent);
      return {} as any;
    });
  });
});
