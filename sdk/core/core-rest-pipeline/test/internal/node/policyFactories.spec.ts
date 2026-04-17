// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, vi } from "vitest";
import {
  type PipelineResponse,
  type SendRequest,
  createHttpHeaders,
  createPipelineRequest,
} from "../../../src/index.js";
import { agentPolicy, agentPolicyName } from "../../../src/policies/agentPolicy.js";
import {
  proxyPolicy,
  proxyPolicyName,
  getDefaultProxySettings,
} from "../../../src/policies/proxyPolicy.js";
import { tlsPolicy, tlsPolicyName } from "../../../src/policies/tlsPolicy.js";
import { retryPolicy } from "../../../src/policies/retryPolicy.js";
import {
  defaultRetryPolicy,
  defaultRetryPolicyName,
} from "../../../src/policies/defaultRetryPolicy.js";
import {
  systemErrorRetryPolicy,
  systemErrorRetryPolicyName,
} from "../../../src/policies/systemErrorRetryPolicy.js";
import {
  throttlingRetryPolicy,
  throttlingRetryPolicyName,
} from "../../../src/policies/throttlingRetryPolicy.js";
import { exponentialRetryPolicy } from "../../../src/policies/exponentialRetryPolicy.js";

const defaultRequest = () => createPipelineRequest({ url: "https://example.com" });

