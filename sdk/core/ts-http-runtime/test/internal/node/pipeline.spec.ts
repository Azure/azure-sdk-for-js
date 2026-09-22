// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, vi, afterEach } from "vitest";
import {
  agentPolicyName,
  decompressResponsePolicyName,
  formDataPolicyName,
  proxyPolicy,
  proxyPolicyName,
  redirectPolicyName,
  tlsPolicy,
  tlsPolicyName,
  userAgentPolicyName,
} from "../../../src/policies/internal.js";
import { type HttpClient, createEmptyPipeline, createHttpHeaders } from "../../../src/index.js";
import { HttpsProxyAgent } from "https-proxy-agent";
import { createNodeHttpClient } from "../../../src/nodeHttpClient.js";
import { createPipelineFromOptions } from "../../../src/createPipelineFromOptions.js";

vi.mock("node:https", async () => {
  const actual = await vi.importActual("node:https");
  return {
    default: {
      ...(actual as any).default,
      request: vi.fn(),
    },
  };
});

import type { Agent } from "node:http";
import https from "node:https";

describe("HttpsPipeline", function () {
  describe("Agent creation", function () {
    afterEach(() => {
      vi.clearAllMocks();
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
      vi.mocked(https.request).mockImplementation((request: any) => {
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
      vi.mocked(https.request).mockImplementation((request: any) => {
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
      vi.mocked(https.request).mockImplementation((request: any) => {
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
      let cachedAgent: Agent;
      vi.mocked(https.request).mockImplementation((request: any) => {
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
      let cachedAgent: Agent;
      vi.mocked(https.request).mockImplementation((request: any) => {
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

  describe("Platform policies", function () {
    it("createPipelineFromOptions includes all expected node-only policies", function () {
      const pipeline = createPipelineFromOptions({
        proxyOptions: { host: "https://proxy", port: 8080 },
        tlsOptions: { pfx: "cert" },
        redirectOptions: { maxRetries: 5 },
        agent: new https.Agent(),
      });
      const policyNames = pipeline.getOrderedPolicies().map((p) => p.name);

      assert.include(policyNames, agentPolicyName);
      assert.include(policyNames, tlsPolicyName);
      assert.include(policyNames, proxyPolicyName);
      assert.include(policyNames, decompressResponsePolicyName);
      assert.include(policyNames, redirectPolicyName);
    });

    it("node-only policies are ordered before cross-platform policies", function () {
      const pipeline = createPipelineFromOptions({
        proxyOptions: { host: "https://proxy", port: 8080 },
      });
      const policyNames = pipeline.getOrderedPolicies().map((p) => p.name);

      const proxyIdx = policyNames.indexOf(proxyPolicyName);
      const decompressIdx = policyNames.indexOf(decompressResponsePolicyName);
      const formDataIdx = policyNames.indexOf(formDataPolicyName);
      const userAgentIdx = policyNames.indexOf(userAgentPolicyName);

      assert.isAbove(proxyIdx, -1, "proxyPolicy should be present");
      assert.isAbove(decompressIdx, -1, "decompressResponsePolicy should be present");
      assert.isBelow(proxyIdx, formDataIdx, "proxyPolicy should come before formDataPolicy");
      assert.isBelow(
        decompressIdx,
        userAgentIdx,
        "decompressResponsePolicy should come before userAgentPolicy",
      );
    });

    it("optional policies are omitted when options are not provided", function () {
      const pipeline = createPipelineFromOptions({});
      const policyNames = pipeline.getOrderedPolicies().map((p) => p.name);

      assert.notInclude(policyNames, agentPolicyName);
      assert.notInclude(policyNames, tlsPolicyName);
      // proxyPolicy and decompressResponsePolicy are always added on Node
      assert.include(policyNames, proxyPolicyName);
      assert.include(policyNames, decompressResponsePolicyName);
    });
  });
});
