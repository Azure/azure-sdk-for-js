// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as http from "https";
import * as https from "https";

import { proxyPolicy, proxyPolicyName } from "../../src/policies/proxyPolicy";
import { tlsPolicy, tlsPolicyName } from "../../src/policies/tlsPolicy";

import { HttpClient } from "../../src/interfaces";
import { HttpsProxyAgent } from "https-proxy-agent";
import { assert } from "chai";
import { createEmptyPipeline } from "../../src/pipeline";
import { createHttpHeaders } from "../../src/httpHeaders";
import { createNodeHttpClient } from "../../src/nodeHttpClient";
import { createPipelineFromOptions } from "../../src/createPipelineFromOptions";
import sinon from "sinon";

describe("HttpsPipeline", function () {
  describe("Agent creation", function () {
    afterEach(() => {
      sinon.restore();
      sinon.reset();
    });

    it("should create a proxy agent", async function () {
      const pipeline = createPipelineFromOptions({
        proxyOptions: { host: "https://foo", port: 12345 },
      });
      const httpClient: HttpClient = {
        sendRequest: async (request) => {
          assert.instanceOf(request.agent, HttpsProxyAgent);
          return {
            request,
            headers: createHttpHeaders(),
            status: 200,
          };
        },
      };
      await pipeline.sendRequest(httpClient, {
        headers: createHttpHeaders(),
        method: "GET",
        requestId: "1",
        timeout: 10000,
        url: "https://localhost",
        withCredentials: false,
      });
    });

    it("should honor proxy over tls", async function () {
      const fakePfx = "fakeCert";
      const pipeline = createPipelineFromOptions({
        proxyOptions: { host: "https://foo2", port: 12345 },
      });
      const httpClient: HttpClient = {
        sendRequest: async (request) => {
          assert.instanceOf(request.agent, HttpsProxyAgent);
          assert.isUndefined((request.agent as any).proxy.pfx);
          return {
            request,
            headers: createHttpHeaders(),
            status: 200,
          };
        },
      };

      pipeline.removePolicy({ name: tlsPolicyName });
      pipeline.addPolicy(tlsPolicy({ pfx: fakePfx }), { beforePolicies: [proxyPolicyName] });

      await pipeline.sendRequest(httpClient, {
        headers: createHttpHeaders(),
        method: "GET",
        requestId: "1",
        timeout: 10000,
        url: "https://localhost2",
        withCredentials: false,
      });
    });

    it("should create an agent with certificates", async function () {
      const pipeline = createEmptyPipeline();
      const fakePfx = "fakecert";
      const httpClient: HttpClient = createNodeHttpClient();
      sinon.stub(https, "request").callsFake((request: any) => {
        assert.equal(request.agent.options.pfx, fakePfx);
        throw new Error("ok");
      });

      pipeline.addPolicy(tlsPolicy({ pfx: fakePfx }));

      await pipeline
        .sendRequest(httpClient, {
          headers: createHttpHeaders(),
          method: "GET",
          requestId: "1",
          timeout: 10000,
          url: "https://localhost",
          withCredentials: false,
        })
        .catch((error) => {
          assert.equal(error.message, "ok");
        });
    });

    it("should honor tls in request over pipeline options", async function () {
      const pipeline = createEmptyPipeline();
      const fakePfx = "fakecert";
      const httpClient: HttpClient = createNodeHttpClient();
      sinon.stub(https, "request").callsFake((request: any) => {
        assert.equal(request.agent.options.pfx, "requestPfx");
        throw new Error("ok");
      });

      pipeline.addPolicy(tlsPolicy({ pfx: fakePfx }));

      await pipeline
        .sendRequest(httpClient, {
          headers: createHttpHeaders(),
          method: "GET",
          requestId: "1",
          timeout: 10000,
          url: "https://localhost",
          withCredentials: false,
          tlsSettings: { pfx: "requestPfx" },
        })
        .catch((error) => {
          assert.equal(error.message, "ok");
        });
    });

    it("should set tls options when only request tls is set", async function () {
      const pipeline = createEmptyPipeline();
      const fakePfx = "fakecert";
      const httpClient: HttpClient = createNodeHttpClient();
      sinon.stub(https, "request").callsFake((request: any) => {
        assert.equal(request.agent.options.pfx, fakePfx);
        throw new Error("ok");
      });

      pipeline.addPolicy(tlsPolicy());

      await pipeline
        .sendRequest(httpClient, {
          headers: createHttpHeaders(),
          method: "GET",
          requestId: "1",
          timeout: 10000,
          url: "https://localhost",
          withCredentials: false,
          tlsSettings: { pfx: fakePfx },
        })
        .catch((error) => {
          assert.equal(error.message, "ok");
        });
    });

    it("should use cached agent when TLS settings did not change", async function () {
      const pipeline = createEmptyPipeline();
      const fakePfx = "fakecert";
      const httpClient: HttpClient = createNodeHttpClient();
      let cachedAgent: http.Agent;
      sinon.stub(https, "request").callsFake((request: any) => {
        assert.equal(request.agent.options.pfx, fakePfx);
        if (cachedAgent) {
          // Should cache Agent
          assert.equal(request.agent, cachedAgent);
        }
        cachedAgent = request.agent;
        throw new Error("ok");
      });

      pipeline.addPolicy(tlsPolicy({ pfx: fakePfx }));

      await pipeline
        .sendRequest(httpClient, {
          headers: createHttpHeaders(),
          method: "GET",
          requestId: "1",
          timeout: 10000,
          url: "https://localhost",
          withCredentials: false,
        })
        .catch((error) => {
          assert.equal(error.message, "ok");
        });

      await pipeline
        .sendRequest(httpClient, {
          headers: createHttpHeaders(),
          method: "GET",
          requestId: "1",
          timeout: 10000,
          url: "https://localhost",
          withCredentials: false,
        })
        .catch((error) => {
          assert.equal(error.message, "ok");
        });
    });

    it("should create a new agent if new tlsSettings are set", async function () {
      const pipeline = createEmptyPipeline();
      const fakePfx = "fakecert";
      const newFakePfx = "newFakeCert";

      const httpClient: HttpClient = createNodeHttpClient();
      let cachedAgent: http.Agent;
      sinon.stub(https, "request").callsFake((request: any) => {
        if (cachedAgent) {
          assert.equal(request.agent.options.pfx, newFakePfx);
          // Should cache Agent
          assert.notEqual(request.agent, cachedAgent);
        } else {
          assert.equal(request.agent.options.pfx, fakePfx);
          cachedAgent = request.agent;
        }

        throw new Error("ok");
      });

      pipeline.addPolicy(tlsPolicy({ pfx: fakePfx }));

      await pipeline
        .sendRequest(httpClient, {
          headers: createHttpHeaders(),
          method: "GET",
          requestId: "1",
          timeout: 10000,
          url: "https://localhost",
          withCredentials: false,
        })
        .catch((error) => {
          assert.equal(error.message, "ok");
        });

      await pipeline
        .sendRequest(httpClient, {
          headers: createHttpHeaders(),
          method: "GET",
          requestId: "1",
          timeout: 10000,
          url: "https://localhost",
          withCredentials: false,
          tlsSettings: { pfx: newFakePfx },
        })
        .catch((error) => {
          assert.equal(error.message, "ok");
        });
    });

    it("should honor custom agent when proxy policy is enabled", async () => {
      const pipeline = createEmptyPipeline();
      const httpClient: HttpClient = {
        sendRequest: (req) => {
          assert.equal(req.agent?.maxSockets, 99);
          return {} as any;
        },
      };
      pipeline.addPolicy(proxyPolicy());

      await pipeline.sendRequest(httpClient, {
        headers: createHttpHeaders(),
        method: "GET",
        requestId: "1",
        timeout: 1000,
        url: "https://localhost",
        withCredentials: false,
        agent: new https.Agent({ maxSockets: 99 }),
        proxySettings: { host: "https://localhost", port: 12345 },
      });
    });

    it("should honor custom agent when tlsSettings are passed", async () => {
      const pipeline = createEmptyPipeline();
      const httpClient: HttpClient = {
        sendRequest: (req) => {
          assert.equal(req.agent?.maxSockets, 99);
          return {} as any;
        },
      };
      pipeline.addPolicy(tlsPolicy({ pfx: "foo" }));

      await pipeline.sendRequest(httpClient, {
        headers: createHttpHeaders(),
        method: "GET",
        requestId: "1",
        timeout: 1000,
        url: "https://localhost",
        withCredentials: false,
        agent: new https.Agent({ maxSockets: 99 }),
        proxySettings: { host: "https://localhost", port: 12345 },
      });
    });
  });
});