describe("Policy factory functions", function () {
  function createMockNext(): SendRequest {
    const next = vi.fn<SendRequest>();
    next.mockImplementation(async (request) => ({
      headers: createHttpHeaders(),
      request,
      status: 200,
    }));
    return next;
  }

  describe("agentPolicy", function () {
    it("creates a policy with the correct name", function () {
      const policy = agentPolicy();
      assert.equal(policy.name, agentPolicyName);
    });

    it("can be called with an agent option", function () {
      const policy = agentPolicy({ http: undefined, https: undefined });
      assert.equal(policy.name, agentPolicyName);
    });

    it("sends a request through the policy", async function () {
      const policy = agentPolicy();
      const request = defaultRequest();
      const next = createMockNext();
      const response = await policy.sendRequest(request, next);
      assert.equal(response.status, 200);
    });
  });

  describe("proxyPolicy", function () {
    it("creates a policy with the correct name", function () {
      const policy = proxyPolicy();
      assert.equal(policy.name, proxyPolicyName);
    });

    it("can be called with proxy settings", function () {
      const policy = proxyPolicy({ host: "http://proxy.example.com", port: 8080 });
      assert.equal(policy.name, proxyPolicyName);
    });
  });

  describe("getDefaultProxySettings", function () {
    it("returns undefined when no proxy URL is provided and no env vars are set", function () {
      const savedHttpProxy = process.env.HTTP_PROXY;
      const savedHttpsProxy = process.env.HTTPS_PROXY;
      const savedHttpProxyLower = process.env.http_proxy;
      const savedHttpsProxyLower = process.env.https_proxy;
      delete process.env.HTTP_PROXY;
      delete process.env.HTTPS_PROXY;
      delete process.env.http_proxy;
      delete process.env.https_proxy;
      try {
        const settings = getDefaultProxySettings();
        assert.isUndefined(settings);
      } finally {
        if (savedHttpProxy !== undefined) process.env.HTTP_PROXY = savedHttpProxy;
        if (savedHttpsProxy !== undefined) process.env.HTTPS_PROXY = savedHttpsProxy;
        if (savedHttpProxyLower !== undefined) process.env.http_proxy = savedHttpProxyLower;
        if (savedHttpsProxyLower !== undefined) process.env.https_proxy = savedHttpsProxyLower;
      }
    });

    it("returns proxy settings when a proxy URL is provided", function () {
      const settings = getDefaultProxySettings("http://proxy.example.com:8080");
      assert.isDefined(settings);
      assert.equal(settings?.host, "http://proxy.example.com");
      assert.equal(settings?.port, 8080);
    });
  });

  describe("tlsPolicy", function () {
    it("creates a policy with the correct name", function () {
      const policy = tlsPolicy();
      assert.equal(policy.name, tlsPolicyName);
    });

    it("can be called with TLS settings", function () {
      const policy = tlsPolicy({ certificateThumbprint: "abc" });
      assert.equal(policy.name, tlsPolicyName);
    });

    it("sends a request through the policy", async function () {
      const policy = tlsPolicy();
      const request = defaultRequest();
      const next = createMockNext();
      const response = await policy.sendRequest(request, next);
      assert.equal(response.status, 200);
    });
  });

  describe("retryPolicy", function () {
    it("creates a policy with a retry strategy", function () {
      const policy = retryPolicy([
        {
          name: "testStrategy",
          retry: () => ({ retryAfterInMs: undefined }),
        },
      ]);
      assert.strictEqual(policy.name, "retryPolicy");
    });

    it("sends a request through the policy", async function () {
      const policy = retryPolicy([
        {
          name: "testStrategy",
          retry: () => ({ retryAfterInMs: undefined }),
        },
      ]);
      const request = defaultRequest();
      const next = createMockNext();
      const response = await policy.sendRequest(request, next);
      assert.equal(response.status, 200);
    });

    it("accepts custom max retries", function () {
      const policy = retryPolicy(
        [{ name: "testStrategy", retry: () => ({ retryAfterInMs: undefined }) }],
        { maxRetries: 5 },
      );
      assert.strictEqual(policy.name, "retryPolicy");
    });
  });

  describe("defaultRetryPolicy", function () {
    it("creates a policy with the correct name", function () {
      const policy = defaultRetryPolicy();
      assert.equal(policy.name, defaultRetryPolicyName);
    });

    it("can be called with options", function () {
      const policy = defaultRetryPolicy({ maxRetries: 5 });
      assert.equal(policy.name, defaultRetryPolicyName);
    });

    it("sends a request through the policy", async function () {
      const policy = defaultRetryPolicy();
      const request = defaultRequest();
      const next = createMockNext();
      const response = await policy.sendRequest(request, next);
      assert.equal(response.status, 200);
    });
  });

  describe("systemErrorRetryPolicy", function () {
    it("creates a policy with the correct name", function () {
      const policy = systemErrorRetryPolicy();
      assert.equal(policy.name, systemErrorRetryPolicyName);
    });

    it("can be called with options", function () {
      const policy = systemErrorRetryPolicy({
        maxRetries: 5,
        retryDelayInMs: 500,
        maxRetryDelayInMs: 10000,
      });
      assert.equal(policy.name, systemErrorRetryPolicyName);
    });

    it("sends a request through the policy", async function () {
      const policy = systemErrorRetryPolicy();
      const request = defaultRequest();
      const next = createMockNext();
      const response = await policy.sendRequest(request, next);
      assert.equal(response.status, 200);
    });
  });

  describe("throttlingRetryPolicy", function () {
    it("creates a policy with the correct name", function () {
      const policy = throttlingRetryPolicy();
      assert.equal(policy.name, throttlingRetryPolicyName);
    });

    it("can be called with options", function () {
      const policy = throttlingRetryPolicy({ maxRetries: 5 });
      assert.equal(policy.name, throttlingRetryPolicyName);
    });

    it("sends a request through the policy", async function () {
      const policy = throttlingRetryPolicy();
      const request = defaultRequest();
      const next = createMockNext();
      const response = await policy.sendRequest(request, next);
      assert.equal(response.status, 200);
    });
  });

  describe("exponentialRetryPolicy", function () {
    it("creates a policy that wraps retryPolicy", function () {
      const policy = exponentialRetryPolicy();
      assert.strictEqual(policy.name, "retryPolicy");
    });

    it("can be called with options", function () {
      const policy = exponentialRetryPolicy({
        maxRetries: 5,
        retryDelayInMs: 500,
        maxRetryDelayInMs: 10000,
      });
      assert.strictEqual(policy.name, "retryPolicy");
    });

    it("sends a request through the policy", async function () {
      const policy = exponentialRetryPolicy();
      const request = defaultRequest();
      const next = createMockNext();
      const response = await policy.sendRequest(request, next);
      assert.equal(response.status, 200);
    });
  });
});
