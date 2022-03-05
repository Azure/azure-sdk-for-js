import { PipelineRequest } from "@azure/core-rest-pipeline";
import * as https from "https";
import { assert } from "chai";
import { getClientCertificatePolicy } from "../src";
import * as sinon from "sinon";

describe("getClientCertificatePolicy", () => {
  beforeEach(() => {
    sinon.restore();
  });
  it("should add an agent to the request with the certificate", async () => {
    const policy = getClientCertificatePolicy({ pfx: "foo", passphrase: "bar" });
    const agentSpy = sinon.spy(https, "Agent");
    await policy.sendRequest({} as PipelineRequest, (req) => {
      assert.isDefined(req.agent);
      assert.isTrue(agentSpy.calledWith({ pfx: "foo", passphrase: "bar" }));
      return {} as any;
    });
  });

  it("should add an agent to the request with the certificate and key", async () => {
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

  it("should skip when no certificate is passed", async () => {
    const policy = getClientCertificatePolicy();
    await policy.sendRequest({} as PipelineRequest, (req) => {
      assert.isUndefined(req.agent);
      return {} as any;
    });
  });
});
